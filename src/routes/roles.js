import express from 'express';
const router = express.Router();
import RolesController from '../controllers/role.controller.js';

const controller = new RolesController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - role_name
 *       properties:
 *         id:
 *           type: integer
 *         role_name:
 *           type: string
 *       example:
 *         role_name: Admin
 */

/**
 * @swagger
 * tags:
 *  name: Roles
 *  description: The roles managing API
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: A list of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */

router.get('/', controller.getAll);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the role
 *         schema:
 *           type: integer
 *           required: true
 *     responses:
 *      200:
 *         description: A single role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 */

router.get('/:id', controller.getById);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       '201':
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 */
router.post('/', controller.createRole);
export default router;
