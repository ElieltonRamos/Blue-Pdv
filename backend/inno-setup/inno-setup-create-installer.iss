; Script Inno Setup - Instalação do Blue PDV Server
; Atualizado para incluir arquivos, rodar .bat silenciosamente e rodar como administrador

#define MyAppName "Blue PDV Server"
#define MyAppVersion "1.0"
#define MyAppPublisher "BluePDV"
#define MyAppExeName "blue-pdv-server.exe"

[Setup]
AppId={{2E5DE4BA-3F6E-44A6-9E5B-BE4E0ED2D14E}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
DefaultDirName={autopf}\{#MyAppName}
OutputBaseFilename=BluePDVServer-Setup
PrivilegesRequired=admin
SolidCompression=yes
WizardStyle=modern

[Languages]
Name: "brazilianportuguese"; MessagesFile: "compiler:Languages\BrazilianPortuguese.isl"

[Tasks]
Name: "desktopicon"; Description: "Criar atalho na área de trabalho"; GroupDescription: "Ícones adicionais"; Flags: unchecked

[Files]
Source: "H:\Arquivos Elielton\docume\Blue-Pdv\backend\inno-setup\blue-pdv-server.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "H:\Arquivos Elielton\docume\Blue-Pdv\backend\inno-setup\nssm.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "H:\Arquivos Elielton\docume\Blue-Pdv\backend\inno-setup\install-service.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "H:\Arquivos Elielton\docume\Blue-Pdv\backend\inno-setup\uninstall-service.bat"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
; Executa o install-service.bat silenciosamente e espera terminar
Filename: "cmd.exe"; Parameters: "/c install-service.bat"; WorkingDir: "{app}"; Flags: runhidden waituntilterminated runascurrentuser

; Opcional: Executa o servidor após a instalação
; Filename: "{app}\{#MyAppExeName}"; Description: "Executar o {#MyAppName}"; Flags: postinstall nowait skipifsilent
