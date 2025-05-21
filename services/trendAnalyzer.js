const natural = require('natural');
const { TwitterApi } = require('twitter-api-v2');
const { IgApiClient } = require('instagram-private-api');
const { google } = require('googleapis');
const TikTokScraper = require('tiktok-scraper');
const Trend = require('../models/Trend');
const User = require('../models/User');

class TrendAnalyzer {
  constructor() {
    this.tokenizer = new natural.WordTokenizer();
    this.tfidf = new natural.TfIdf();
    this.sentiment = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
  }

  async analyzeTrends() {
    try {
      const platformData = await Promise.all([
        this.getTwitterTrends(),
        this.getInstagramTrends(),
        this.getTikTokTrends(),
        this.getYoutubeTrends()
      ]);

      const trends = this.processTrends(platformData);
      await this.saveTrends(trends);
      await this.generateContentSuggestions(trends);

      return trends;
    } catch (error) {
      throw new Error(`Trend analysis failed: ${error.message}`);
    }
  }

  async getTwitterTrends() {
    const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);
    const trends = await client.v2.trendingTopics();
    return this.processTwitterData(trends);
  }

  async getInstagramTrends() {
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    const explore = await ig.discover.explore();
    return this.processInstagramData(explore);
  }

  async getTikTokTrends() {
    const trends = await TikTokScraper.trend('', {
      number: 50,
      sessionList: process.env.TIKTOK_SESSION_LIST.split(',')
    });
    return this.processTikTokData(trends);
  }

  async getYoutubeTrends() {
    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY
    });
    
    const response = await youtube.videos.list({
      part: 'snippet,statistics',
      chart: 'mostPopular',
      regionCode: 'US',
      maxResults: 50
    });
    
    return this.processYoutubeData(response.data.items);
  }

  processTrends(platformData) {
    const trends = new Map();

    platformData.forEach(({ platform, data }) => {
      data.forEach(item => {
        const trendName = this.normalizeTrendName(item.name);
        
        if (!trends.has(trendName)) {
          trends.set(trendName, {
            name: trendName,
            platforms: [],
            category: this.categorize(item),
            status: 'rising',
            analytics: {
              total_mentions: 0,
              total_engagement: 0,
              sentiment_score: 0
            }
          });
        }

        const trend = trends.get(trendName);
        trend.platforms.push({
          name: platform,
          volume: item.volume,
          engagement: item.engagement,
          growth_rate: item.growth_rate,
          sentiment_score: this.analyzeSentiment(item.content),
          platform_specific_data: item.metadata
        });

        trend.analytics.total_mentions += item.volume || 0;
        trend.analytics.total_engagement += item.engagement || 0;
        trend.analytics.sentiment_score += this.analyzeSentiment(item.content);
      });
    });

    return Array.from(trends.values());
  }

  async generateContentSuggestions(trends) {
    for (const trend of trends) {
      const suggestions = [];
      
      // Generate platform-specific content suggestions
      trend.platforms.forEach(platform => {
        const suggestion = this.generatePlatformSuggestion(trend, platform.name);
        if (suggestion) {
          suggestions.push({
            type: 'content',
            suggestion,
            platform: platform.name,
            confidence_score: this.calculateConfidenceScore(trend, platform),
            generated_at: new Date()
          });
        }
      });

      // Update trend with suggestions
      await Trend.findOneAndUpdate(
        { name: trend.name },
        { $set: { content_suggestions: suggestions } }
      );
    }
  }

  generatePlatformSuggestion(trend, platform) {
    const templates = {
      twitter: [
        'Create a poll about {trend}',
        'Share your thoughts on {trend} with a thread',
        'Start a discussion about {trend}'
      ],
      instagram: [
        'Create a carousel post explaining {trend}',
        'Share a behind-the-scenes story about {trend}',
        'Design an infographic about {trend}'
      ],
      tiktok: [
        'Create a {trend} challenge',
        'Make a tutorial related to {trend}',
        'Share your reaction to {trend}'
      ],
      youtube: [
        'Create a detailed analysis of {trend}',
        'Make a how-to video about {trend}',
        'Share your experience with {trend}'
      ]
    };

    const templateList = templates[platform];
    const randomIndex = Math.floor(Math.random() * templateList.length);
    return templateList[randomIndex].replace('{trend}', trend.name);
  }

  calculateConfidenceScore(trend, platform) {
    const weights = {
      volume: 0.3,
      engagement: 0.3,
      growth_rate: 0.2,
      sentiment: 0.2
    };

    const platformData = trend.platforms.find(p => p.name === platform);
    if (!platformData) return 0;

    return (
      (platformData.volume / trend.analytics.total_mentions) * weights.volume +
      (platformData.engagement / trend.analytics.total_engagement) * weights.engagement +
      platformData.growth_rate * weights.growth_rate +
      platformData.sentiment_score * weights.sentiment
    );
  }

  normalizeTrendName(name) {
    return name.toLowerCase().trim();
  }

  categorize(item) {
    const categories = {
      entertainment: ['movie', 'music', 'celebrity', 'game', 'show'],
      technology: ['tech', 'coding', 'ai', 'digital', 'software'],
      lifestyle: ['fashion', 'food', 'travel', 'fitness', 'health'],
      sports: ['sport', 'football', 'basketball', 'soccer', 'athlete'],
      news: ['breaking', 'politics', 'world', 'update', 'report']
    };

    const tokens = this.tokenizer.tokenize(item.name.toLowerCase());
    
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => tokens.includes(keyword))) {
        return category;
      }
    }

    return 'other';
  }

  analyzeSentiment(content) {
    if (!content) return 0;
    const tokens = this.tokenizer.tokenize(content);
    return this.sentiment.getSentiment(tokens);
  }

  async saveTrends(trends) {
    for (const trend of trends) {
      await Trend.findOneAndUpdate(
        { name: trend.name },
        {
          $set: trend,
          $push: {
            historical_data: {
              timestamp: new Date(),
              volume: trend.analytics.total_mentions,
              engagement: trend.analytics.total_engagement,
              sentiment: trend.analytics.sentiment_score
            }
          }
        },
        { upsert: true, new: true }
      );
    }
  }
}

module.exports = new TrendAnalyzer();