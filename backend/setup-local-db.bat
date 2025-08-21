@echo off
echo Setting up local MySQL database for Benso Backend...
echo.

REM Check if MySQL is available
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo MySQL is not installed or not in PATH.
    echo Please install MySQL and add it to your PATH.
    pause
    exit /b 1
)

REM Create database
echo Creating database 'benso_backend'...
mysql -u root -e "CREATE DATABASE IF NOT EXISTS benso_backend;"
if %errorlevel% neq 0 (
    echo Failed to create database. Please check MySQL credentials.
    pause
    exit /b 1
)

echo Database 'benso_backend' created successfully!
echo.

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo Creating .env file...
    copy .env.example .env
    echo .env file created. Please update your database credentials.
) else (
    echo .env file already exists.
)

echo.
echo Setup complete! Please follow these steps:
echo 1. Update your .env file with correct MySQL credentials
echo 2. Run: php artisan migrate
echo 3. Run: php artisan db:seed
echo.
pause
