var express = require('express');
var router = express.Router();
const userControllers = require('../controllers/userControllers');
const articleControllers = require('../controllers/articleControllers')



/* GET all users page. */
router.get('/users', userControllers.getUsers);
/* POST  users page. */
router.post('/users', userControllers.postUser);
/* EDITE article Methode. */
router.put('/edite/users/:id', userControllers.editUser);
/* DELETE article Methode. */
router.get('/delete/users/:id', userControllers.deleteUser);





/* GET all articles Methode */
router.get('/', articleControllers.getArticles);
/* GET user_id articles pick-list */
/* POST article Methode. */
router.post('/', articleControllers.postArticle);
/* GET  article by ->id. Methode */
router.get('/article/:id', articleControllers.getArticle_info)
/* DELETE article Methode. */
router.get('/delete/:id', articleControllers.deleteArticle);
/* EDITE article Methode. */
router.put('/edite/article/:id', articleControllers.editArticle);


module.exports = router;
