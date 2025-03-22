# Maximal Forklifts React App

This is the frontend application for Maximal Forklifts.

## Recent Updates

### React 18 Migration

The application has been updated to use React 18 and functional components with hooks:

- Updated dependencies in package.json to React 18
- Converted class components to functional components with hooks
- Updated Material-UI imports to use the latest version (@mui/material)

### Component Updates

- `ForkliftDetail`: Converted from class component to functional component using React hooks
  - The original class component is preserved as `forkliftdetail.jsx`
  - The new functional component is available as `forkliftdetail-functional.jsx`

## Running the Application

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or remote)

### Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Configure the backend API URL:
   - The backend API URL is configured in `src/config.json`
   - Make sure it points to your running backend API

### Development

Start the development server:
```
npm start
```

The application will be available at http://localhost:3000

### Production Build

Create a production build:
```
npm run build
```

## Backend Connection

This application connects to the Maximal Forklifts API Node backend. Make sure the backend is running and properly configured with MongoDB before starting this application.

## Authentication

The application uses JWT for authentication. Login credentials are validated against the backend API.
