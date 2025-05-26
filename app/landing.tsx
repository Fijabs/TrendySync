import { Check, ChevronDown, Crown } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="bg-gray-50 font-sans">
      {/* Navigation */}
      <nav className="gradient-bg text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="fas fa-bolt text-2xl"></i>
            <span className="text-xl font-bold">TrendSync</span>
            <span className="text-xs bg-white text-purple-700 px-2 py-0.5 rounded-full ml-2">BETA</span>
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#features" className="hover:text-gray-200">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-gray-200">
              How It Works
            </a>
            <a href="#pricing" className="hover:text-gray-200">
              Pricing
            </a>
            <div className="relative group">
              <button className="hover:text-gray-200 flex items-center">
                Resources <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute hidden group-hover:block bg-white text-gray-800 shadow-lg rounded-lg mt-2 py-2 w-48 z-10">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Blog
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Guides
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  API Docs
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 rounded-full bg-white text-purple-700 font-semibold hover:bg-gray-100">
              Login
            </button>
            <button className="hidden md:block px-4 py-2 rounded-full bg-transparent border border-white text-white font-semibold hover:bg-white hover:text-purple-700">
              Sign Up Free
            </button>
            <button className="md:hidden">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 gradient-bg text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover What's Trending Across All Platforms</h1>
              <p className="text-xl mb-8">
                TrendSync helps content creators, marketers, and businesses stay ahead of trends across Twitter, TikTok,
                Instagram, and YouTube—all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-white text-purple-700 font-bold rounded-lg hover:bg-gray-100 transition duration-300">
                  Start Free Trial
                </button>
                <button className="px-6 py-3 border border-white text-white font-bold rounded-lg hover:bg-white hover:text-purple-700 transition duration-300">
                  Watch Demo
                </button>
              </div>
              <div className="mt-6 flex items-center text-sm">
                <Check className="h-5 w-5 mr-2" /> No credit card required
                <span className="mx-3">•</span>
                <Check className="h-5 w-5 mr-2" /> 14-day free trial
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <img
                  src="/placeholder.svg?height=300&width=500"
                  alt="TrendSync Dashboard Preview"
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold text-purple-600 mb-2">4+</div>
              <div className="text-gray-600">Major Platforms</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-purple-600 mb-2">10M+</div>
              <div className="text-gray-600">Trends Analyzed</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-purple-600 mb-2">25K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Stay Ahead of Trends</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              TrendSync provides powerful tools to discover, analyze, and leverage trending content across all major
              social platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-chart-line text-purple-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Trend Tracking</h3>
              <p className="text-gray-600">
                Monitor trending topics, hashtags, and content across Twitter, TikTok, Instagram, and YouTube in
                real-time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-lightbulb text-purple-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">AI-Powered Content Ideas</h3>
              <p className="text-gray-600">
                Get personalized content suggestions based on trending topics relevant to your niche and audience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-chart-pie text-purple-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Advanced Analytics</h3>
              <p className="text-gray-600">
                Dive deep into trend performance with comprehensive analytics on engagement, audience demographics, and
                more.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-bell text-purple-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Custom Alerts</h3>
              <p className="text-gray-600">
                Set up notifications for emerging trends in your industry so you never miss an opportunity.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-calendar-alt text-purple-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Content Calendar</h3>
              <p className="text-gray-600">
                Plan and schedule your content based on predicted trend performance and optimal posting times.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <i className="fas fa-plug text-purple-600 text-xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Seamless Integrations</h3>
              <p className="text-gray-600">
                Connect with your favorite tools including Buffer, Hootsuite, Canva, and more for a streamlined
                workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How TrendSync Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform makes it easy to discover and leverage trending content in just a few simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Connect Your Accounts</h3>
              <p className="text-gray-600">
                Link your social media accounts or select the platforms and niches you want to monitor.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Discover Trends</h3>
              <p className="text-gray-600">
                Our AI analyzes millions of posts to identify emerging trends relevant to your audience.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Create & Grow</h3>
              <p className="text-gray-600">
                Use our insights and content suggestions to create trending content that resonates with your audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of content creators and marketers who are already using TrendSync to stay ahead.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i key={star} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "TrendSync has completely transformed how I create content. I'm able to spot trends early and my
                engagement has increased by over 200% since I started using it."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <div className="font-bold">Sarah Johnson</div>
                  <div className="text-gray-600 text-sm">Content Creator, 500K+ followers</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i key={star} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "As a marketing agency, we need to stay on top of trends for multiple clients. TrendSync saves us hours
                of research and helps us deliver better results for our clients."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <div className="font-bold">Michael Rodriguez</div>
                  <div className="text-gray-600 text-sm">Digital Marketing Director</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i key={star} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "The content ideas feature alone is worth the subscription. TrendSync helps me create relevant content
                that actually performs well instead of guessing what might work."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <div className="font-bold">Emily Chen</div>
                  <div className="text-gray-600 text-sm">Social Media Manager</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that's right for you and start discovering trends today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Starter</h3>
                <p className="text-gray-600 mb-4">Perfect for individual creators</p>
                <div className="text-4xl font-bold mb-4">
                  $29<span className="text-xl text-gray-600">/mo</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>2 social platforms</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Basic trend analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>5 content ideas per day</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Email notifications</span>
                  </li>
                </ul>
                <button className="w-full py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition duration-300">
                  Get Started
                </button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-xl border-2 border-purple-600 shadow-md overflow-hidden transform scale-105">
              <div className="bg-purple-600 text-white text-center py-2 text-sm font-bold">MOST POPULAR</div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Professional</h3>
                <p className="text-gray-600 mb-4">Ideal for serious creators and small teams</p>
                <div className="text-4xl font-bold mb-4">
                  $79<span className="text-xl text-gray-600">/mo</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>All social platforms</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>20 content ideas per day</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Custom alerts</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Content calendar</span>
                  </li>
                </ul>
                <button className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition duration-300">
                  Get Started
                </button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-4">For agencies and large teams</p>
                <div className="text-4xl font-bold mb-4">
                  $199<span className="text-xl text-gray-600">/mo</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>All Professional features</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Unlimited content ideas</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Multi-user access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Dedicated support</span>
                  </li>
                </ul>
                <button className="w-full py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition duration-300">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-bg text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block px-3 py-1 bg-white text-purple-700 rounded-full text-sm font-bold mb-4">
              <Crown className="inline-block mr-1 h-4 w-4" /> TRENDSYNC PRO
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Stay Ahead of Trends?</h2>
            <p className="text-xl mb-8">
              Join thousands of creators and marketers who are already using TrendSync to discover trending content and
              grow their audience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-3 bg-white text-purple-700 font-bold rounded-lg hover:bg-gray-100 transition duration-300">
                Start 14-Day Free Trial
              </button>
              <button className="px-8 py-3 border border-white text-white font-bold rounded-lg hover:bg-white hover:text-purple-700 transition duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Find answers to common questions about TrendSync.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {/* FAQ Item */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 font-bold flex justify-between items-center cursor-pointer">
                <div>How does TrendSync identify trends?</div>
                <ChevronDown className="h-5 w-5" />
              </div>
              <div className="p-4 pt-0 text-gray-600">
                TrendSync uses advanced AI algorithms to analyze millions of posts across social platforms in real-time.
                We identify patterns in engagement, growth rates, and content similarities to spot emerging trends
                before they go mainstream.
              </div>
            </div>

            {/* FAQ Item */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 font-bold flex justify-between items-center cursor-pointer">
                <div>Which platforms does TrendSync monitor?</div>
                <ChevronDown className="h-5 w-5" />
              </div>
              <div className="p-4 pt-0 text-gray-600">
                TrendSync currently monitors Twitter, TikTok, Instagram, and YouTube. We're constantly expanding our
                platform coverage to include more sources of trending content.
              </div>
            </div>

            {/* FAQ Item */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 font-bold flex justify-between items-center cursor-pointer">
                <div>Do I need to connect my social accounts?</div>
                <ChevronDown className="h-5 w-5" />
              </div>
              <div className="p-4 pt-0 text-gray-600">
                No, you don't need to connect your accounts to use TrendSync. However, connecting your accounts allows
                us to provide more personalized trend recommendations and content ideas based on your audience and
                content history.
              </div>
            </div>

            {/* FAQ Item */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 font-bold flex justify-between items-center cursor-pointer">
                <div>Can I cancel my subscription anytime?</div>
                <ChevronDown className="h-5 w-5" />
              </div>
              <div className="p-4 pt-0 text-gray-600">
                Yes, you can cancel your subscription at any time. If you cancel, you'll continue to have access to
                TrendSync until the end of your current billing period.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <i className="fas fa-bolt text-2xl text-purple-400"></i>
                <span className="text-xl font-bold text-white">TrendSync</span>
              </div>
              <p className="mb-4">
                The ultimate tool for tracking and leveraging social media trends across all major platforms.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-tiktok"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Webinars
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">© 2023 TrendSync. All rights reserved.</div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
