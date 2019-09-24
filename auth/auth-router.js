const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

const Users = require('../users/users-model');

router.post('/register', (req, res) => {
  // implement registration

  if (req.body.username && req.body.password && req.body.email) {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // hash the password
    user.password = hash; // reset password as hashed password

    Users.add(user)
      .then(saved => {
        const token = createToken(saved)
        console.log('token ', token);
        
        res.status(201).json({
          user:saved,
          token:token
      });
      })
      .catch(err => {
        res.status(500).json({
          message: 'There was an error while trying to add that user.'
        });
      });
  } else {
    res.status(400).json({ message: 'Please enter a username and password.' });
  }
});

router.post('/login', (req, res) => {
  // implement login
  if (req.body.username && req.body.password) {
    let { username, password } = req.body;
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = createToken(user);
          res.status(200).json({ message: `Welcome, ${user.username}`, token });
        } else {
          res.status(401).json({ message: "Those credentials aren't valid." });
        }
      });
  } else {
    res.status(400).json({ message: 'Please enter a username and password.' });
  }
});

function createToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, 'secrets', options);
}

module.exports = router;
