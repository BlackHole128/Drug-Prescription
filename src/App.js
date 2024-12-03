import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Select, MenuItem, Button, Typography, Box, Paper, Grid } from '@mui/material';

function App() {
    const [inputs, setInputs] = useState({
        age: '',
        sex: '0', // 0 for Female, 1 for Male
        bone_density: '',
        blood_pressure: ''
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://blackhole.pythonanywhere.com/predict', {
                ...inputs,
                age: Number(inputs.age),
                sex: Number(inputs.sex),
                bone_density: Number(inputs.bone_density),
                blood_pressure: Number(inputs.blood_pressure),
            });
            setResult(response.data);
        } catch (error) {
            console.error(error);
            alert('Error fetching data.');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Fuzzy Drug Prescription
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Age"
                            type="number"
                            name="age"
                            value={inputs.age}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <Select
                            label="Sex"
                            name="sex"
                            value={inputs.sex}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value="0">Female</MenuItem>
                            <MenuItem value="1">Male</MenuItem>
                        </Select>
                        <TextField
                            label="Bone Density"
                            type="number"
                            name="bone_density"
                            value={inputs.bone_density}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Blood Pressure"
                            type="number"
                            name="blood_pressure"
                            value={inputs.blood_pressure}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Get Prescription
                        </Button>
                    </Box>
                </form>
                {result && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6">Results</Typography>
                        <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        <strong>Osteoporosis Drug:</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">{result.osteoporosis_drug}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        <strong>Hypertension Drug:</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">{result.hypertension_drug}</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                )}
            </Paper>
        </Container>
    );
}

export default App;
