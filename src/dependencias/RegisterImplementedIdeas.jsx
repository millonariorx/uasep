import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Box, TextField, Container, Paper } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { formatDistanceToNow } from 'date-fns';
import logo from '../img/LOGO-UAESP.png';  // Ajusta la ruta según sea necesario

// Simulación de obtener el área del usuario desde la autenticación o contexto
const getUserArea = () => {
  return 'Área Asignada al Usuario';
};

// Simulación de obtener la fecha de fin del periodo
const getPeriodEndDate = () => {
  // Implementar lógica para obtener la fecha de fin del periodo desde el backend
  return new Date('2024-12-31T23:59:59'); // Fecha de fin de periodo simulada
};

const RegisterImplementedIdeas = () => {
  const [implementedIdeasCount, setImplementedIdeasCount] = useState('');
  const [implementedIdeas, setImplementedIdeas] = useState([{ name: '', code: '' }]);
  const [area, setArea] = useState('');
  const [periodEnded, setPeriodEnded] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const userArea = getUserArea();
    setArea(userArea);
    const endDate = getPeriodEndDate();
    updatePeriodStatus(endDate);
    const timer = setInterval(() => updatePeriodStatus(endDate), 1000);

    return () => clearInterval(timer);
  }, []);

  const updatePeriodStatus = (endDate) => {
    const now = new Date();
    if (now >= endDate) {
      setPeriodEnded(true);
    } else {
      setTimeLeft(formatDistanceToNow(endDate, { includeSeconds: true }));
    }
  };

  const handleImplementedIdeasChange = (index, field, value) => {
    const newIdeas = [...implementedIdeas];
    newIdeas[index][field] = value;
    setImplementedIdeas(newIdeas);
  };

  const addImplementedIdeaField = () => {
    setImplementedIdeas([...implementedIdeas, { name: '', code: '' }]);
  };

  const handleSubmit = () => {
    // Implementar lógica para enviar los datos
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
        <img src={logo} alt="UAESP Logo" style={{ width: '150px', height: 'auto' }} />
      </Box>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: '#fff', borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Registro de Ideas Implementadas
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          Registre las ideas que fueron exitosamente implementadas durante el periodo.
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
         {area}
        </Typography>
        {periodEnded ? (
          <Typography variant="h6" align="center" color="error">
            El periodo de registro de ideas propuestas ha terminado.
          </Typography>
        ) : (
          <>
            <Typography variant="body1" align="center" color="primary" gutterBottom>
              Tiempo restante para el fin del periodo: {timeLeft}
            </Typography>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Cantidad Total de Ideas Implementadas"
                  value={implementedIdeasCount}
                  onChange={(e) => setImplementedIdeasCount(e.target.value)}
                  sx={{ mb: 3 }}
                />
              </Grid>
            </Grid>
            {implementedIdeas.map((idea, index) => (
              <Paper elevation={3} sx={{ p: 2, mb: 3 }} key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label={`Nombre de la Idea ${index + 1}`}
                      value={idea.name}
                      onChange={(e) => handleImplementedIdeasChange(index, 'name', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label={`Código de la Idea ${index + 1}`}
                      value={idea.code}
                      onChange={(e) => handleImplementedIdeasChange(index, 'code', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}
            <Grid container spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
              <Grid item>
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon />}
                  style={{ backgroundColor: '#6cbc94' }}
                  onClick={addImplementedIdeaField}
                >
                  Agregar Otra Idea
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#6cbc94' }}
                  onClick={handleSubmit}
                >
                  Registrar Ideas Implementadas
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default RegisterImplementedIdeas;
