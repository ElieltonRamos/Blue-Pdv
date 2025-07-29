/* eslint-disable no-undef */
import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import * as config from '../database/config/database';
import path from 'path';
import 'mysql2';

// Caminhos compilados
const migrationsPath = path.join(process.cwd(), '../database/migrations');

const sequelize = new Sequelize(config);

async function migrateDatabase() {
  try {
    console.log('📦 Rodando migrations pendentes...');

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

    const migrations = await migrationUmzug.up();
    console.log(`🌱 ${migrations.length} migrações aplicadas com sucesso!`);

    process.exit(0);
  } catch (err) {
    console.error('❌ Erro ao executar migrações:', err);
    process.exit(1);
  }
}

migrateDatabase();
