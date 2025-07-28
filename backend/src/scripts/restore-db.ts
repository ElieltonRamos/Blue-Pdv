#!/usr/bin/env node
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
      multipleStatements: true, // importante para restaurar múltiplos comandos!
    });

    await connection.query(sql);
    await connection.end();

    console.log(`✅ Backup restaurado com sucesso a partir de: ${arquivo}`);
  } catch (err) {
    console.error('❌ Erro ao restaurar o backup:', err);
    process.exit(1);
  }
}

restoreBackup();
