/* eslint-disable no-undef */
// import * as mysqldump from 'mysqldump';
const mysqldump = require('mysqldump');

async function fazerBackup() {
  await mysqldump.default({
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'db_pdv',
    },
    dumpToFile: './backup.sql',
  });

  console.log('Backup feito com sucesso!');
}

fazerBackup();
