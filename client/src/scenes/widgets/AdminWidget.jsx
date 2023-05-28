import React from 'react';
import { Container, Typography, Paper, Grid, Button } from '@mui/material';

const AdminWidget = () => {
  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Painel de Administrador
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Button variant="contained" fullWidth>
              Opção 1
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth>
              Opção 2
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth>
              Opção 3
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth>
              Opção 4
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminWidget;
