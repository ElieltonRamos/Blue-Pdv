/* eslint-disable @typescript-eslint/naming-convention */
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend Blue PDV',
      version: '1.0.0',
      description: 'Documentação da API',
    },
    servers: [
      {
        url: 'http://localhost:3001/api',
      },
    ],
    components: {
      schemas: {
        PaginatedResponse: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {}, // será sobrescrito via allOf
            },
            total: {
              type: 'number',
              example: 100,
            },
            page: {
              type: 'number',
              example: 1,
            },
            limit: {
              type: 'number',
              example: 10,
            },
            totalPages: {
              type: 'number',
              example: 10,
            },
          },
        },
        Sale: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            clientId: { type: 'number' },
            userOperator: { type: 'number' },
            paymentMethod: { type: 'string', enum: ['Dinheiro', 'Cartao', 'Notinha'], },
            date: { type: 'string', format: 'date-time' },
            totalProductsWithoutDiscount: { type: 'number' },
            total: { type: 'number' },
            isPaid: { type: 'boolean' },
            discount: { type: 'number' },
            profitSale: { type: 'number' },
            client: {
              type: 'object',
              properties: {
                name: { type: 'string' },
              },
            },
            operator: {
              type: 'object',
              properties: {
                username: { type: 'string' },
              },
            },
          },
        },
        SaleProductInput: {
          type: 'object',
          properties: {
            productId: { type: 'number', example: 1 },
            quantity: { type: 'number', example: 1 },
          },
        },
        // Usuário (resposta)
        User: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            username: { type: 'string', example: 'Elielton' },
            userType: { type: 'string', example: 'Administrador' },
          },
        },

        // Resposta de erro padrão
        ErrorResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Algo deu errado' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  console.log('Swagger is running on http://localhost:3001/docs');
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

// export interface PaginatedResponse<T> {
//   data: T[];
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
// }
