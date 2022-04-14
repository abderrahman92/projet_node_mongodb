const mongoose = require('mongoose')
const { ArticleModel,UserModel } = require('../models/Article')

module.exports = {

    getArticles: (req, res) => {
      ArticleModel.find({}, (err, articles) => {
        if (err) {
          res.status(500).send(err)
      }
        else {
                if (!articles) {
                    res.status(404).send('Aucun article trouvé')
                }
                res.status(200).render('index', {
                  articles
                })
            }
        })
      },
      getArticle_info: (req, res) => {
        ArticleModel.find({_id:req.params.id}, (err, articles) => {
            if (err) {
                res.status(500).send(err)
            }
            else {
                if (!articles) {
                    res.status(404).send('Aucun article trouvé')
                }
                UserModel.find({}, (err, user_id) => {
                    if (err) {
                        res.status(500).render('error', {
                            message: 'Error when getting things',
                            error: err.message
                        })
                    } else {
                        res.status(200).render('article', {
                            message: 'Things retrieved',
                            articles,
                            user_id
                        })
                    }
                })
            }
        })
        
    },

    postArticles: (req, res) => {
      UserModel.findById(req.body.user, (err, user) => {
          if (err) {
              res.status(500).send(err)
          } else {
              const article = new ArticleModel({
                  _id: new mongoose.Types.ObjectId(),
                  name: req.body.name,
                  description: req.body.description,
                  user_id: user.id
              })
              article.save((err, article) => {
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
    },
    deleteArticle: (req, res) => {
      ArticleModel.deleteMany({ _id: req.params.id}, (err, things) => {
        if (err) {
          res.status(500).render('error', {
              error: err
          })
      } else {
          res.status(200).redirect('/')
      }
      })
    },
    editArticle: (req, res) => {
      ArticleModel.findByIdAndUpdate({ _id: req.params.id},{description:'update'}, (err, things) => {
        if (err) {
          res.status(500).render('error', {
              error: err
          })
      } else {
          res.status(200).redirect('/')
      }
      })
    } 

  
    
}
