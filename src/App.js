import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import ProtectedRoute from "./components/protectedroute";
import ProtectedAdminRoute from "./components/protectedadminroute";

import { ThemeProvider } from "@mui/material/styles";
import customtheme from "./style/theme";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import Forklifts from "./components/forklifts";
import ForkliftDetail from "./components/forkliftdetail";
import NotFound from "./components/notFound";

import RegistrationForm from "./components/registrationform";
import DealerRegistrationForm from "./components/dealerregistrationform";

import LoginForm from "./components/loginform";
import Logout from "./components/logout";
import auth from "./services/authService";

import Quotes from "./components/quotes";

import QuoteDetail from "./components/quotedetail";

import Orders from "./components/orders";
import OrderDetail from "./components/orderdetail";

import AllQuotes from "./components/allquotes";
import AllOrders from "./components/allorders";
import DealerHeader from "./components/dealerheader";


import ListAllUsers from "./components/listallusers";
import ListAllDealers from "./components/listalldealers";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Maxim (GB) {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function App() {
  console.log("App component rendering");
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      console.log("App useEffect running");
      const currentUser = auth.getCurrentUser();
      console.log("Current user:", currentUser);
      setUser(currentUser);
      /* if logged in get dealer details */
    } catch (error) {
      console.error("Error in App useEffect:", error);
    }
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={customtheme}>
        <Container component="main">
          <CssBaseline />
          {user && (
            <AppBar position="static">
              <Toolbar>
                {user ? "Hello " + user.fullname : null}
                <Link to="/forklifts" style={{ color: "#fff" }}>
                  <Button color="inherit">Forklifts</Button>
                </Link>

                <Link to="/quotes" style={{ color: "#fff" }}>
                  <Button color="inherit">Quotes</Button>
                </Link>

                <Link to="/orders" style={{ color: "#fff" }}>
                  <Button color="inherit">Orders</Button>
                </Link>

                
                {user && (user.isAdmin || user.isMaximGB) && (
                  <Link to="/allquotes" style={{ color: "#fff" }}>
                    <Button color="inherit">All Quotes</Button>
                  </Link>
                )}

                {user && (user.isAdmin || user.isMaximGB) && (
                  <Link to="/allorders" style={{ color: "#fff" }}>
                    <Button color="inherit">All Orders</Button>
                  </Link>
                )}

                {user && user.isAdmin && (
                  <Link to="/listallusers" style={{ color: "#fff" }}>
                    <Button color="inherit">All Users</Button>
                  </Link>
                )}

                {user && user.isAdmin && (
                  <Link to="/register" style={{ color: "#fff" }}>
                    <Button color="inherit">Register User</Button>
                  </Link>
                )}

                {user && user.isAdmin && (
                  <Link to="/listalldealers" style={{ color: "#fff" }}>
                    <Button color="inherit">All Dealers</Button>
                  </Link>
                )}

                {user && user.isAdmin && (
                  <Link to="/registerdealer" style={{ color: "#fff" }}>
                    <Button color="inherit">Register Dealer</Button>
                  </Link>
                )}

                {user && (
                  <Link to="/logout" style={{ color: "#fff" }}>
                    <Button color="inherit">Logout</Button>
                  </Link>
                )}
                {!user && (
                  <Link to="/login" style={{ color: "#fff" }}>
                    <Button color="inherit">Login</Button>
                  </Link>
                )}
              </Toolbar>
            </AppBar>
          )}
          <div>
          <DealerHeader />
          </div>
          
          
          <div>
            {!user && (
              <>
                <h1>Welcome to Maximal Forklifts</h1>
                <p>Please log in to access the application.</p>
              </>
            )}
            <Routes>
              <Route path="/register" element={<ProtectedRoute><RegistrationForm /></ProtectedRoute>} />
              <Route path="/registerdealer" element={<ProtectedAdminRoute><DealerRegistrationForm /></ProtectedAdminRoute>} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/forkliftdetail/:modelName" element={<ProtectedRoute><ForkliftDetail /></ProtectedRoute>} />
              <Route path="/forklifts" element={<ProtectedRoute><Forklifts /></ProtectedRoute>} />
              <Route path="/quotes/:_id" element={<ProtectedRoute><QuoteDetail /></ProtectedRoute>} />
              <Route path="/quotes" element={<ProtectedRoute><Quotes /></ProtectedRoute>} />
              <Route path="/orders/:_id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="/listallusers" element={<ProtectedRoute><ListAllUsers /></ProtectedRoute>} />
              <Route path="/listalldealers" element={<ProtectedRoute><ListAllDealers /></ProtectedRoute>} />
              <Route path="/allquotes" element={<ProtectedRoute><AllQuotes /></ProtectedRoute>} />
              <Route path="/allorders" element={<ProtectedRoute><AllOrders /></ProtectedRoute>} />
              <Route path="/not-found" element={<NotFound />} />
              <Route path="/" element={user ? <Navigate to="/forklifts" /> : <Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/not-found" />} />
            </Routes>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
        </ThemeProvider>
      </React.Fragment>
    );
}

export default App;
