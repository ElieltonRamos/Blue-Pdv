@echo off
:: Verifica se está rodando como admin
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Solicitando permissão de administrador...
    powershell -Command "Start-Process '%~f0' -Verb runAs"
    exit /b
)

setlocal

set SERVICE_NAME=BluePDVServer
set EXE_PATH=%~dp0blue-pdv-server.exe
set NSSM_PATH=%~dp0nssm.exe

echo Instalando serviço %SERVICE_NAME% com NSSM...
"%NSSM_PATH%" install %SERVICE_NAME% "%EXE_PATH%"

echo Configurando reinício automático...
"%NSSM_PATH%" set %SERVICE_NAME% Start SERVICE_AUTO_START
"%NSSM_PATH%" set %SERVICE_NAME% AppRestartDelay 5000

echo Iniciando o serviço...
net start %SERVICE_NAME%

endlocal
