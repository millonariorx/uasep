import React, { useState } from 'react';
import { Grid, Typography, Button, Box, TextField, InputAdornment, Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Link } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ErrorIcon from '@mui/icons-material/Error';
import logo from '../img/LOGO-UAESP.png'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSignIn = () => {
    // Lógica de inicio de sesión
    // Si hay un error, setOpen(true) y setMessage('Mensaje de error')
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handlePTAADSignIn = () => {
    // Lógica de inicio de sesión con PTAAD
  };

  const gradientStyle = {
    background: 'linear-gradient(180deg,  #6cbc94 0%, #70bc94  50%, #6cbc94  100%)',
    color: 'white',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'left',
    position: 'relative',
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={8} style={gradientStyle}>
        <Typography variant="h3">UASEP</Typography>
       
        <Button variant="contained" style={{backgroundColor:"#6cbc94"}} size='large'>Leer más</Button>
        <Box sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '45%',
          overflow: 'hidden'
        }}>
          {/* SVG content can go here */}
        </Box>
      </Grid>
      <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'left' }}>
      <img src={logo} alt="UAESP Logo" style={{ marginBottom: '20px', width: '300px', height: 'auto' , mb:"2px"}} />
        <Typography variant="h4">¡Hola de nuevo!</Typography>
        <Typography variant="body1">Nos alegra tenerte de vuelta.</Typography>
        <Container maxWidth="xs">
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <Link href="/login/forget" passHref legacyBehavior>
            <Typography
              variant="subtitle2"
              sx={{ mb: 2 , color:"#6cbc94"}}
            >
              ¿Olvidaste tu contraseña?
            </Typography>
          </Link>
          <Button
            fullWidth
            variant="contained"
            style={{backgroundColor:"#6cbc94"}}
            onClick={handleSignIn}
          >
            Iniciar sesión
          </Button>
          <Dialog open={open} onClose={handleCloseDialog}>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
              <ErrorIcon color="error" sx={{ fontSize: 40, mr: 2 }} />
              <Typography variant="h6">Error</Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">Cerrar</Button>
            </DialogActions>
          </Dialog>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 1,
            }}
          >
            {/* SVG content can go here */}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 1,
            }}
          >
            <button onClick={handlePTAADSignIn} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              {/* SVG content can go here */}
            </button>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Login;
