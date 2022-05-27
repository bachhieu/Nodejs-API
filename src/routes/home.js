const homeRouter = require('../controllers/homeController')
const express = require('express')
const router = express.Router();
const {verifyToken} = require('../middleware/auth')
/**
 * @swagger
 * components:
 *  schema:
 *   book:
 *    type: object
 *    properties:
 *     id:
 *      type: integer
 *     name:
 *      type: string
 *     price:
 *      type: integer
 *     description:
 *      type: string
 *     image:
 *      type: file
 *      data: buffer
 *      contentType: string
 *     rating:
 *      type: integer
 *     slug:
 *      type: sting
 *      slug: name
 *     avgRating:
 *      type: integer
 *      default: 0
 *     category:
 *      type: array
 *    example:
 *      id:
 *      name: 
 *      price:
 *      description: 
 *      avgRating:
 *      slug:
 *       
 */
/**
 * @swagger
 * tags:
 * - name: Books
 *   description: the book API
 * - name: User
 *   description: Login & register
 * - name: Home
 *   description: list of books
 */

router.post('/',homeRouter.index)


/**
 * @swagger
 *  /:
 *  get:
 *   tags:
 *    - Home
 *   summary: the list of books
 *   responses:
 *    200:
 *     description: the list of books
 *    500:
 *     description: Internal Server Error
 *     content:
 *      application/json:
 *       schema:
 *         $ref: "#/components/schema/book"
 *  post:
 *    tags:
 *     - Home
 *    summary: list of books
 *    responses:
 *     200:
 *       description: the list of books
 *     500:
 *       description: Internal Server Error
 *       content:
 *        application/json:
 *         schema:
 *          type: array
 *          items:
 *           $ref : '#/components/schema/book'
 * 
 */
router.get('/',verifyToken,homeRouter.index)

module.exports = router;
