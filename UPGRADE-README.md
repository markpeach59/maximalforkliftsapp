# Maximal Forklifts App Upgrade Guide

This guide provides instructions for upgrading the Maximal Forklifts application to use a remote MongoDB database and ensure compatibility with React 18.

## 1. MongoDB Remote Connection

The application has been configured to connect to a remote MongoDB instance. You can use either MongoDB Atlas or any other MongoDB hosting service.

### Option 1: Using Environment Variables (Recommended)

Set the `MONGODB_URI` environment variable with your MongoDB connection string:

```bash
# For MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster-url/database-name?retryWrites=true&w=majority

# For other MongoDB hosts
MONGODB_URI=mongodb://username:password@host:port/database-name
```

Then start the application:

```bash
# On Windows
set MONGODB_URI=mongodb+srv://username:password@cluster-url/database-name?retryWrites=true&w=majority
npm start

# On macOS/Linux
MONGODB_URI=mongodb+srv://username:password@cluster-url/database-name?retryWrites=true&w=majority npm start
```

### Option 2: Update Configuration Files

Alternatively, you can update the `production.json` file in the `config` directory:

```json
{
  "db": "mongodb+srv://username:password@cluster-url/database-name?retryWrites=true&w=majority",
  "port": "3900",
  "jwtPrivateKey": ""
}
```

Then start the application in production mode:

```bash
NODE_ENV=production npm start
```

## 2. React 18 Compatibility

The application has been updated to be compatible with React 18. The main changes include:

1. All class components have been converted to functional components using hooks.
2. The `forkliftdetail` component has been rewritten to use React hooks for state management.

### Key Changes:

- State management now uses the `useState` hook instead of class state.
- Lifecycle methods have been replaced with the `useEffect` hook.
- Navigation now uses the `useNavigate` hook from React Router v6.

### Running the Updated Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the backend server:
   ```bash
   cd maximal-forklifts-api-node
   npm start
   ```

3. Start the React application:
   ```bash
   cd maximalforkliftsapp
   npm start
   ```

## 3. Troubleshooting

If you encounter any issues:

1. Check that MongoDB is running and accessible.
2. Verify that the MongoDB connection string is correct.
3. Ensure all dependencies are installed with `npm install`.
4. Check the console for any error messages.

For MongoDB connection issues, refer to the `mongodb-config.js` file in the `config` directory for more detailed instructions.
