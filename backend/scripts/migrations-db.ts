#!/usr/bin/env node
/* eslint-disable no-undef */
/* eslint-disable max-lines-per-function */

// CommonJS compatível com tsconfig restritivo
import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import * as config from '../src/database/config/database';
import path from 'path';
import fs from 'fs';
import 'mysql2';

// ✅ __dirname funciona corretamente se estiver usando module: commonjs
// Caminho para as migrations
const migrationsPath = path.join(__dirname, '../src/database/migrations');


const sequelize = new Sequelize(config);

async function migrateDatabase() {
  try {
    console.log('📦 Rodando migrations pendentes...');

    const migrationFiles = fs
      .readdirSync(migrationsPath)
      .filter((file) => file.endsWith('.js'));

    const migrations = [];

    for (const file of migrationFiles) {
      const filePath = path.join(migrationsPath, file);
      const migration = require(filePath);
      const fn = migration.default ?? migration;
      migrations.push({
        name: file,
        up: async () => fn.up(sequelize.getQueryInterface(), Sequelize),
        down: fn.down
          ? async () => fn.down(sequelize.getQueryInterface(), Sequelize)
          : async () => {},
      });
    }

    const umzug = new Umzug({
      migrations,
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
      logger: console,
    });

    const result = await umzug.up();
    console.log(`🌱 ${result.length} migrações aplicadas com sucesso!`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro ao executar migrações:', err);
    process.exit(1);
  }
}

migrateDatabase();
