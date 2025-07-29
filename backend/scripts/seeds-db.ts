/* eslint-disable no-undef */
import { Sequelize } from 'sequelize';
import * as config from '../src/database/config/database';
import fs from 'fs';
import path from 'path';
import 'mysql2';

const sequelize = new Sequelize(config);
const queryInterface = sequelize.getQueryInterface();

const seedersPath = path.join(__dirname, '../src/database/seeders');

async function runSeeds() {
  try {
    const files = fs.readdirSync(seedersPath).filter((f) => f.endsWith('.js'));

    console.log('Arquivos de seed encontrados:', files);

    for (const file of files) {
      const fullPath = path.join(seedersPath, file);
      const seed = require(fullPath).default;

      console.log(`Executando seed: ${file}`);
      await seed.up(queryInterface);
    }

    console.log('Seeds executadas com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao executar seeds:', err);
    process.exit(1);
  }
}

runSeeds();
