/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */
import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import * as config from '../src/database/config/database';
import path from 'path';
import 'mysql2';

const migrationsPath = path.join(__dirname, '../src/database/migrations');
const seedersPath = path.join(__dirname, '../src/database/seeders');

const sequelize = new Sequelize(config);
const queryInterface = sequelize.getQueryInterface();

async function dropAllTables() {
  console.log('🔴 Dropando todas as tabelas...');

  await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

  const tables = await queryInterface.showAllTables();

  const tableNames = tables
    .map((t: any) => {
      if (typeof t === 'string') return t;
      if ('tableName' in t) return t.tableName;
      if ('name' in t) return t.name;
      return '';
    })
    .filter((name) => name.length > 0);

  for (const tableName of tableNames) {
    console.log(`🗑 Dropping table ${tableName}`);
    await queryInterface.dropTable(tableName);
  }

  await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
}

async function resetDatabase() {
  try {
    await dropAllTables();

    console.log('🟢 Criando banco (sync)...');
    await sequelize.sync({ force: true });

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
