import React, { useEffect } from 'react';
import { Typography, Container, Button } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

import { HOME } from '../../router/router-constants';
import { useHistory } from 'react-router-dom';
import { useCallContext } from '../../contexts/calls-context';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '90vh',
        width: '100vw'
    },
    homeButton: {
        position: 'fixed',
        top: 0,
        left: 0,
        margin: '10px'
    }
}));

const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();
  const { state, dispatchGetRooms, dispatchGetRoom } = useCallContext();

  useEffect(() => {
    dispatchGetRooms()
  }, []);

  const goToHomePage = () => {
      history.push(HOME);
  };

  const columns = [
      {
          field: 'roomId',
          headerName: 'Room Id',
          sortable: false,
          filterable: false,
          width: 200,
      },
      {
          field: 'url',
          headerName: 'Room URL',
          sortable: false,
          filterable: false,
          flex: 1,
      },
  ];

  if(!state.rooms) {
    return null
  }
  return (
    <>
      <Button type="button" color="primary" variant="contained" className={classes.homeButton} onClick={() => { goToHomePage() }}>
          Home
      </Button>
      <Container className={classes.root}>
        <DataGrid
            rows={state?.rooms}
            columns={columns}
            getRowId={(row) => row.roomId}
            pageSize={10}
            rowsPerPageOptions={[10]}
            autoPageSize
            disableSelectionOnClick
            disableColumnFilter
        />
      </Container>
    </>
  );
};

export default Dashboard;
