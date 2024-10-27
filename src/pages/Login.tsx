import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Container, TextField, Button, Typography, Box} from '@mui/material';
import {login} from "../api/authApi.ts";
import {useAuth} from "../context/AuthContext.tsx";
import {AxiosError} from "axios";

const Login: React.FC = () => {
        const navigate = useNavigate();
        const {login: handleLogin} = useAuth();
        const [errorMessage, setErrorMessage] = useState<string | null>(null);
        const [email, setEmail] = useState<string>("");
        const [password, setPassword] = useState<string>("");

        const loginSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            try {
                if (email === "" || password === "") {
                    return;
                }
                const data = await login(email, password);
                handleLogin(data.token, () => navigate('/dashboard'))
            } catch (error) {
                console.error('Error during login:', error);
                setErrorMessage((error as AxiosError).message);
            }
        };

        return (
            <Container maxWidth="sm">
                <Box mt={5}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={loginSubmit}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth
                                disabled={email === "" || password === ""}>
                            Login
                        </Button>
                    </form>
                    <Box mt={2} textAlign="center">
                        {errorMessage && (
                            <Typography variant="body1" color="error" gutterBottom>
                                {errorMessage}
                            </Typography>
                        )}


                        <Button color="secondary" onClick={() => navigate('/register')}>
                            Don't have an account? Register
                        </Button>
                    </Box>
                </Box>
            </Container>
        );
    }
;

export default Login;
