import React, { useEffect } from 'react';
import { Typography, Container, Grid, Button, Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import { DASHBOARD, CALL } from '../../router/router-constants';
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
  const { dispatchCreateRoom, state, dispatchGetRooms } = useCallContext();

  useEffect(() => {
      if(state.roomInfo){
        history.push(`${CALL}/${state.roomInfo.roomId}`);
      }
  }, [state.roomInfo]);

  const goToDashboardPage = () => {
      dispatchGetRooms()
      history.push(DASHBOARD);
  };

  const createRoom = () => {
      const roomId = `r-${Date.now()}`
      dispatchCreateRoom(roomId);
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
          <Button type="button" disabled={state.creatingMeeting} color="primary" variant="contained" onClick={() => { createRoom() }}>
              New meeting
          </Button>
        </Grid>
        <Grid item xs={12} md={6} className={classes.aligned}>
          <Button type="button" color="primary" variant="contained" onClick={() => { goToDashboardPage() }}>
              Dashboard
          </Button>
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={state.creatingMeeting}
      >
        <CircularProgress color="inherit" />
        Creating meeting
      </Backdrop>
    </Container>
  );
};

export default Home;
