import React, { useState } from 'react';
import { Grid, Typography, Button, Box, TextField, Container, Paper, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Card, CardContent, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import logo from '../img/LOGO-UAESP.png';  // Ajusta la ruta según sea necesario

const AdminAreas = () => {
  const [areaName, setAreaName] = useState('');
  const [areas, setAreas] = useState([]);

  const handleAddArea = () => {
    if (areaName.trim() !== '') {
      setAreas([...areas, areaName]);
      setAreaName('');
    }
  };

  const handleDeleteArea = (index) => {
    const newAreas = areas.filter((_, i) => i !== index);
    setAreas(newAreas);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
        <img src={logo} alt="UAESP Logo" style={{ width: '150px', height: 'auto' }} />
      </Box>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: '#fff', borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Definir Áreas o Dependencias
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          Administre las áreas o dependencias que pueden registrar ideas innovadoras.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, boxShadow: 3, borderRadius: 2, backgroundColor: '#f9f9f9' }}>
              <Typography variant="h6" gutterBottom>
                Agregar Nueva Área
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                label="Nombre del Área o Dependencia"
                value={areaName}
                onChange={(e) => setAreaName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <AccountBalanceIcon position="start" sx={{ color: '#6cbc94', mr: 1 }} />
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                style={{ backgroundColor: '#6cbc94', width: '100%' }}
                onClick={handleAddArea}
              >
                Agregar Área
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, boxShadow: 3, borderRadius: 2, backgroundColor: '#f9f9f9' }}>
              <Typography variant="h6" gutterBottom>
                Dependencias Creadas
              </Typography>
              <List>
                {areas.map((area, index) => (
                  <Card key={index} sx={{ mb: 2, backgroundColor: '#fff', borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h6">{area}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="error" onClick={() => handleDeleteArea(index)}>
                        Eliminar
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminAreas;
