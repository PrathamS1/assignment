# EduConnect - School Management Mini Project Assignment

> **Note:** This project is intended to be tested locally. The deployment is frontend-only and does not connect to a cloud database. For full functionality, set up MySQL locally as described below.

A modern, responsive web application to add, discover, and manage schools. Built with Next.js 15, React, Tailwind CSS, react-hook-form, Zod, Framer Motion, and MySQL.

## Features

- Add new schools with image upload and validation
- Discover and search schools with sorting by name/city
- Responsive, animated UI with custom color variables
- Toast notifications for all actions
- Skeleton loading and error handling
- Google Fonts and modern icon sets

## Tech Stack

- **Frontend:** Next.js 15 (App Router), React, Tailwind CSS, Framer Motion, react-hook-form, Zod, react-hot-toast
- **Icons:** Lucide React, React Icons
- **Backend:** Next.js API routes, MySQL

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MySQL server

### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd assignment
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure MySQL:**
   - Create a database and update your connection details in the backend/API files.
   - Ensure the `schools` table has columns for all fields (name, email, address, city, state, contact, image).
   - Make sure the `image` column is long enough for image URLs (e.g., VARCHAR(255)).

### Running the Application

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Open in browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

### Usage

- **Add School:** Go to `/addSchool` to add a new school with all details and image upload.
- **Show Schools:** Go to `/showSchools` to browse, search, and sort schools.

## Folder Structure

```
assignment/
├── public/           # Static assets (images, SVGs)
├── src/
│   ├── app/
│   │   ├── addSchool/      # Add school form page
│   │   ├── showSchools/    # School listing page
│   │   ├── api/            # API routes for backend
│   ├── ui/
│   │   └── FileUpload.jsx  # Reusable file upload component
├── tailwind.config.js      # Tailwind CSS config
├── package.json            # Project dependencies
├── README.md               # Project documentation
```

## Environment Variables

- Set environment variables for DB connection, create a `.env` file:

  ```env
  DB_HOST=localhost
  DB_USER=youruser
  DB_PASSWORD=yourpassword
  DB_NAME=yourdbname
  DB_PORT=3306 (default)
  ```

## Customization

- **Colors:** Edit color variables in Tailwind config or CSS files.
- **Fonts:** Google Fonts (Montserrat, Poppins) are used by default.
- **Icons:** Easily swap icons using Lucide React or React Icons.

## Troubleshooting

- **Image upload issues:** Ensure the backend and DB accept image URLs/paths and the column length is sufficient.
- **DB errors:** Check your MySQL connection and table schema.
- **Dependencies:** If you see missing package errors, run `npm install` again.

## License

MIT
