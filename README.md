# Laravel Setup with Key Generation, Migration, and Admin Seeder

## Installation

## 1. Clone the repository

```
git clone <your-repo-url>
cd <your-project-folder>
```

## 2. Install PHP dependencies

```
composer install
```

## 3. Copy .env.example to .env

```
cp .env.example .env
```

## 4. Generate application key

```
php artisan key:generate
```

This sets your APP_KEY in .env.

## 5. Configure .env file

Open .env and update database credentials:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

## 6. setup admin email to received notifications

```
MAIL_ADMIN_ADDRESS=
```

Set React frontend URL in .env:

```
FRONTEND_URL=http://localhost:3000
```

## 7. Run database migrations

```
php artisan migrate
```

## 8. Run the seeder

```
php artisan db:Seed
```

## 9. Start Laravel development server

```
php artisan serve
```

Laravel will start on http://127.0.0.1:8000 by default.

`---------------------------------------------------------------------------------------------------------------`

## React Frontend Setup Instructions

## 1. Clone your frontend repo

```
git clone <your-frontend-repo-url>
cd <your-frontend-folder>
```

## 2. Install dependencies

```
npm install
```

## 3. Create an environment variable file

Create a .env or .env.local file in the root of your React project with:

```
VITE_API_URL=http://localhost:8000/
```

## 4. Run the development server

```
npm run dev
```

[MIT](https://choosealicense.com/licenses/mit/)
