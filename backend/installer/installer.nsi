!define APPNAME "Blue PDV Server"
!define INSTALLDIR "$PROGRAMFILES\BluePDVServer"

Outfile "BluePDVServer-Setup.exe"
InstallDir "${INSTALLDIR}"
ShowInstDetails show
ShowUninstDetails show

Section "Instalar"
    SetOutPath "$INSTDIR"
    File "blue-pdv-server.exe"
    File "nssm.exe"
    File "install-service.bat"
    File "uninstall-service.bat"

    ExecWait '"$INSTDIR\install-service.bat"'
SectionEnd

Section "Desinstalar"
    ExecWait '"$INSTDIR\uninstall-service.bat"'
    Delete "$INSTDIR\blue-pdv-server.exe"
    Delete "$INSTDIR\nssm.exe"
    Delete "$INSTDIR\install-service.bat"
    Delete "$INSTDIR\uninstall-service.bat"
    RMDir "$INSTDIR"
SectionEnd
