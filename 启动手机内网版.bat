@echo off
setlocal
pushd "%~dp0"
if errorlevel 1 goto no_folder
title Jobpilot phone LAN server
echo Starting Jobpilot phone server...
echo Connect the phone and this computer to the same Wi-Fi.
echo.
set "NODE_EXE="
for /f "delims=" %%N in ('where node 2^>nul') do if not defined NODE_EXE set "NODE_EXE=%%N"
if not defined NODE_EXE goto no_node
"%NODE_EXE%" server-lan.mjs
echo.
echo The service stopped or failed. Review the message above.
pause
popd
exit /b 1

:no_node
echo Node.js was not found in PATH. Install Node.js and reopen this file.
pause
popd
exit /b 1

:no_folder
echo Could not open the program folder.
pause
exit /b 1
