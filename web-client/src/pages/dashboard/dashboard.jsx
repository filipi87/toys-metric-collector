import React from 'react';
import { Typography, Container, Grid, Paper } from '@material-ui/core'

const Dashboard = () => {
  return (
    <Container maxWidth="xs">
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography variant="h5" color="textSecondary">
            Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            TODO, add here the list from all the past conferences.
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
