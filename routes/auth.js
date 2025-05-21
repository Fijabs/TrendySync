const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      email,
      password,
      name,
      trialEnds: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days trial
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, subscription: user.subscription },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        subscription: user.subscription,
        trialEnds: user.trialEnds
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, subscription: user.subscription },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        subscription: user.subscription,
        trialEnds: user.trialEnds
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Social media platform OAuth routes
const platforms = ['twitter', 'instagram', 'tiktok', 'youtube'];

platforms.forEach(platform => {
  // Initialize OAuth flow
  router.get(`/${platform}`, passport.authenticate(platform, {
    scope: platform === 'youtube' ? ['https://www.googleapis.com/auth/youtube.readonly'] :
           platform === 'twitter' ? ['tweet.read', 'users.read'] :
           ['basic']
  }));

  // OAuth callback
  router.get(`/${platform}/callback`,
    passport.authenticate(platform, { session: false }),
    async (req, res) => {
      try {
        const user = await User.findById(req.user.id);
        
        // Update social account information
        const accountIndex = user.socialAccounts.findIndex(acc => acc.platform === platform);
        const socialAccount = {
          platform,
          accessToken: req.authInfo.accessToken,
          refreshToken: req.authInfo.refreshToken,
          platformUserId: req.authInfo.profile.id,
          username: req.authInfo.profile.username
        };

        if (accountIndex > -1) {
          user.socialAccounts[accountIndex] = socialAccount;
        } else {
          user.socialAccounts.push(socialAccount);
        }

        await user.save();

        res.redirect('/dashboard?connection=success');
      } catch (error) {
        res.redirect('/dashboard?connection=error');
      }
    }
  );
});

// Get current user
router.get('/me', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

// Update user preferences
router.patch('/preferences', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.preferences = { ...user.preferences, ...req.body };
    await user.save();
    res.json(user.preferences);
  } catch (error) {
    res.status(500).json({ message: 'Error updating preferences', error: error.message });
  }
});

module.exports = router;