"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowUp, ChevronDown, ChevronRight, Crown, MagnetIcon as Magic, RefreshCw, Bookmark } from "lucide-react"

import { initCharts, updateTrendData } from "@/lib/charts"

export default function Dashboard() {
  useEffect(() => {
    // Initialize charts when component mounts
    const charts = initCharts()

    // Start simulated updates
    const updateTimer = setTimeout(() => {
      updateTrendData(charts.trendChart)
    }, 5000)

    // Mobile menu toggle
    const menuButton = document.querySelector(".md\\:hidden")
    const menu = document.querySelector(".md\\:flex.space-x-6")

    if (menuButton && menu) {
      menuButton.addEventListener("click", () => {
        menu.classList.toggle("hidden")
        menu.classList.toggle("flex")
        menu.classList.toggle("flex-col")
        menu.classList.toggle("absolute")
        menu.classList.toggle("top-16")
        menu.classList.toggle("left-0")
        menu.classList.toggle("w-full")
        menu.classList.toggle("bg-purple-700")
        menu.classList.toggle("p-4")
        menu.classList.toggle("space-y-4")
        menu.classList.toggle("space-x-0")
      })
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()

        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          })
        }
      })
    })

    return () => {
      clearTimeout(updateTimer)
    }
  }, [])

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
            <a href="#dashboard" className="hover:text-gray-200">
              Dashboard
            </a>
            <a href="#trends" className="hover:text-gray-200">
              Trends
            </a>
            <a href="#analytics" className="hover:text-gray-200">
              Analytics
            </a>
            <a href="#ideas" className="hover:text-gray-200">
              Content Ideas
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
            <Link
              href="/"
              className="hidden md:block px-4 py-2 rounded-full bg-transparent border border-white text-white font-semibold hover:bg-white hover:text-purple-700"
            >
              Back to Home
            </Link>
            <button className="md:hidden">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Section */}
      <section id="dashboard" className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, Creator!</h1>
              <p className="text-gray-600">Here's what's trending across your connected platforms</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-8 py-2">
                  <option>Last 24 hours</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 text-gray-400 h-4 w-4" />
              </div>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center">
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-gray-500 text-sm">Total Trends</div>
                  <div className="text-2xl font-bold mt-1">142</div>
                </div>
                <div className="platform-badge bg-blue-500">
                  <i className="fab fa-twitter"></i>
                </div>
              </div>
              <div className="mt-4 text-sm text-green-500 flex items-center">
                <ArrowUp className="mr-1 h-4 w-4" /> 12% from yesterday
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-gray-500 text-sm">Viral Trends</div>
                  <div className="text-2xl font-bold mt-1">27</div>
                </div>
                <div className="platform-badge bg-pink-600">
                  <i className="fab fa-instagram"></i>
                </div>
              </div>
              <div className="mt-4 text-sm text-green-500 flex items-center">
                <ArrowUp className="mr-1 h-4 w-4" /> 8% from yesterday
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-gray-500 text-sm">New Trends</div>
                  <div className="text-2xl font-bold mt-1">19</div>
                </div>
                <div className="platform-badge bg-black">
                  <i className="fab fa-tiktok"></i>
                </div>
              </div>
              <div className="mt-4 text-sm text-green-500 flex items-center">
                <ArrowUp className="mr-1 h-4 w-4" /> 22% from yesterday
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-gray-500 text-sm">Content Ideas</div>
                  <div className="text-2xl font-bold mt-1">36</div>
                </div>
                <div className="platform-badge bg-red-600">
                  <i className="fab fa-youtube"></i>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">Ready for you</div>
            </div>
          </div>

          {/* Back to Home Banner */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-8 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-purple-700">Exploring the TrendSync Demo</h3>
              <p className="text-sm text-purple-600">This is a demo of the TrendSync dashboard. Ready to learn more?</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
            >
              Back to Home
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-bold">Trending Now Across Platforms</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">All</button>
                <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm">Twitter</button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">TikTok</button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">Instagram</button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">YouTube</button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {/* Trend Item */}
              <div className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="platform-badge bg-blue-500">
                      <i className="fab fa-twitter"></i>
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold">#AIArtChallenge</h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Rising</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Creators sharing AI-generated artwork with specific prompts
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">245K</span> posts • <span>+12% in 2h</span>
                      </div>
                      <button className="text-xs text-purple-600 hover:text-purple-800 font-medium">
                        Analyze <ChevronRight className="ml-1 inline-block h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Trend Item */}
              <div className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="platform-badge bg-black">
                      <i className="fab fa-tiktok"></i>
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold">Morning Routine Hacks</h3>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">Viral</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">5-second productivity tricks to start your day right</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">1.2M</span> views • <span>+32% in 4h</span>
                      </div>
                      <button className="text-xs text-purple-600 hover:text-purple-800 font-medium">
                        Analyze <ChevronRight className="ml-1 inline-block h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Trend Item */}
              <div className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="platform-badge bg-pink-600">
                      <i className="fab fa-instagram"></i>
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold">Minimalist Workspaces</h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Peaking</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Clean desk setups with just the essentials</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">580K</span> posts • <span>+8% in 6h</span>
                      </div>
                      <button className="text-xs text-purple-600 hover:text-purple-800 font-medium">
                        Analyze <ChevronRight className="ml-1 inline-block h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 text-center">
              <button className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                View all trending topics <ChevronRight className="ml-1 inline-block h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trend Analytics Section */}
      <section id="analytics" className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Trend Analytics</h2>
              <p className="text-gray-600">Deep dive into trend performance and audience insights</p>
            </div>
            <div className="mt-4 md:mt-0">
              <select className="bg-white border border-gray-300 rounded-lg px-4 py-2">
                <option>#AIArtChallenge</option>
                <option>Morning Routine Hacks</option>
                <option>Minimalist Workspaces</option>
                <option>Other trends...</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">#AIArtChallenge Growth</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">24h</button>
                  <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm">7d</button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">30d</button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="trend-chart">
                <canvas id="trendChart"></canvas>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-500 text-sm">Peak Volume</div>
                  <div className="text-xl font-bold mt-1">1.8M</div>
                  <div className="text-green-500 text-sm mt-2 flex items-center">
                    <ArrowUp className="mr-1 h-4 w-4" /> 32% from last week
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-500 text-sm">Engagement Rate</div>
                  <div className="text-xl font-bold mt-1">4.7%</div>
                  <div className="text-green-500 text-sm mt-2 flex items-center">
                    <ArrowUp className="mr-1 h-4 w-4" /> 1.2% from last week
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-500 text-sm">Top Platform</div>
                  <div className="text-xl font-bold mt-1 flex items-center">
                    <i className="fab fa-twitter text-blue-400 mr-2"></i> Twitter
                  </div>
                  <div className="text-gray-500 text-sm mt-2">68% of total mentions</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-500 text-sm">Predicted Duration</div>
                  <div className="text-xl font-bold mt-1">9 days</div>
                  <div className="text-gray-500 text-sm mt-2">Likely to peak in 3 days</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-bold">Top Related Hashtags</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">#DigitalArt</div>
                    <div className="text-sm text-gray-500">Correlation: 0.87</div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">#CreativeAI</div>
                    <div className="text-sm text-gray-500">Correlation: 0.79</div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">#ArtCommunity</div>
                    <div className="text-sm text-gray-500">Correlation: 0.72</div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">#TechArt</div>
                    <div className="text-sm text-gray-500">Correlation: 0.65</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-bold">Audience Demographics</h3>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-500 text-sm mb-2">Age Groups</div>
                    <canvas id="ageChart" height="150"></canvas>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-2">Gender</div>
                    <canvas id="genderChart" height="150"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Ideas Section */}
      <section id="ideas" className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Content Ideas</h2>
              <p className="text-gray-600">Personalized suggestions based on trending topics and your niche</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-8 py-2">
                  <option>All Platforms</option>
                  <option>Twitter</option>
                  <option>TikTok</option>
                  <option>Instagram</option>
                  <option>YouTube</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 text-gray-400 h-4 w-4" />
              </div>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center">
                <Magic className="mr-2 h-4 w-4" /> Generate More
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Idea Card */}
            <div className="content-idea-card bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="platform-badge bg-blue-500 mr-3">
                    <i className="fab fa-twitter"></i>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">High Engagement</span>
                </div>
                <h3 className="font-bold mb-2">"AI Art Showcase Thread"</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Create a Twitter thread showcasing different AI art styles with examples and tools used
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">#AIArt</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">#DigitalArt</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">#Creativity</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <span className="ml-2 font-medium">85% match</span>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center">
                  <Bookmark className="mr-1 h-4 w-4" /> Save
                </button>
                <button className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center">
                  View Details <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
            {/* Idea Card */}
            <div className="content-idea-card bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="platform-badge bg-black mr-3">
                    <i className="fab fa-tiktok"></i>
                  </div>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                    Viral Potential
                  </span>
                </div>
                <h3 className="font-bold mb-2">"AI Art Challenge Entry"</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Participate in the trend by creating your own AI art with a popular prompt
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full">#AIArtChallenge</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">#Trending</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                  <span className="ml-2 font-medium">92% match</span>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center">
                  <Bookmark className="mr-1 h-4 w-4" /> Save
                </button>
                <button className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center">
                  View Details <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
            {/* Idea Card */}
            <div className="content-idea-card bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="platform-badge bg-pink-600 mr-3">
                    <i className="fab fa-instagram"></i>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Quick Win</span>
                </div>
                <h3 className="font-bold mb-2">"AI Art Carousel"</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Post a carousel comparing different AI art styles with commentary
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">#AIArt</span>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">#ArtTech</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                  <span className="ml-2 font-medium">78% match</span>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center">
                  <Bookmark className="mr-1 h-4 w-4" /> Save
                </button>
                <button className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center">
                  View Details <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-12 gradient-bg text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block px-3 py-1 bg-white text-purple-700 rounded-full text-sm font-bold mb-4">
              <Crown className="inline-block mr-1 h-4 w-4" /> TRENDSYNC PRO
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Unlock Advanced Trend Insights</h2>
            <p className="text-xl mb-8">
              Get real-time alerts, historical data, and AI-powered content recommendations with TrendSync Pro
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-3 bg-white text-purple-700 font-bold rounded-lg hover:bg-gray-100 transition duration-300">
                Start 7-Day Free Trial
              </button>
              <button className="px-8 py-3 border border-white text-white font-bold rounded-lg hover:bg-white hover:text-purple-700 transition duration-300">
                Compare Plans
              </button>
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
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
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
              <Link href="/" className="hover:text-white">
                Back to Home
              </Link>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
