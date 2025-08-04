import { Router } from 'express';
import productController from '../controllers/productController';

const productRoutes = Router();

productRoutes.get('/', productController.getAllProducts);
/**
 * @swagger
 * /product:
 *   get:
 *     summary: Lista todos os produtos com paginação
 *     tags: [Produtos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Número da página
 *       - in: query
 *         name: pageLimit
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Quantidade de itens por página
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
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
 *                         $ref: '#/components/schemas/Product'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

productRoutes.get('/:id', productController.getProductById);
/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

productRoutes.patch('/update/cost-price-meats', productController.updateCostPriceMeats);
productRoutes.patch('/update/:id', productController.updateProduct);
/**
 * @swagger
 * /product/update/{id}:
 *   patch:
 *     summary: Atualiza um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Dados inválidos ou incompletos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

productRoutes.delete('/delete/:id', productController.deleteProduct);
/**
 * @swagger
 * /product/delete/{id}:
 *   delete:
 *     summary: Remove um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto a ser removido
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Produto removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Null
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

productRoutes.post('/register', productController.register);
/**
 * @swagger
 * /product/register:
 *   post:
 *     summary: Cadastra um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *               - price
 *               - costPrice
 *               - isMeatBovine
 *             properties:
 *               name:
 *                 type: string
 *                 example: Picanha
 *               code:
 *                 type: string
 *                 example: PIC123
 *               price:
 *                 type: number
 *                 example: 99.90
 *               costPrice:
 *                 type: number
 *                 example: 65.50
 *               isMeatBovine:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

productRoutes.get('/code/:code', productController.getProductByCode);
/**
 * @swagger
 * /product/code/{code}:
 *   get:
 *     summary: Busca um produto pelo código
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

productRoutes.get('/name/:name', productController.getProductByName);
/**
 * @swagger
 * /product/name/{name}:
 *   get:
 *     summary: Busca produtos pelo nome
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome (ou parte do nome) do produto
 *     responses:
 *       200:
 *         description: Lista de produtos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Nenhum produto encontrado com esse nome
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

productRoutes.get('/sugestion/code', productController.sugestionCode);
/**
 * @swagger
 * /product/sugestion/code:
 *   get:
 *     summary: Sugere um novo código de produto
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Código sugerido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 123
 *       500:
 *         description: Erro ao gerar código
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */


export default productRoutes;