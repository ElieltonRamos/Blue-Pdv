#!/usr/bin/env node
/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function restoreBackup() {
  try {
    const arquivo = path.resolve(process.cwd(), 'backup.sql');
    const sql = fs.readFileSync(arquivo, 'utf8');

    if (!sql.trim()) {
      throw new Error('O arquivo de backup está vazio.');
    }

    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'db_pdv',
      multipleStatements: true,
    });

    console.log('🔴 Limpando banco de dados atual...');
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');

    const [tables] = await connection.query('SHOW TABLES');
    for (const row of tables) {
      const tableName = Object.values(row)[0];
      await connection.query(`DROP TABLE IF EXISTS \`${tableName}\``);
    }

    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('📦 Restaurando backup...');
    await connection.query(sql);
    await connection.end();

    console.log(`✅ Backup restaurado com sucesso a partir de: ${arquivo}`);
  } catch (err) {
    console.error('❌ Erro ao restaurar o backup:', err);
    process.exit(1);
  }
}

restoreBackup();
