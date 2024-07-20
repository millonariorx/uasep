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

const evaluationCriteriaOptions = [
  'Alineación Estratégica',
  'Eficiencia en la Implementación',
  'Mejora en Procesos',
  'Satisfacción del Usuario',
  'Innovación y Creatividad',
  'Impacto en el Desempeño',
  'Sostenibilidad y Escalabilidad',
];

const impactCriteriaOptions = [
  'Mejoras en Procesos',
  'Ahorro de Costos',
  'Satisfacción del Usuario',
];

const ChipContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
`;

const IdeaEvaluationAndImpact = () => {
  const location = useLocation();
  const [evaluationCriteria, setEvaluationCriteria] = useState([]);
  const [impactCriteria, setImpactCriteria] = useState(impactCriteriaOptions);
  const [implementedIdeas, setImplementedIdeas] = useState([]);
  const [scores, setScores] = useState([]);
  const [totalEvaluationScore, setTotalEvaluationScore] = useState(0);
  const [totalImpactScore, setTotalImpactScore] = useState(0);

  useEffect(() => {
    const ideas = location.state?.implementedIdeas || getImplementedIdeas();
    setImplementedIdeas(ideas);
    const initialScores = ideas.map(idea => {
      const criteriaScores = evaluationCriteriaOptions.reduce((acc, criterion) => {
        acc[criterion] = 0;
        return acc;
      }, {});
      const impactScores = impactCriteriaOptions.reduce((acc, criterion) => {
        acc[criterion] = 0;
        return acc;
      }, {});
      return { ...idea, criteriaScores, impactScores, totalEvaluationScore: 0, totalImpactScore: 0 };
    });
    setScores(initialScores);
  }, [location.state]);

  useEffect(() => {
    calculateTotalScores(scores);
  }, [scores]);

  const handleEvaluationCriteriaChange = (event) => {
    const { value } = event.target;
    setEvaluationCriteria(typeof value === 'string' ? value.split(',') : value);
  };

  const handleScoreChange = (ideaIndex, criterion, value, type) => {
    const newScores = [...scores];
    if (type === 'evaluation') {
      newScores[ideaIndex].criteriaScores[criterion] = Number(value);
      newScores[ideaIndex].totalEvaluationScore = calculateIdeaTotal(newScores[ideaIndex].criteriaScores, evaluationCriteria);
    } else {
      newScores[ideaIndex].impactScores[criterion] = Number(value);
      newScores[ideaIndex].totalImpactScore = calculateIdeaTotal(newScores[ideaIndex].impactScores, impactCriteria);
    }
    setScores(newScores);
    calculateTotalScores(newScores);
  };

  const calculateIdeaTotal = (criteriaScores, criteria) => {
    return criteria.reduce((sum, criterion) => sum + (criteriaScores[criterion] || 0), 0);
  };

  const calculateTotalScores = (scores) => {
    const totalEvaluation = scores.reduce((acc, score) => acc + score.totalEvaluationScore, 0);
    const totalImpact = scores.reduce((acc, score) => acc + score.totalImpactScore, 0);
    setTotalEvaluationScore(totalEvaluation);
    setTotalImpactScore(totalImpact);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
        <img src={logo} alt="UAESP Logo" style={{ width: '150px', height: 'auto' }} />
      </Box>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: '#fff', borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Evaluación y Registro de Impacto de Ideas Implementadas
        </Typography>
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel>Criterios de Evaluación</InputLabel>
          <Select
            multiple
            value={evaluationCriteria}
            onChange={handleEvaluationCriteriaChange}
            renderValue={(selected) => (
              <ChipContainer>
                {selected.map((value) => (
                  <Chip key={value} label={value} sx={{ margin: 0.5 }} />
                ))}
              </ChipContainer>
            )}
          >
            {evaluationCriteriaOptions.map((criterion) => (
              <MenuItem key={criterion} value={criterion}>
                {criterion}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre de la Idea</TableCell>
                <TableCell>Código</TableCell>
                {evaluationCriteria.map((criterion, index) => (
                  <TableCell key={index}>{criterion}</TableCell>
                ))}
                <TableCell>Puntuación Total de Evaluación</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.map((score, ideaIndex) => (
                <TableRow key={ideaIndex}>
                  <TableCell>{score.name}</TableCell>
                  <TableCell>{score.code}</TableCell>
                  {evaluationCriteria.map((criterion, criterionIndex) => (
                    <TableCell key={criterionIndex}>
                      <TextField
                        type="number"
                        value={score.criteriaScores[criterion]}
                        onChange={(e) => handleScoreChange(ideaIndex, criterion, e.target.value, 'evaluation')}
                        inputProps={{ min: 0, max: 5 }}
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    {score.totalEvaluationScore}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h5" align="center" sx={{ mb: 4 }}>
          Sumatoria Total de Puntuaciones de Evaluación: {totalEvaluationScore}
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre de la Idea</TableCell>
                <TableCell>Código</TableCell>
                {impactCriteria.map((criterion, index) => (
                  <TableCell key={index}>{criterion}</TableCell>
                ))}
                <TableCell>Puntuación Total de Impacto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.map((score, ideaIndex) => (
                <TableRow key={ideaIndex}>
                  <TableCell>{score.name}</TableCell>
                  <TableCell>{score.code}</TableCell>
                  {impactCriteria.map((criterion, criterionIndex) => (
                    <TableCell key={criterionIndex}>
                      <TextField
                        type="number"
                        value={score.impactScores[criterion]}
                        onChange={(e) => handleScoreChange(ideaIndex, criterion, e.target.value, 'impact')}
                        inputProps={{ min: 0, max: 5 }}
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    {score.totalImpactScore}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="h5" align="center" sx={{ mt: 4 }}>
          Sumatoria Total de Puntuaciones de Impacto: {totalImpactScore}
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

export default IdeaEvaluationAndImpact;
