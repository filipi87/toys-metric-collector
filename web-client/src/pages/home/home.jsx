import React, { useState } from 'react';
import { Typography, Container, Grid, Paper, Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { DASHBOARD } from '../../router/router-constants';
import { useHistory } from 'react-router-dom';
import { useCallContext } from '../../contexts/calls-context';

const useStyles = makeStyles(theme => ({
    aligned: {
        alignItems: 'center',
        display: 'flex',
    },
}));

const Home = () => {

  const classes = useStyles();
  const history = useHistory();
  const [roomName, setRoomName] = useState('');
  const { dispatchCreateRoom } = useCallContext();

  const goToDashboardPage = () => {
      history.push(DASHBOARD);
  };

  const createRoom = () => {
      console.log('Room name', roomName)
      dispatchCreateRoom(roomName);
  };

  return (
    <Container>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12}>
          <Typography variant="h5" color="textSecondary">
            Toys metric collector:
        </Typography>
        </Grid>
        <Grid item xs={12} md={6} className={classes.aligned}>
          <TextField
              margin="normal"
              required
              fullWidth
              autoFocus
              placeholder='Room Name'
              value={roomName}
              onChange={e => setRoomName(e.target.value)}
          />
          <Button type="button" color="primary" variant="contained" onClick={() => { createRoom() }}>
              Join
          </Button>
        </Grid>
        <Grid item xs={12} md={6} className={classes.aligned}>
          <Button type="button" color="primary" variant="contained" onClick={() => { goToDashboardPage() }}>
              Dashboard
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
