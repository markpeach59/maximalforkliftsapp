# Maximal Forklifts React Application

This is the frontend React application for Maximal Forklifts.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

## Configuration

The application can connect to either a local or remote API:

- **Local API**: By default, the application connects to a local API at `http://localhost:3900/api`.
- **Production API**: To use a production API, update the `apiURL` in `src/config.json` under the `production` section.

## Environment Configuration

The application uses environment-based configuration to determine which API URL to use:

- **Development**: Uses the `development.apiURL` from `src/config.json`
- **Production**: Uses the `production.apiURL` from `src/config.json`

To build for production:
```
npm run build
```

## React 18 and MUI v5

This application has been updated to use React 18 and MUI v5. Key changes include:

1. Converted class components to functional components using React hooks
2. Updated Material-UI v4 to MUI v5
3. Updated React Router v5 to React Router v6
4. Modernized the styling approach using MUI v5's styling system

## Authentication

The application uses JWT for authentication. Users can log in using their email and password.

## Protected Routes

The application includes protected routes that require authentication:

- **ProtectedRoute**: Requires a logged-in user
- **ProtectedAdminRoute**: Requires a logged-in user with admin privileges
