import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Layout/Navbar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import PrivateRoute from "./utils/PrivateRoute";
import AuthContextProvider, { AuthContext } from "./context/AuthContext";
import JobList from "./components/Job/JobList";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route
              path="/login"
              element={
                <UnauthenticatedRoute>
                  <Login />
                </UnauthenticatedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <UnauthenticatedRoute>
                  <Register />
                </UnauthenticatedRoute>
              }
            />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <JobList />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </Router>
    </AuthContextProvider>
  );
}

const UnauthenticatedRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  return !user ? children : <Navigate to="/" />;
};

export default App;
