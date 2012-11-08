@echo off
for /f "tokens=3 delims=\" %%i in ("%USERPROFILE%") do (set user=%%i) 2>&1
set CHROME_XP="C:\Documents and Settings\%user%\Local Settings\Application Data\Google\Chrome\Application\chrome.exe"
set CHROME_7="C:\Users\%user%\AppData\Local\Google\Chrome\Application\chrome.exe"

IF EXIST %CHROME_XP% (
    %CHROME_XP% --app=http://localhost/advanced-webapp-demo/index.html
) ELSE (
    IF EXIST %CHROME_7% (
        %CHROME_7% --app=http://localhost/advanced-webapp-demo/index.html
    ) ELSE (
        echo Could not find Google Chrome.
        pause
    )
)