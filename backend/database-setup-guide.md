# Database Setup Guide for Benso Backend

## ✅ Issues Fixed
1. **Fixed typo in database configuration**: Changed `'msql'` to `'mysql'` in `config/database.php`
2. **Created local MySQL configuration templates**
3. **Provided setup scripts for Windows**

## 🚀 Next Steps to Complete Setup

### 1. Update Your Environment File
Create or update your `.env` file with these settings:

```bash
# Copy the example file
cp .env.example .env

# Or on Windows:
copy .env.example .env
```

### 2. Update Database Credentials
Edit your `.env` file with your local MySQL credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=benso_backend
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
```

### 3. Run the Setup Script (Windows)
Double-click `setup-local-db.bat` or run from command prompt:
```bash
setup-local-db.bat
```

### 4. Manual Setup (Alternative)
If you prefer manual setup, run these MySQL commands:

```sql
CREATE DATABASE IF NOT EXISTS benso_backend;
```

### 5. Run Laravel Commands
After setting up the database:

```bash
# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate

# Seed the database (optional)
php artisan db:seed
```

### 6. Test the Connection
```bash
php artisan tinker
>>> DB::connection()->getPdo()
```

## 🔧 Troubleshooting

### MySQL Not Found
- **Windows**: Ensure MySQL is in your PATH or use full path to mysql.exe
- **XAMPP/WAMP**: Use their MySQL installation

### Connection Issues
- Check if MySQL service is running: `net start mysql` (Windows) or `sudo systemctl start mysql` (Linux)
- Verify credentials in `.env` file
- Check MySQL port (default is 3306)

### Permission Issues
- Ensure MySQL user has CREATE DATABASE privileges
- Try using root user initially, then create specific user

## 📋 Files Created
- ✅ `backend/config/database.php` - Fixed typo
- ✅ `backend/.env.example` - Template for environment variables
- ✅ `backend/setup-local-db.bat` - Windows setup script
- ✅ `backend/database-setup-guide.md` - This guide

## 🎯 Quick Start Commands
```bash
# 1. Copy environment file
copy .env.example .env

# 2. Edit .env with your MySQL credentials

# 3. Run setup script
setup-local-db.bat

# 4. Generate key and migrate
php artisan key:generate
php artisan migrate
```

Your database connection should now work correctly with local MySQL!
