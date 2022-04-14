const mongoose = require('mongoose')
const { UserModel } = require('../models/Article')


module.exports = {

   
  getUsers: (req, res) => {
      UserModel.find({}, (err, users) => {
          if (err) {
              res.status(500).send(err)
          }
          else {
              if (!users) {
                  res.status(404).send('Aucun auteur trouvé')
              }
              res.status(200).render('users', {
                  users
              })
          }
      })
  },
  
  postUsers: (req, res) => {
    const Author = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        firstname: req.body.firstname,
        lastename: req.body.lastename,
        age: req.body.age,
        
    })
    Author.save((err, users) => {
        if (err) {
            res.status(500).render('error', {
                error: err
            })
        } else {
            res.status(200).redirect('/users')
        }
    })
  },
   
}
