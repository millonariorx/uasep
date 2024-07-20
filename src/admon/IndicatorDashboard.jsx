import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Box, Button, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';
import 'chartjs-plugin-datalabels';
import logo from '../img/LOGO-UAESP.png';  // Ajusta la ruta según sea necesario

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const mockData = {
  qualityScores: 80,
  impactScores: 70,
  implementationTime: 60,
};

const calculateIndicator = (qualityScores, impactScores, implementationTime) => {
  return (qualityScores + impactScores) / implementationTime;
};

const IndicatorDashboard = () => {
  const [qualityScores, setQualityScores] = useState(mockData.qualityScores);
  const [impactScores, setImpactScores] = useState(mockData.impactScores);
  const [implementationTime, setImplementationTime] = useState(mockData.implementationTime);
  const [indicator, setIndicator] = useState(0);

  useEffect(() => {
    const result = calculateIndicator(qualityScores, impactScores, implementationTime);
    setIndicator(result.toFixed(2));
  }, [qualityScores, impactScores, implementationTime]);

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    doc.text("Indicador Compuesto de Rendimiento del Proceso de Innovación", 10, 10);
    doc.text(`Sumatoria de Calidad de Implementación: ${qualityScores}`, 10, 20);
    doc.text(`Sumatoria de Medidas de Impacto: ${impactScores}`, 10, 30);
    doc.text(`Sumatoria de Tiempos de Implementación: ${implementationTime}`, 10, 40);
    doc.text(`Indicador Compuesto: ${indicator}`, 10, 50);
    doc.save("Indicador_Compuesto.pdf");
  };

  const data = {
    labels: ['Calidad', 'Impacto', 'Tiempo de Implementación'],
    datasets: [
      {
        label: 'Indicador Compuesto',
        data: [qualityScores, impactScores, implementationTime],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
        <img src={logo} alt="UAESP Logo" style={{ width: '150px', height: 'auto' }} />
      </Box>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: '#fff', borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Indicador Compuesto de Rendimiento del Proceso de Innovación
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={4}>
            <Typography variant="h6">Sumatoria de Calidad de Implementación</Typography>
            <Typography variant="h5">{qualityScores}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Sumatoria de Medidas de Impacto</Typography>
            <Typography variant="h5">{impactScores}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">Sumatoria de Tiempos de Implementación</Typography>
            <Typography variant="h5">{implementationTime}</Typography>
          </Grid>
        </Grid>
        <Typography variant="h5" align="center" sx={{ mb: 4 }}>
          Indicador Compuesto: {indicator}
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Line data={data} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant="contained" style={{ backgroundColor: '#6cbc94' }} onClick={handleDownloadReport}>
            Descargar Reporte
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default IndicatorDashboard;
