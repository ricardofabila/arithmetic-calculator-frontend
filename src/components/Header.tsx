import React from 'react';
import {useAuth} from '../context/AuthContext';
import {AppBar, Toolbar, Typography, Button} from '@mui/material';
import {useNavigate} from "react-router-dom";

const Header: React.FC = () => {
    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(() => {
            navigate('/login');
        });
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{flexGrow: 1}}>
                    Arithmetic Calculator
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
