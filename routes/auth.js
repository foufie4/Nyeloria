const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Affiche les formulaires (ou API POST depuis HTML)
router.post('/register', async (req, res) => {
  const { pseudo, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).send('Email déjà utilisé.');

    const user = new User({ pseudo, email, password });
    await user.save();
    req.session.userId = user._id;
    res.redirect('/profile');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Utilisateur non trouvé.');
    const match = await user.comparePassword(password);
    if (!match) return res.status(400).send('Mot de passe incorrect.');

    req.session.userId = user._id;
    res.redirect('/profile');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;