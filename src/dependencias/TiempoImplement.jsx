import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import styled from '@emotion/styled';
import logo from '../img/LOGO-UAESP.png';  // Ajusta la ruta según sea necesario
import { useLocation } from 'react-router-dom';

const getImplementedIdeas = () => {
  return [
    { name: 'Idea 1', code: 'ID001' },
    { name: 'Idea 2', code: 'ID002' },
    { name: 'Idea 3', code: 'ID003' },
  ];
};

const TiempoImplement = () => {
  const location = useLocation();
  const [implementedIdeas, setImplementedIdeas] = useState([]);
  const [scores, setScores] = useState([]);
  const [totalImplementationTime, setTotalImplementationTime] = useState(0);

  useEffect(() => {
    const ideas = location.state?.implementedIdeas || getImplementedIdeas();
    setImplementedIdeas(ideas);
    const initialScores = ideas.map(idea => ({
      ...idea,
      registrationDate: '',
      implementationDate: '',
      implementationTime: 0,
    }));
    setScores(initialScores);
  }, [location.state]);

  useEffect(() => {
    calculateTotalImplementationTime(scores);
  }, [scores]);

  const handleDateChange = (ideaIndex, value, type) => {
    const newScores = [...scores];
    newScores[ideaIndex][type] = value;
    if (newScores[ideaIndex].registrationDate && newScores[ideaIndex].implementationDate) {
      newScores[ideaIndex].implementationTime = calculateImplementationTime(newScores[ideaIndex].registrationDate, newScores[ideaIndex].implementationDate);
    }
    setScores(newScores);
    calculateTotalImplementationTime(newScores);
  };

  const calculateImplementationTime = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotalImplementationTime = (scores) => {
    const total = scores.reduce((acc, score) => acc + score.implementationTime, 0);
    setTotalImplementationTime(total);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
        <img src={logo} alt="UAESP Logo" style={{ width: '150px', height: 'auto' }} />
      </Box>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: '#fff', borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Registro del Tiempo de Implementación de Ideas
        </Typography>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre de la Idea</TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Fecha de Registro</TableCell>
                <TableCell>Fecha de Implementación</TableCell>
                <TableCell>Tiempo de Implementación (días)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.map((score, ideaIndex) => (
                <TableRow key={ideaIndex}>
                  <TableCell>{score.name}</TableCell>
                  <TableCell>{score.code}</TableCell>
                  <TableCell>
                    <TextField
                      type="date"
                      value={score.registrationDate}
                      onChange={(e) => handleDateChange(ideaIndex, e.target.value, 'registrationDate')}
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="date"
                      value={score.implementationDate}
                      onChange={(e) => handleDateChange(ideaIndex, e.target.value, 'implementationDate')}
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell>
                    {score.implementationTime}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h5" align="center" sx={{ mb: 4 }}>
          Sumatoria Total de Tiempos de Implementación: {totalImplementationTime} días
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant="contained" style={{ backgroundColor: '#6cbc94' }}>
            Guardar Tiempos de Implementación
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TiempoImplement;
