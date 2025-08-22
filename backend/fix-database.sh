#!/bin/bash

# Database Connection Fix Script for Benso Backend
# Run this script from the backend directory

echo "🔄 Fixing database connection issue..."

# Check if we're in the right directory
if [ ! -f "artisan" ]; then
    echo "❌ Please run this script from the backend directory"
    exit 1
fi

echo "📋 Available options:"
echo "1) SQLite (Quick setup - no MySQL required)"
echo "2) Local MySQL (Requires MySQL server)"
echo "3) Docker MySQL (Requires Docker)"
read -p "Choose option (1-3): " choice

case $choice in
    1)
        echo "🔧 Setting up SQLite..."
        
        # Create .env file with SQLite config
        cat > .env << EOF
APP_NAME="Benso Backend"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite

CACHE_DRIVER=file
SESSION_DRIVER=file
SESSION_LIFETIME=120

QUEUE_CONNECTION=sync
EOF
        
        # Create database file
        touch database/database.sqlite
        
        # Generate app key
        php artisan key:generate
        
        # Run migrations
        php artisan migrate --force
        
        echo "✅ SQLite setup complete!"
        ;;
        
    2)
        echo "🔧 Setting up Local MySQL..."
        
        read -p "MySQL host (default: 127.0.0.1): " db_host
        read -p "MySQL port (default: 3306): " db_port
        read -p "Database name (default: benso_backend): " db_name
        read -p "Username (default: root): " db_user
        read -s -p "Password: " db_pass
        
        db_host=${db_host:-127.0.0.1}
        db_port=${db_port:-3306}
        db_name=${db_name:-benso_backend}
        db_user=${db_user:-root}
        
        # Create .env file with MySQL config
        cat > .env << EOF
APP_NAME="Benso Backend"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=$db_host
DB_PORT=$db_port
DB_DATABASE=$db_name
DB_USERNAME=$db_user
DB_PASSWORD=$db_pass

CACHE_DRIVER=file
SESSION_DRIVER=file
SESSION_LIFETIME=120

QUEUE_CONNECTION=sync
EOF
        
        # Create database
        mysql -h$db_host -P$db_port -u$db_user -p$db_pass -e "CREATE DATABASE IF NOT EXISTS $db_name;"
        
        # Generate app key
        php artisan key:generate
        
        # Run migrations
        php artisan migrate --force
        
        echo "✅ MySQL setup complete!"
        ;;
        
    3)
        echo "🔧 Setting up Docker MySQL..."
        
        # Create .env file with Docker MySQL config
        cat > .env << EOF
APP_NAME="Benso Backend"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=benso_backend
DB_USERNAME=sail
DB_PASSWORD=password

CACHE_DRIVER=file
SESSION_DRIVER=file
SESSION_LIFETIME=120

QUEUE_CONNECTION=sync
EOF
        
        # Start Docker containers
        if command -v docker &> /dev/null; then
            docker run --name mysql -e MYSQL_ROOT_PASSWORD= -e MYSQL_DATABASE=benso_backend -e MYSQL_USER=sail -e MYSQL_PASSWORD=password -p 3306:3306 -d mysql:8.0
            sleep 10
            
            # Generate app key
            php artisan key:generate
            
            # Run migrations
            php artisan migrate --force
            
            echo "✅ Docker MySQL setup complete!"
        else
            echo "❌ Docker is not installed"
            exit 1
        fi
        ;;
        
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac

echo ""
echo "🎉 Database connection fixed!"
echo "You can now run: php artisan migrate --force"
