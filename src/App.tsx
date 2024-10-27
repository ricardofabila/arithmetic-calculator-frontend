import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import {AuthProvider, useAuth} from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

const RequireAuth: React.FC<{ children: JSX.Element }> = ({children}) => {
    const {isAuthenticated} = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login"/>;
    }
    return children;
};


const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <RequireAuth>
                                <Dashboard/>
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/login"
                        element={<Login/>}
                    />
                    <Route
                        path="/register"
                        element={<Register/>}
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <RequireAuth>
                                <Dashboard/>
                            </RequireAuth>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
