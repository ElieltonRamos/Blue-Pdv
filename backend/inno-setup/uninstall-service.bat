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
set NSSM_PATH=%~dp0nssm.exe

echo Tentando parar o serviço %SERVICE_NAME%...
net stop %SERVICE_NAME%

echo Aguardando o serviço parar...
:checkservice
sc query %SERVICE_NAME% | findstr /I "STOPPED"
if errorlevel 1 (
    timeout /t 2 /nobreak >nul
    goto checkservice
)

echo Serviço parado.
echo Removendo o serviço...
"%NSSM_PATH%" remove %SERVICE_NAME% confirm

echo Serviço removido.

endlocal
