#!/bin/bash

if [ "$(uname)" == "Darwin" ] ; then
    if [ ! -d "/Applications/Google Chrome.app" ] ; then
        osascript -e 'tell app "System Events" to display dialog "Advanced Web App - Could not find Google Chrome!"'
        exit 1
    fi
    open -na "/Applications/Google Chrome.app" --args --app=http://localhost/sites/advanced-webapp-demo/index.html
elif [ "$(uname)" == "Linux" ] ; then
    command -v google-chrome >/dev/null 2>&1 || { notify-send "Advanced Web App" "Could not find Google Chrome\!" || echo "Advanced Web App - Could not find Google Chrome!"; exit 1; }
    google-chrome --app=http://localhost/sites/advanced-webapp-demo/index.html
else
    echo "Unknown operating system!"
    exit 1
fi
