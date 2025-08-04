import { Router } from 'express';
import clientController from '../controllers/clientController';

const clientRoutes = Router();

clientRoutes.get('/', clientController.getAllClients);
/**
 * @swagger
 * /client:
 *   get:
 *     summary: Lista todos os clientes com paginação
 *     tags: [Clientes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         example: 1
 *         description: Número da página
 *       - in: query
 *         name: pageLimit
 *         schema:
 *           type: integer
 *         required: false
 *         example: 10
 *         description: Quantidade de itens por página
 *     responses:
 *       200:
 *         description: Lista de clientes obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/PaginatedResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Client'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

clientRoutes.get('/:id', clientController.getClientById);
/**
 * @swagger
 * /client/{id}:
 *   get:
 *     summary: Busca um cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

clientRoutes.get('/search/:name', clientController.searchClients);
/**
 * @swagger
 * /client/search/{name}:
 *   get:
 *     summary: Busca clientes pelo nome
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         example: João
 *         description: Nome do cliente (ou parte dele)
 *     responses:
 *       200:
 *         description: Lista de clientes encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

clientRoutes.post('/register', clientController.register);
/**
 * @swagger
 * /client/register:
 *   post:
 *     summary: Cadastra um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - address
 *               - cpf
 *             properties:
 *               name:
 *                 type: string
 *                 example: Maria Silva
 *               phone:
 *                 type: string
 *                 example: (11) 91234-5678
 *               address:
 *                 type: string
 *                 example: Rua das Flores, 123
 *               cpf:
 *                 type: string
 *                 example: 123.456.789-00
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

clientRoutes.delete('/delete/:id', clientController.deleteClient);
/**
 * @swagger
 * /client/delete/{id}:
 *   delete:
 *     summary: Exclui um cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 3
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cliente removido com sucesso
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

clientRoutes.patch('/update/:id', clientController.updateClient);
/**
 * @swagger
 * /client/update/{id}:
 *   patch:
 *     summary: Atualiza um cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Pedro
 *               phone:
 *                 type: string
 *                 example: (11) 98888-7777
 *               address:
 *                 type: string
 *                 example: Avenida Brasil, 456
 *               cpf:
 *                 type: string
 *                 example: 987.654.321-00
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

export default clientRoutes;
