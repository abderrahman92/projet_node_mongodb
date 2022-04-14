const mongoose = require('mongoose')
const { ArticleModel,UserModel } = require('../models/Article')

module.exports = {
    //GET ALL ARTICLES
    getArticles: (req, res) => {
      ArticleModel.find({}, (err, articles) => {
        if (err) {
          res.status(500).send(err)
      }
     
          UserModel.find({}, (err, user_id) => {
              if (err) {
                  res.status(500).render('error', {
                      message: 'Error when getting things',
                      error: err.message
                  })
              } else {
                  res.status(200).render('index', {
  
                      articles,
                      user_id
                  })
                }
          })
      })

    },
    //GET ARTICLE INFO
    getArticle_info: (req, res) => {
        ArticleModel.findById(req.params.id, (err, articles) => {
          
            if (err) {
                res.status(500).send(err)
            }
            else {
                if (!articles) {
                    res.status(404).send('Aucun article trouvé')
                }
                const id = articles.user_id
                console.log(id)
                UserModel.findById(id, (err, user_id) => {
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
    //POST ARTICLE
    postArticle: (req, res) => {
      const article = new ArticleModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        user_id: req.body.test,
        
      })
    
        article.save((err, articles) => {
            if (err) {
                res.status(500).render('error', {
                    error: err
                })
            } else {
              res.status(200).redirect('/')
            }
        })

    },
    //DELETE ARTICLE
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
    //EDITE ARTICLE CHAMPS(DESCRIPTION)
    editArticle: (req, res) => {
      ArticleModel.findByIdAndUpdate({ _id: req.params.id},{description:req.body.description}, (err, article) => {
        if (err) {
          res.status(500).render('error', { 
              error: err
          })
      } else {
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
    } 

  
    
}
