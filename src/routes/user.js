const userController = require('../controllers/userController')
const express = require('express')
const router = express.Router();
const {verifyToken} = require('../middleware/auth')
const Validator = require('../middleware/validator');
const {authRole} = require('../middleware/roles')

/**
*@swagger
* components:
*  schema:
*   user:
*    type: object
*    properties:
*     id:
*      type: integer
*     fullname:
*      defaul: null
*      type: string
*     email:
*      type: string
*      defaul: null
*     password:
*      type: string
*     gender:
*      type: string
*     token:
*      type: string
*
*/

/**
 * @swagger
 *  /user/login:
 *   get:
 *    tags:
 *     - User
 *    summary: redirect to login
 *    responses:
 *       200:
 *        description: successfull
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *            type: string
 *   post:
 *    tags:
 *     - User
 *    summary: Login user
 *    requestBody:
 *      require: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schema/user'
 *    responses:
 *     200:
 *      description: Login successful 
 *     404:
 *      description: Login not found
 *  
*/

router.post('/login',Validator('login'),userController.login)
router.get('/login',userController.indexLogin)
/**
 * @swagger
 *  /user/register:
 *   get:
 *    tags:
 *     - User
 *    summary: redirect to register
 *    responses:
 *       200:
 *        description: successfull
 *       500:
 *         description: Internal Server Error
 *         content:
 *          application/json:
 *            type: string
 *   post:
 *    tags:
 *     - User
 *    summary: register user
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schema/user'
 *    responses:
 *     200:
 *      description: register successful 
 *     500:
 *      description: Internal Server Error
 *  
*/
router.get('/edit',verifyToken,userController.edit)
router.get('/profile',verifyToken,userController.detail)
router.post('/register',userController.register)
router.get('/register',userController.indexRegister)
router.get('/welcome',verifyToken,userController.welcome)
module.exports = router;
