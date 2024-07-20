import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Box, Container, Paper, Select, MenuItem, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Chip } from '@mui/material';
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

const criteriaOptions = [
  'Alineación Estratégica',
  'Eficiencia en la Implementación',
  'Mejora en Procesos',
  'Satisfacción del Usuario',
  'Innovación y Creatividad',
  'Impacto en el Desempeño',
  'Sostenibilidad y Escalabilidad',
];

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledChip = styled(Chip)`
  margin: 4px;
`;

const IdeaEvaluation = () => {
  const location = useLocation();
  const [criteria, setCriteria] = useState([]);
  const [implementedIdeas, setImplementedIdeas] = useState([]);
  const [scores, setScores] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const ideas = location.state?.implementedIdeas || getImplementedIdeas();
    setImplementedIdeas(ideas);
    const initialScores = ideas.map(idea => {
      const criteriaScores = criteriaOptions.reduce((acc, criterion) => {
        acc[criterion] = 0;
        return acc;
      }, {});
      return { ...idea, criteriaScores, totalScore: 0 };
    });
    setScores(initialScores);
  }, [location.state]);

  useEffect(() => {
    calculateTotalScore(scores);
  }, [scores]);

  const handleCriteriaChange = (event) => {
    const { value } = event.target;
    setCriteria(typeof value === 'string' ? value.split(',') : value);
  };

  const handleScoreChange = (ideaIndex, criterion, value) => {
    const newScores = [...scores];
    newScores[ideaIndex].criteriaScores[criterion] = Number(value);
    newScores[ideaIndex].totalScore = calculateIdeaTotal(newScores[ideaIndex].criteriaScores);
    setScores(newScores);
  };

  const calculateIdeaTotal = (criteriaScores) => {
    return criteria.reduce((sum, criterion) => sum + (criteriaScores[criterion] || 0), 0);
  };

  const calculateTotalScore = (scores) => {
    const total = scores.reduce((acc, score) => acc + score.totalScore, 0);
    setTotalScore(total);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
        <img src={logo} alt="UAESP Logo" style={{ width: '150px', height: 'auto' }} />
      </Box>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: '#fff', borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Evaluación de Ideas Implementadas
        </Typography>
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel>Criterios de Evaluación</InputLabel>
          <Select
            multiple
            value={criteria}
            onChange={handleCriteriaChange}
            renderValue={(selected) => (
              <ChipContainer>
                {selected.map((value) => (
                  <StyledChip key={value} label={value} />
                ))}
              </ChipContainer>
            )}
          >
            {criteriaOptions.map((criterion) => (
              <MenuItem key={criterion} value={criterion}>
                {criterion}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre de la Idea</TableCell>
                <TableCell>Código</TableCell>
                {criteria.map((criterion, index) => (
                  <TableCell key={index}>{criterion}</TableCell>
                ))}
                <TableCell>Puntuación Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.map((score, ideaIndex) => (
                <TableRow key={ideaIndex}>
                  <TableCell>{score.name}</TableCell>
                  <TableCell>{score.code}</TableCell>
                  {criteria.map((criterion, criterionIndex) => (
                    <TableCell key={criterionIndex}>
                      <TextField
                        type="number"
                        value={score.criteriaScores[criterion]}
                        onChange={(e) => handleScoreChange(ideaIndex, criterion, e.target.value)}
                        inputProps={{ min: 0, max: 5 }}
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    {score.totalScore}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h5" align="center" sx={{ mt: 4 }}>
          Sumatoria Total de Puntuaciones: {totalScore}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant="contained" style={{ backgroundColor: '#6cbc94' }}>
            Guardar Evaluaciones
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default IdeaEvaluation;
