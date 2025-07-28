import { exec, ExecException } from 'child_process';

exec('npm run db:reset', (error: ExecException | null, stdout: string, stderr: string) => {
  if (error) {
    console.error(`Erro ao executar o comando: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Erro: ${stderr}`);
    return;
  }
  console.log(`Saída: ${stdout}`);
});