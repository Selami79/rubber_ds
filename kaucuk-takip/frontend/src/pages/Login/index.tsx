import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/common/ErrorMessage';
import api from '../../services/api';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        kullanici_adi: '',
        sifre: ''
    });
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', formData);
            login(response.data.token, response.data.user);
            navigate('/');
        } catch (err) {
            setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Paper sx={{ p: 4 }}>
                    <Typography variant="h5" component="h1" gutterBottom align="center">
                        Kauçuk Takip Sistemi
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Kullanıcı Adı"
                            variant="outlined"
                            margin="normal"
                            value={formData.kullanici_adi}
                            onChange={(e) => setFormData({
                                ...formData,
                                kullanici_adi: e.target.value
                            })}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            label="Şifre"
                            variant="outlined"
                            margin="normal"
                            value={formData.sifre}
                            onChange={(e) => setFormData({
                                ...formData,
                                sifre: e.target.value
                            })}
                        />
                        {error && (
                            <Box sx={{ mt: 2 }}>
                                <ErrorMessage message={error} />
                            </Box>
                        )}
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit"
                            sx={{ mt: 3 }}
                        >
                            Giriş Yap
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;
