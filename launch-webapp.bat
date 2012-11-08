@echo off
for /f "tokens=3 delims=\" %%i in ("%USERPROFILE%") do (set user=%%i) 2>&1
set CHROME_LOCAL="C:\Documents and Settings\%user%\Local Settings\Application Data\Google\Chrome\Application\chrome.exe"

IF EXIST %CHROME_LOCAL% (
    %CHROME_LOCAL% --app=http://localhost/medical-demo/index.html
) ELSE (
    echo Could not find Google Chrome.
    pause
)