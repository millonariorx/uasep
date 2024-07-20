import React, { useState } from 'react';
import { Grid, Typography, Button, Box, TextField, Container, Paper, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { signUp } from 'aws-amplify/auth';
import logo from '../img/LOGO-UAESP.png';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';

const AdminUsers = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [area, setArea] = useState('');
  const [users, setUsers] = useState([]);
  const [areas, setAreas] = useState(['Área 1', 'Área 2', 'Área 3']); // Lista de áreas predefinidas

  const handleAddUser = async () => {
    if (username.trim() !== '' && email.trim() !== '' && role.trim() !== '' && area.trim() !== '') {
      try {
        const newUser = { username, email, role, area };
        // Agregar el usuario a Cognito
        await signUp({
          username,
          password: 'DefaultPassword123!', // O genera una contraseña segura y envíala por correo
          attributes: {
            email,
            'custom:role': role,
            'custom:area': area
          }
        });
        setUsers([...users, newUser]);
        setUsername('');
        setEmail('');
        setRole('');
        setArea('');
      } catch (error) {
        console.error('Error creating user:', error);
      }
    }
  };

  const handleDeleteUser = (index) => {
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
    // También deberías eliminar el usuario de Cognito aquí
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
        <img src={logo} alt="UAESP Logo" style={{ width: '150px', height: 'auto' }} />
      </Box>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: '#fff', borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Administración de Usuarios
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          Administre los usuarios y roles para cada área.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, boxShadow: 3, borderRadius: 2, backgroundColor: '#f9f9f9' }}>
              <Typography variant="h6" gutterBottom>
                Agregar Nuevo Usuario
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                label="Nombre de Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <AccountCircleIcon position="start" sx={{ color: '#6cbc94', mr: 1 }} />
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <EmailIcon position="start" sx={{ color: '#6cbc94', mr: 1 }} />
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <LockIcon position="start" sx={{ color: '#6cbc94', mr: 1 }} />
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel>Rol</InputLabel>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  label="Rol"
                  startAdornment={<GroupIcon sx={{ color: '#6cbc94', mr: 1 }} />}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel>Área</InputLabel>
                <Select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  label="Área"
                  startAdornment={<BusinessIcon sx={{ color: '#6cbc94', mr: 1 }} />}
                >
                  {areas.map((area, index) => (
                    <MenuItem key={index} value={area}>{area}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                style={{ backgroundColor: '#6cbc94', width: '100%' }}
                onClick={handleAddUser}
              >
                Agregar Usuario
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, boxShadow: 3, borderRadius: 2, backgroundColor: '#f9f9f9' }}>
              <Typography variant="h6" gutterBottom>
                Usuarios Creados
              </Typography>
              <List>
                {users.map((user, index) => (
                  <ListItem key={index} sx={{ backgroundColor: '#fff', borderRadius: 1, mb: 1 }}>
                    <ListItemText primary={`${user.username} (${user.role})`} secondary={user.area} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteUser(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminUsers;
