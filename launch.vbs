Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
WshShell.Run "powershell -WindowStyle Hidden -Command ""Start-Process -FilePath cmd.exe -ArgumentList '/c cd /d " & WshShell.CurrentDirectory & " && npx electron-forge start' -WindowStyle Hidden""", 0, False
