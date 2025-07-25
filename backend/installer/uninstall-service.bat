@echo off
set DIR=%~dp0

%DIR%nssm.exe stop blue-pdv-server
%DIR%nssm.exe remove blue-pdv-server confirm
