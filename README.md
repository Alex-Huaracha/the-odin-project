# Inventory Management Application

A full-stack inventory management system built with Node.js, Express, PostgreSQL, and EJS templating. This project is part of [The Odin Project](https://www.theodinproject.com/) curriculum.

## Features

- **Category Management**: Create, read, update, and delete product categories
- **Item Management**: Full CRUD operations for inventory items
- **Relational Data**: Items are linked to categories with proper foreign key constraints
- **Responsive Design**: Clean and modern UI that works on all devices
- **Data Validation**: Input validation on both client and server side
- **Safe Deletion**: Categories with items cannot be deleted until items are removed or reassigned

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Template Engine**: EJS
- **Environment Variables**: dotenv

## Project Structure

```
inventory-app/
├── controllers/          # Route controllers
│   ├── categoryController.js
│   └── itemController.js
├── db/                   # Database configuration
│   └── pool.js
├── models/               # Database models
│   ├── categoryModel.js
│   └── itemModel.js
├── public/               # Static assets
│   └── stylesheets/
│       └── style.css
├── routes/               # Route definitions
│   └── index.js
├── views/                # EJS templates
│   ├── categories/
│   ├── items/
│   └── index.ejs
├── app.js               # Application entry point
└── package.json
```

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Alex-Huaracha/inventory-app.git
   cd inventory-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=your_username
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=inventory_db
   PORT=3000
   ```

4. **Create the database**

   ```sql
   CREATE DATABASE inventory_db;
   ```

5. **Create tables**

   ```bash
   node db/init_db.js
   ```

6. **Start the application**

   ```bash
   npm run dev
   ```

7. **Visit the application**

   Open your browser and navigate to `http://localhost:3000`

## Usage

### Managing Categories

- View all categories from the home page
- Create new categories with name and description
- Edit existing categories
- Delete categories (only if they contain no items)

### Managing Items

- Browse all items in the inventory
- Add new items with name, description, price, stock, and category
- Update item information
- Delete items from inventory

## License

This project is open source and available under the MIT License.

## Acknowledgments

- [The Odin Project](https://www.theodinproject.com/) for the excellent curriculum
- The Node.js and Express.js communities
