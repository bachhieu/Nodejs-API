const bookController = require('../controllers/bookController')
const upload = require('../middleware/storage')
const express = require('express')
const router = express.Router();


router.get('/filter',bookController.filter)
// router.get('/edit',bookController.edit)
router.get('/detail',bookController.detail)
router.post('/create',upload.single('image'),bookController.create)
router.get('/create',bookController.index)
// router.get('/create',bookController.index)
router.delete('/:slug/delete',bookController.delete)
router.post('/:slug/edit',bookController.edit)
router.get('/:slug/edit',bookController.showedit)
router.post('/:slug',bookController.rating)
router.get('/:slug',bookController.detail)
// router.get('/register',bookController.register)

module.exports = router;
/**
 * @swagger
 * components:
 *  schema:
 *   book:
 *    type: object
 *    properties:
 *     id:
 *       type: integer
 *     name:
 *       type: string
 *     price:
 *       type: integer
 *     description:
 *       type: string
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
 *      id: 1
 *      name: PHP
 *      price: 10000
 *      description: book for development
 *       
 */
/**
 * @swagger
 * /book/{slug}:
 *   get:
 *    tags:
 *     - Books
 *    summary: Book detail
 *    parameters:
 *    - name: slug
 *      in: path
 *      type: string
 *      description: slug Book detail 
 *      repuired: true
 *    responses:
 *      200:
 *        description: successful 
 *      404:
 *        description: not found Book
 *   post:
 *    tags:
 *     - Books
 *    summary: Rating book
 *    parameters:
 *     - name: slug
 *       in: path
 *       description: slug Book detail
 *       required: true
 *    requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *          $ref: '#/components/schema/book'
 *    responses:
 *      200:
 *       description: Rating book successfully
 *      500:
 *       description: Internal Server Error
 * /book/{slug}/edit:
 *   get:
 *    tags:
 *     - Books
 *    summary: page edit book
 *    parameters:
 *     - name: slug
 *       in: path
 *       description: slug Book edit
 *       required: true
 *    responses:
 *      200:
 *       description: Book edit successfully
 *      404:
 *       description: Book not found   
 *   post:
 *    tags:
 *     - Books
 *    summary: edited book
 *    parameters:
 *     - name: slug
 *       in: path
 *       required: true
 *       description: slug of the book 
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schema/book'
 *    responses:
 *      200:
 *       description: edited book successfully
 *      500:
 *       description: Internal Server Error
 * /book/{slug}/delete?_method="DELETE":
 *   delete:
 *    tags:
 *     - Books
 *    summary: delete a book by slug
 *    parameters:
 *    - name: slug
 *      in: path
 *      required: true
 *      description: slug of the book want delete
 *    responses: 
 *      200:
 *        description: book deleted successfully
 *      404:
 *        description: book not found
 * /book/create:
 *  post:
 *    tags:
 *     - Books
 *    summary: Create book
 *    requestBody:
 *     content:
 *      multipart/form-data: 
 *       schema:
 *         $ref: '#/components/schema/book'
 *    responses:
 *      201:
 *       description: Created book successfully
 *      500:
 *       description: Internal Server Error
 * /book/filter:
 *   get:
 *    tags:
 *    - Books
 *    summary: Filter book by category or name
 *    parameters:
 *     - name: category
 *       in: query
 *       schema:
 *         type: array
 *         items:
 *          type: string
 *       description: filter books by category
 *     - name: name
 *       in: query
 *       description: filter books by name
 *    responses:
 *       200:
 *        description: filter books successfully
 *       404:
 *        description: books not found
 *       
 *    
 * 
 *      
 * 
 */

//  requestBody:
//  *     required: true
//  *     content:
//  *      application/json:
//  *       schema:
//  *         $ref: '#/components/schema/book'
// - name: name
// *        in : formData
// *        description: name of the book
// *        schema:
// *          type: string
// *      - name: price 
// *        description: price of the book
// *        in: formData
// *        schema:
// *          type: number
// *      - name: description
// *        description: description of the book
// *        in: formData
// *        schema:
// *          type: string 
// *      - name: image
// *        description: image of the book
// *        in: formData
// *        required: true 
// *        schema:
// *          type: file