@echo off
set DIR=%~dp0

rem Instala o serviço chamado "blue-pdv-server"
%DIR%nssm.exe install blue-pdv-server "%DIR%blue-pdv-server.exe"

rem Define diretório de trabalho
%DIR%nssm.exe set blue-pdv-server AppDirectory "%DIR%"

rem Inicia o serviço
%DIR%nssm.exe start blue-pdv-server
