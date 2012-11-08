#!/bin/bash

command -v google-chrome >/dev/null 2>&1 || { notify-send "Advanced Web App" "Couldn't find Google Chrome\!"; exit 1; }

google-chrome --app=http://localhost/sites/advanced-webapp-demo/index.html