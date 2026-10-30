@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo 当前电脑没有 Node.js，无法启动本地服务。
  pause
  exit /b 1
)
start "职途AI本地服务" /min node server.mjs
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:8080"
