const mongoose = require('mongoose');

const trendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  platforms: [{
    name: {
      type: String,
      enum: ['twitter', 'instagram', 'tiktok', 'youtube'],
      required: true
    },
    volume: Number,
    engagement: Number,
    growth_rate: Number,
    sentiment_score: Number,
    platform_specific_data: mongoose.Schema.Types.Mixed
  }],
  category: {
    type: String,
    enum: ['entertainment', 'technology', 'lifestyle', 'sports', 'news', 'other'],
    required: true
  },
  status: {
    type: String,
    enum: ['rising', 'viral', 'peaking', 'declining'],
    required: true
  },
  analytics: {
    total_mentions: Number,
    total_engagement: Number,
    peak_volume: Number,
    average_sentiment: Number,
    demographic_data: {
      age_groups: Map,
      regions: Map,
      gender_distribution: Map
    },
    velocity: Number
  },
  related_hashtags: [{
    name: String,
    correlation: Number
  }],
  content_suggestions: [{
    type: String,
    suggestion: String,
    platform: String,
    confidence_score: Number,
    generated_at: Date
  }],
  historical_data: [{
    timestamp: Date,
    volume: Number,
    engagement: Number,
    sentiment: Number
  }],
  first_detected: {
    type: Date,
    default: Date.now
  },
  last_updated: {
    type: Date,
    default: Date.now
  },
  predicted_duration: Number,
  peak_time: Date,
  is_active: {
    type: Boolean,
    default: true
  }
});

// Index for efficient querying
trendSchema.index({ status: 1, 'platforms.name': 1 });
trendSchema.index({ category: 1, is_active: 1 });
trendSchema.index({ first_detected: -1 });

// Method to calculate trend score
trendSchema.methods.calculateTrendScore = function() {
  const weights = {
    volume: 0.3,
    engagement: 0.3,
    growth_rate: 0.2,
    sentiment: 0.2
  };

  return this.platforms.reduce((score, platform) => {
    return score + (
      (platform.volume || 0) * weights.volume +
      (platform.engagement || 0) * weights.engagement +
      (platform.growth_rate || 0) * weights.growth_rate +
      (platform.sentiment_score || 0) * weights.sentiment
    );
  }, 0);
};

// Method to update trend status
trendSchema.methods.updateStatus = function() {
  const hoursSinceDetection = (Date.now() - this.first_detected) / (1000 * 60 * 60);
  const recentData = this.historical_data.slice(-6); // Last 6 data points

  if (recentData.length < 2) return this.status;

  const growth = (recentData[recentData.length - 1].volume - recentData[0].volume) / recentData[0].volume;

  if (hoursSinceDetection < 24 && growth > 0.5) return 'rising';
  if (growth > 1.0) return 'viral';
  if (growth > 0 && growth <= 0.2) return 'peaking';
  return 'declining';
};

module.exports = mongoose.model('Trend', trendSchema);