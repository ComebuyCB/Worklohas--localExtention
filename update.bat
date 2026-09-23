@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo 正在更新 WL 本機擴充功能...
echo.
git pull --ff-only
if errorlevel 1 (
  echo.
  echo [失敗] 更新失敗，請把此畫面截圖給維護者
  pause
  exit /b 1
)

echo.
echo [完成] 更新完成！請到 chrome://extensions 對「WL 本機擴充功能」按重新載入
pause
