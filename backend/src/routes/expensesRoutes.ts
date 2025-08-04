import { Router } from 'express';
import expensesController from '../controllers/expensesController';

const expensesRoutes = Router();

expensesRoutes.get('/', expensesController.getAllExpenses);
/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Lista todas as despesas com suporte a paginação e filtros
 *     tags: [Despesas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Quantidade de itens por página
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: datePayment
 *         description: Campo para ordenação
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Ordem de ordenação
 *       - in: query
 *         name: supplier
 *         schema:
 *           type: string
 *         description: Filtrar pelo nome do fornecedor
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Pago, Pendente, Atrasado]
 *         description: Filtrar pelo status da despesa
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data inicial para filtro
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Data final para filtro
 *     responses:
 *       200:
 *         description: Lista paginada de despesas
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
 *                         $ref: '#/components/schemas/Expense'
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

expensesRoutes.post('/', expensesController.createExpense);
/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Cria uma nova despesa
 *     tags: [Despesas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - supplier
 *               - value
 *               - datePayment
 *             properties:
 *               supplier:
 *                 type: string
 *                 example: Fornecedor XYZ
 *               description:
 *                 type: string
 *                 example: Compra de embalagens
 *               value:
 *                 type: number
 *                 example: 150.00
 *               datePayment:
 *                 type: string
 *                 format: date
 *                 example: 2025-08-04
 *     responses:
 *       201:
 *         description: Despesa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

expensesRoutes.patch('/update/:id', expensesController.updateExpense);
/**
 * @swagger
 * /expenses/update/{id}:
 *   patch:
 *     summary: Atualiza uma despesa existente
 *     tags: [Despesas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da despesa a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplier:
 *                 type: string
 *                 example: Fornecedor Exemplo
 *               description:
 *                 type: string
 *                 example: Conta de luz
 *               value:
 *                 type: number
 *                 example: 150.75
 *               datePayment:
 *                 type: string
 *                 format: date
 *                 example: 2025-08-10
 *               status:
 *                 type: string
 *                 enum: [Pago, Pendente, Atrasado]
 *                 example: Pago
 *     responses:
 *       200:
 *         description: Despesa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expense'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

expensesRoutes.delete('/delete/:id', expensesController.deleteExpense);
/**
 * @swagger
 * /expenses/delete/{id}:
 *   delete:
 *     summary: Deleta uma despesa pelo ID
 *     tags: [Despesas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da despesa a ser deletada
 *     responses:
 *       200:
 *         description: Despesa deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Despesa deletada com sucesso
 *       404:
 *         description: Despesa não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

expensesRoutes.get('/reports', expensesController.getExpensesReport);
/**
 * @swagger
 * /expenses/reports:
 *   get:
 *     summary: Gera um relatório de despesas por data
 *     tags: [Relatorios]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         example: 2025-01-01
 *         description: Data de início do relatório
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         example: 2025-12-31
 *         description: Data final do relatório
 *     responses:
 *       200:
 *         description: Relatório gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalValue:
 *                   type: number
 *                   example: 3000.50
 *                 totalByStatus:
 *                   type: object
 *                   properties:
 *                     pago:
 *                       type: number
 *                       example: 1500.00
 *                     pendente:
 *                       type: number
 *                       example: 1000.00
 *                     atrasado:
 *                       type: number
 *                       example: 500.00
 *                 totalBySupplier:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       supplier:
 *                         type: string
 *                         example: Fornecedor A
 *                       total:
 *                         type: number
 *                         example: 1200.00
 *       400:
 *         description: Data de início e fim são obrigatórias
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */


export default expensesRoutes;