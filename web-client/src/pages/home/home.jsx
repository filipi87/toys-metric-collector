import React from 'react';
import { Typography, Container, Grid, Paper } from '@material-ui/core'

import styles from './home.css';

const Home = () => {
  return (
    <Container maxWidth="xs" className={styles.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Typography variant="h5" color="textSecondary">
            Toys metric collector:
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
            TODO, add here to joing the room
          </Paper>
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
            TODO, add here to joing see the dashboard
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
