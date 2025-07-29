/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */
import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import * as config from '../src/database/config/database';
import path from 'path';
import 'mysql2';

// Caminhos compilados
const migrationsPath = path.join(process.cwd(), '../database/migrations');
const seedersPath = path.join(process.cwd(), '../database/seeders');

const sequelize = new Sequelize(config);

async function resetDatabase() {
  try {
    console.log('🔴 Dropando banco...');
    await sequelize.drop();

    console.log('🟢 Criando banco...');
    await sequelize.sync({ force: true }); // Cria tabelas base

    console.log('📦 Rodando migrations...');
    const migrationUmzug = new Umzug({
      migrations: {
        glob: path.join(migrationsPath, '*.js'),
        resolve: ({ name, path: filePath, context }) => {
          const migration = require(filePath!);
          const fn = migration.default ?? migration;
          return {
            name,
            up: async () => fn.up(context),
            down: async () => fn.down?.(context),
          };
        },
      },
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
      logger: console,
    });

    await migrationUmzug.up();

    console.log('🌱 Rodando seeds...');
    const seedUmzug = new Umzug({
      migrations: {
        glob: path.join(seedersPath, '*.js'),
        resolve: ({ name, path: filePath, context }) => {
          const seed = require(filePath!);
          const fn = seed.default ?? seed;
          return {
            name,
            up: async () => fn.up(context),
            down: async () => fn.down?.(context),
          };
        },
      },
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize, modelName: 'seeder_meta' }),
      logger: console,
    });

    await seedUmzug.up();

    console.log('✅ Banco resetado com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro ao resetar banco:', err);
    process.exit(1);
  }
}

resetDatabase();
