const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  subscription: {
    type: String,
    enum: ['free', 'basic', 'pro', 'enterprise'],
    default: 'free'
  },
  subscriptionStatus: {
    type: String,
    enum: ['active', 'inactive', 'trial'],
    default: 'trial'
  },
  trialEnds: {
    type: Date
  },
  stripeCustomerId: {
    type: String
  },
  socialAccounts: [{
    platform: {
      type: String,
      enum: ['twitter', 'instagram', 'tiktok', 'youtube']
    },
    accessToken: String,
    refreshToken: String,
    platformUserId: String,
    username: String
  }],
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true }
    },
    trendAlerts: {
      type: [String],
      default: ['viral', 'rising']
    },
    contentSuggestions: { type: Boolean, default: true }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to check if trial is valid
userSchema.methods.isTrialValid = function() {
  if (!this.trialEnds) return false;
  return new Date() < this.trialEnds;
};

// Method to check subscription access
userSchema.methods.hasSubscriptionAccess = function(feature) {
  const accessLevels = {
    free: ['basic_analytics'],
    basic: ['basic_analytics', 'trend_alerts'],
    pro: ['basic_analytics', 'trend_alerts', 'content_suggestions', 'api_access'],
    enterprise: ['basic_analytics', 'trend_alerts', 'content_suggestions', 'api_access', 'custom_integration']
  };
  
  return this.subscriptionStatus === 'active' && 
         accessLevels[this.subscription].includes(feature);
};

module.exports = mongoose.model('User', userSchema);