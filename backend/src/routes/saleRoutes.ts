import { Router } from 'express';
import saleController from '../controllers/saleController';

const saleRouter = Router();

saleRouter.post('/', saleController.create);
/**
 * @swagger
 * /sale:
 *   post:
 *     summary: Cria uma nova venda
 *     tags: [Vendas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientId
 *               - userOperator
 *               - paymentMethod
 *               - date
 *               - totalProductsWithoutDiscount
 *               - total
 *               - isPaid
 *               - discount
 *               - profitSale
 *               - products
 *             properties:
 *               clientId:
 *                 type: integer
 *                 example: 1
 *               userOperator:
 *                 type: integer
 *                 example: 1
 *               paymentMethod:
 *                 type: string
 *                 example: Cartão
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-08-04T12:00:00Z
 *               products:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/SaleProductInput'
 *               totalProductsWithoutDiscount:
 *                 type: number
 *                 example: 150.00
 *               total:
 *                 type: number
 *                 example: 135.00
 *               isPaid:
 *                 type: boolean
 *                 example: true
 *               discount:
 *                 type: number
 *                 example: 15.00
 *               profitSale:
 *                 type: number
 *                 example: 45.00
 *     responses:
 *       201:
 *         description: Venda criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */


saleRouter.get('/', saleController.getAll);
/**
 * @swagger
 * /sale:
 *   get:
 *     summary: Lista todas as vendas (com filtros e paginação), caso não seja passado nenhum filtro, retorna todas as vendas, caso seja passado algum filtro, retorna as vendas que correspondem aos filtros
 *     tags: [Vendas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página
 *       - in: query
 *         name: pageLimit
 *         schema:
 *           type: integer
 *         description: Limite de itens por página
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: ID da venda
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data inicial (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data final (YYYY-MM-DD)
 *       - in: query
 *         name: client
 *         schema:
 *           type: string
 *         description: Nome do cliente
 *       - in: query
 *         name: operator
 *         schema:
 *           type: string
 *         description: Nome do operador
 *       - in: query
 *         name: paymentMethod
 *         schema:
 *           type: string
 *         description: Forma de pagamento
 *     responses:
 *       200:
 *         description: Lista paginada de vendas
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
 *                         $ref: '#/components/schemas/Sale'
 */

saleRouter.get('/:id', saleController.getById);
/**
 * @swagger
 * /sale/{id}:
 *   get:
 *     summary: Busca uma venda pelo ID
 *     tags: [Vendas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da venda
 *     responses:
 *       200:
 *         description: Venda encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       404:
 *         description: Venda não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */


saleRouter.patch('/received', saleController.markAsReceived);
/**
 * @swagger
 * /sale/received:
 *   patch:
 *     summary: Marca uma ou mais vendas como recebidas
 *     tags: [Vendas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - salesId
 *             properties:
 *               salesId:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Vendas atualizadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vendas atualizadas com sucesso
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

export default saleRouter;