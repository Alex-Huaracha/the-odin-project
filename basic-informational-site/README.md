# Basic Informational Site

A simple Node.js web server built with Express that serves static HTML pages.

## About

This project is part of [The Odin Project](https://www.theodinproject.com/) curriculum.

## Features

- Serves static HTML pages
- Custom 404 error page
- Built with Express.js

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Usage

Start the server:

```bash
node server.js
```

The server will run on `http://localhost:8080`

## Routes

- `/` - Home page (index.html)
- `/about` - About page (about.html)
- `/contact-me` - Contact page (contact-me.html)
- Any other route - 404 error page (404.html)
