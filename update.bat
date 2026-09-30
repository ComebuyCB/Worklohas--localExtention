@echo off
chcp 65001 >nul
cd /d "%~dp0"

rem 檢查是否已安裝 Git
where git >nul 2>nul
if errorlevel 1 goto NO_GIT

rem 檢查此資料夾是否由 git clone 取得（下載 ZIP 解壓縮的沒有 .git，無法更新）
if not exist ".git" goto NO_REPO

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
exit /b 0

:NO_GIT
echo [未安裝 Git] 此電腦尚未安裝 Git，無法自動更新。
echo.
echo 請先到以下網址下載並安裝 Git，安裝時全部使用預設選項即可：
echo   https://git-scm.com/download/win
echo.
echo 安裝完成後，請關閉此視窗，再重新執行 update.bat
pause
exit /b 1

:NO_REPO
echo [無法更新] 此資料夾不是用 git clone 取得的，例如下載 ZIP 解壓縮，無法自動更新。
echo.
echo 請把此畫面截圖給維護者，協助改用 git clone 重新安裝
pause
exit /b 1
