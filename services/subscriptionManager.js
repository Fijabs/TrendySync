const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');

class SubscriptionManager {
  constructor() {
    this.plans = {
      basic: {
        name: 'Basic Plan',
        features: ['basic_analytics', 'trend_alerts'],
        stripe_price_id: process.env.STRIPE_BASIC_PRICE_ID
      },
      pro: {
        name: 'Pro Plan',
        features: ['basic_analytics', 'trend_alerts', 'content_suggestions', 'api_access'],
        stripe_price_id: process.env.STRIPE_PRO_PRICE_ID
      },
      enterprise: {
        name: 'Enterprise Plan',
        features: ['basic_analytics', 'trend_alerts', 'content_suggestions', 'api_access', 'custom_integration'],
        stripe_price_id: process.env.STRIPE_ENTERPRISE_PRICE_ID
      }
    };
  }

  async createCustomer(user) {
    try {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user._id.toString()
        }
      });

      user.stripeCustomerId = customer.id;
      await user.save();

      return customer;
    } catch (error) {
      throw new Error(`Error creating customer: ${error.message}`);
    }
  }

  async createSubscription(user, planType) {
    try {
      if (!user.stripeCustomerId) {
        await this.createCustomer(user);
      }

      const plan = this.plans[planType];
      if (!plan) {
        throw new Error('Invalid plan type');
      }

      const subscription = await stripe.subscriptions.create({
        customer: user.stripeCustomerId,
        items: [{ price: plan.stripe_price_id }],
        expand: ['latest_invoice.payment_intent']
      });

      // Update user subscription status
      user.subscription = planType;
      user.subscriptionStatus = 'active';
      await user.save();

      return {
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret
      };
    } catch (error) {
      throw new Error(`Error creating subscription: ${error.message}`);
    }
  }

  async cancelSubscription(user) {
    try {
      const subscriptions = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: 'active'
      });

      for (const subscription of subscriptions.data) {
        await stripe.subscriptions.del(subscription.id);
      }

      user.subscription = 'free';
      user.subscriptionStatus = 'inactive';
      await user.save();

      return true;
    } catch (error) {
      throw new Error(`Error canceling subscription: ${error.message}`);
    }
  }

  async updateSubscription(user, newPlanType) {
    try {
      const subscriptions = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: 'active'
      });

      if (subscriptions.data.length === 0) {
        return await this.createSubscription(user, newPlanType);
      }

      const subscription = subscriptions.data[0];
      const plan = this.plans[newPlanType];

      const updatedSubscription = await stripe.subscriptions.update(
        subscription.id,
        {
          items: [{
            id: subscription.items.data[0].id,
            price: plan.stripe_price_id
          }],
          proration_behavior: 'always_invoice'
        }
      );

      user.subscription = newPlanType;
      await user.save();

      return {
        subscriptionId: updatedSubscription.id,
        status: updatedSubscription.status
      };
    } catch (error) {
      throw new Error(`Error updating subscription: ${error.message}`);
    }
  }

  async handleWebhook(event) {
    try {
      switch (event.type) {
        case 'customer.subscription.deleted':
          await this.handleSubscriptionCanceled(event.data.object);
          break;

        case 'customer.subscription.updated':
          await this.handleSubscriptionUpdated(event.data.object);
          break;

        case 'invoice.payment_failed':
          await this.handlePaymentFailed(event.data.object);
          break;
      }
    } catch (error) {
      throw new Error(`Error handling webhook: ${error.message}`);
    }
  }

  async handleSubscriptionCanceled(subscription) {
    const user = await User.findOne({ stripeCustomerId: subscription.customer });
    if (user) {
      user.subscription = 'free';
      user.subscriptionStatus = 'inactive';
      await user.save();
    }
  }

  async handleSubscriptionUpdated(subscription) {
    const user = await User.findOne({ stripeCustomerId: subscription.customer });
    if (user) {
      user.subscriptionStatus = subscription.status === 'active' ? 'active' : 'inactive';
      await user.save();
    }
  }

  async handlePaymentFailed(invoice) {
    const user = await User.findOne({ stripeCustomerId: invoice.customer });
    if (user) {
      user.subscriptionStatus = 'inactive';
      await user.save();
    }
  }

  getFeatures(planType) {
    return this.plans[planType]?.features || [];
  }

  async getSubscriptionStatus(user) {
    try {
      if (!user.stripeCustomerId) {
        return {
          status: user.subscriptionStatus,
          plan: user.subscription,
          features: this.getFeatures(user.subscription)
        };
      }

      const subscriptions = await stripe.subscriptions.list({
        customer: user.stripeCustomerId,
        status: 'active'
      });

      return {
        status: subscriptions.data.length > 0 ? 'active' : 'inactive',
        plan: user.subscription,
        features: this.getFeatures(user.subscription),
        renewalDate: subscriptions.data[0]?.current_period_end
          ? new Date(subscriptions.data[0].current_period_end * 1000)
          : null
      };
    } catch (error) {
      throw new Error(`Error getting subscription status: ${error.message}`);
    }
  }
}

module.exports = new SubscriptionManager();