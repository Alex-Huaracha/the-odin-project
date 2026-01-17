# 📁 File Uploader

A minimalist cloud storage application built with Node.js, Express, and Prisma. Upload, organize, and share your files securely.

## Features

- 🔐 **Authentication** - Secure login and registration with Passport.js
- 📂 **Folder Management** - Create, rename, and organize folders
- 📤 **File Upload** - Upload files to cloud storage (Cloudinary)
- 🔗 **Share Links** - Generate time-limited share links for folders
- 🎨 **Dark Theme** - Minimalist dark UI design

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Passport.js (Local Strategy)
- **Storage**: Cloudinary
- **Frontend**: EJS templates, Pure CSS

## Setup

1. **Clone and install dependencies**

```bash
git clone https://github.com/Alex-Huaracha/file-uploader.git
cd file-uploader
npm install
```

2. **Configure environment variables**

```bash
# .env
DATABASE_URL='postgresql://user:password@localhost:5432/file_uploader'
SESSION_SECRET='your-secret-key'

CLOUDINARY_CLOUD_NAME='your-cloud-name'
CLOUDINARY_API_KEY='your-api-key'
CLOUDINARY_API_SECRET='your-api-secret'
```

3. **Setup database**

```bash
npx prisma migrate dev --name init
npx prisma generate
```

4. **Run the application**

```bash
npm start
```

Visit `http://localhost:3000`

## Project Structure

```
├── config/          # Passport & Cloudinary configuration
├── controllers/     # Route controllers
├── db/              # Prisma client
├── middleware/      # Authentication & upload middleware
├── prisma/          # Database schema
├── public/css/      # Stylesheets
├── routes/          # Express routes
├── views/           # EJS templates
└── app.js           # Application entry point
```

## Database Schema

- **User** - User accounts
- **Session** - Session storage
- **Folder** - Hierarchical folder structure
- **File** - Uploaded files with metadata
- **ShareLink** - Time-limited share links

## License

MIT
