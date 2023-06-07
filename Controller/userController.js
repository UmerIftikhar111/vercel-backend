
const User = require('../Models/userModel');
const Hotel = require('../Models/hotelModel')
const jwt = require('jsonwebtoken');


let Signup = (req, res) => {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({ "Success":true,'Message': 'user added successfully' });
        })
        .catch(err => {
            res.status(400).send({"Success":false,"Message":'adding new user failed' , err});
        });
}


let Signin = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let hotelmail = req.body.hotelmail;
  
    // Find user by email
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return res.status(400).json({ Success: false, Message: 'User not found' });
        }
  
        if (user.password !== password) {
          return res.status(400).json({ Success: false, Message: 'Incorrect password' });
        }
  
        // Find hotel by email
        Hotel.findOne({ contactInformation: hotelmail })
          .then((hotel) => {
            if (!hotel) {
              return res.status(400).json({ Success: false, Message: 'Hotel not found' });
            }
  
            let token = jwt.sign(
              {
                email: user.email,
                id: user._id,
                role: user.role,
                hotelId: hotel._id,
              },
              process.env.secret_key,
              { expiresIn: '3h' }
            );
  
            res.status(200).json({
              Success: true,
              user,
              token,
              hotelId: hotel._id,
              Message: 'User logged in successfully',
            });
          })
          .catch((err) => {
            res.status(400).json({ Success: false, Message: 'Failed to find hotel: ' + err });
          });
      })
      .catch((err) => {
        res.status(400).json({ Success: false, Message: 'User login failed: ' + err });
      });
  };
  

module.exports = {
    Signup,
    Signin
}