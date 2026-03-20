@echo off
title VuePress 一键部署 (极简版)
color 07

echo ==========================================
echo   开始构建并部署到 Cloudflare Pages
echo ==========================================
echo.

:: 1. 切换到脚本所在目录，防止路径错误
cd /d "%~dp0"

:: 2. 执行构建
echo [步骤 1/2] 正在构建网站 (npm run build)...
echo ------------------------------------------
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo [错误] 构建失败！请检查上方报错信息。
    pause
    exit /b 1
)
echo ------------------------------------------
echo [成功] 构建完成！
echo.

:: 3. 执行部署
echo [步骤 2/2] 正在部署到 Cloudflare...
echo ------------------------------------------
wrangler pages deploy docs/.vuepress/dist --project-name vuepress-site --commit-dirty=true
if %errorlevel% neq 0 (
    echo.
    echo [错误] 部署失败！请检查上方报错信息。
    pause
    exit /b 1
)
echo ------------------------------------------
echo [成功] 部署完成！
echo.

echo ==========================================
echo  全部完成！窗口将在 5 秒后自动关闭...
echo ==========================================
timeout /t 5 /nobreak >nul
exit /b 0