import { Router } from 'express';
import reportSaleController from '../controllers/reportsSalesController';

const reportSaleRouter = Router();

reportSaleRouter.get('/sales', reportSaleController.generateReportByDate);
/**
 * @swagger
 * /report/sales:
 *   get:
 *     summary: Gera um relatório de vendas por data
 *     tags: [Relatorios]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         example: '2025-08-01'
 *         description: Data de início do relatório (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         example: '2025-08-04'
 *         description: Data de fim do relatório (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Relatório de vendas gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SalesReportSummary'
 *       400:
 *         description: Parâmetros de data ausentes ou inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */


export default reportSaleRouter;