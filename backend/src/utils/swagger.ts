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
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
