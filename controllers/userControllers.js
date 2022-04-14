const mongoose = require('mongoose')
const { UserModel } = require('../models/Article')


module.exports = {

   // GET USERS FUNCTION
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
  //POST USER FUNCTION
  postUser: (req, res) => {
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

  //DELETE USER FONCTION
  deleteUser: (req, res) => {
    UserModel.deleteMany({ _id: req.params.id}, (err, things) => {
      if (err) {
        res.status(500).render('error', {
            error: err
        })
    } else {
        res.status(200).redirect('/')
    }
    })
  },
  
  //   //EDITE ARTICLE CHAMP(DESCRIPTION)
  editUser: (req, res) => {
        UserModel.findByIdAndUpdate({ _id: req.params.id},{firstname:req.body.firstname}, (err, users) => {
            if (err) {
              res.status(500).render('error', { 
                  error: err
              })
          } else {
            users.save((err, article) => {
                  if (err) {
                      res.status(500).render('error', {
                          error: err
                      })
                  } else {
                      res.status(200).redirect('/')
                  } 
              })
            }
        })
  }
 
}
