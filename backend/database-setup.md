# Database Setup Guide for Benso Backend

## Current Issue
Your Laravel application is failing to connect to MySQL database with error:
```
SQLSTATE[HY000] [2002] php_network_getaddresses: getaddrinfo for bensooybensooy.mysql.db failed
```

## Quick Fix Options

### Option 1: Use SQLite (Fastest Setup)
1. **Update your .env file:**
   ```
   DB_CONNECTION=sqlite
   DB_DATABASE=database/database.sqlite
   ```

2. **Create the SQLite database file:**
   ```bash
   cd backend
   touch database/database.sqlite
   ```

3. **Run migrations:**
   ```bash
   php artisan migrate --force
   ```

### Option 2: Use Local MySQL
1. **Ensure MySQL is running:**
   - Windows: Check MySQL service in Services
   - XAMPP: Start MySQL from XAMPP Control Panel
   - Docker: `docker run --name mysql -e MYSQL_ROOT_PASSWORD= -p 3306:3306 -d mysql:8.0`

2. **Update your .env file:**
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=benso_backend
   DB_USERNAME=root
   DB_PASSWORD=
   ```

3. **Create the database:**
   ```bash
   mysql -u root -p -e "CREATE DATABASE benso_backend;"
   ```

4. **Run migrations:**
   ```bash
   php artisan migrate --force
   ```

### Option 3: Use Docker with Laravel Sail
1. **Install Laravel Sail:**
   ```bash
   composer require laravel/sail --dev
   php artisan sail:install
   ```

2. **Start Sail:**
   ```bash
   ./vendor/bin/sail up -d
   ./vendor/bin/sail artisan migrate --force
   ```

## Verification Steps

After applying any fix, verify the connection:

```bash
# Test database connection
php artisan tinker
>>> DB::connection()->getPdo()
```

## Troubleshooting

### If using MySQL:
- Check if MySQL is running: `netstat -an | findstr :3306`
- Verify credentials: `mysql -u root -p`
- Check firewall settings

### If using SQLite:
- Ensure the database file exists and is writable
- Check file permissions

### Common fixes:
- Clear config cache: `php artisan config:clear`
- Regenerate app key: `php artisan key:generate`
- Check .env file syntax
