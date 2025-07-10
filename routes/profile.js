const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  if (!req.session.userId) return res.redirect('/auth/login');

  const user = await User.findById(req.session.userId);
  if (!user) return res.redirect('/auth/login');

  res.json({
    pseudo: user.pseudo,
    currentChapter: user.currentChapter,
    currentPage: user.currentPage,
    nextUnlock: user.nextUnlock,
  });
});

module.exports = router;