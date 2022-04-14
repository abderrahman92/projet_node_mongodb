var express = require('express');
var router = express.Router();
const userControllers = require('../controllers/userControllers');
const articleControllers = require('../controllers/articleControllers')



/* GET all users page. */
router.get('/users', userControllers.getUsers);
/* POST  users page. */
router.post('/users', userControllers.postUsers);


/* GET all articles Methode */
router.get('/', articleControllers.getArticles);
/* GET  article by ->id. Methode */
router.get('/article/:id', articleControllers.getArticle_info)
/* POST article Methode. */
router.post('/article', articleControllers.postArticles);
/* DELETE article Methode. */
router.get('/delete/:id', articleControllers.deleteArticle);
/* EDITE article Methode. */
router.patch('/edite/:id', articleControllers.editArticle);


module.exports = router;
