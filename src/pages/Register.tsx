import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Container, TextField, Button, Typography, Box} from '@mui/material';
import {register} from "../api/authApi.ts";
import {AxiosError} from "axios";

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (email === "" || password === "") {
                return;
            }
            await register(email, password);
            setSuccessMessage("User registered successfully. Go to login page.")
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage((error as AxiosError).message);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Register
                </Typography>

                {!successMessage && (
                    <>

                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleRegister}
                                disabled={email === "" || password === ""}>
                            Register
                        </Button>
                    </>
                )}

                {errorMessage && (
                    <Typography variant="body1" color="error" gutterBottom>
                        {errorMessage}
                    </Typography>
                )}

                {successMessage && (
                    <>
                        <Typography variant="body1" color="success" gutterBottom>
                            {successMessage}
                        </Typography>
                        <Button type="button" variant="contained"
                                color="primary" fullWidth
                                onClick={() => navigate("/login")}>
                            Login
                        </Button>
                    </>
                )}
            </Box>
        </Container>
    );
};

export default Register;