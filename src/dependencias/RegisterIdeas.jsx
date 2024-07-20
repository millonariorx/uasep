import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Box, TextField, Container, Paper } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import logo from '../img/LOGO-UAESP.png';  // Ajusta la ruta según sea necesario

// Simulación de obtener el área del usuario desde la autenticación o contexto
const getUserArea = () => {
  return 'Área Asignada al Usuario';
};

const RegisterIdeas = () => {
  const [ideasCount, setIdeasCount] = useState('');
  const [ideas, setIdeas] = useState([{ name: '', code: '', evidence: null }]);
  const [area, setArea] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [quarters, setQuarters] = useState('');

  useEffect(() => {
    const userArea = getUserArea();
    setArea(userArea);
  }, []);

  const handleIdeasChange = (index, field, value) => {
    const newIdeas = [...ideas];
    newIdeas[index][field] = value;
    setIdeas(newIdeas);
  };

  const handleEvidenceChange = (index, file) => {
    const newIdeas = [...ideas];
    newIdeas[index].evidence = file;
    setIdeas(newIdeas);
  };

  const addIdeaField = () => {
    setIdeas([...ideas, { name: '', code: '', evidence: null }]);
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
          Registro y Definición de Ideas
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          Registre la cantidad de ideas proyectadas para implementar en un periodo determinado de tiempo.
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Área: {area}
        </Typography>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Cantidad Total de Ideas Propuestas"
              value={ideasCount}
              onChange={(e) => setIdeasCount(e.target.value)}
              sx={{ mb: 3 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de Inicio"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              label="Fecha de Fin"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Cantidad de Ideas por Trimestre"
              value={quarters}
              onChange={(e) => setQuarters(e.target.value)}
              sx={{ mb: 3 }}
            />
          </Grid>
        </Grid>
        {ideas.map((idea, index) => (
          <Paper elevation={3} sx={{ p: 2, mb: 3 }} key={index}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label={`Nombre de la Idea ${index + 1}`}
                  value={idea.name}
                  onChange={(e) => handleIdeasChange(index, 'name', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label={`Código de la Idea ${index + 1}`}
                  value={idea.code}
                  onChange={(e) => handleIdeasChange(index, 'code', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<UploadFileIcon />}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Subir Evidencia
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleEvidenceChange(index, e.target.files[0])}
                  />
                </Button>
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
              onClick={addIdeaField}
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
              Registrar Ideas
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default RegisterIdeas;
