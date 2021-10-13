import React, { useEffect } from 'react';
import { Container, Button, IconButton } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

import { HOME } from '../../router/router-constants';
import { useHistory } from 'react-router-dom';
import { useCallContext } from '../../contexts/calls-context';
import DashboardStats from './dashboard-stats'

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
  const { state, dispatch, dispatchGetRooms } = useCallContext();

  useEffect(() => {
    dispatchGetRooms()
  }, []);

  const goToHomePage = () => {
      history.push(HOME);
  };

  const handleShowMetrics = (rowInfo) => {
    dispatch({type:'openMetricViewer', value:rowInfo.roomId})
  };

  const columns = [
      {
          field: 'roomId',
          headerName: 'Room Id',
          editable: false,
          sortable: false,
          filterable: false,
          width: 200,
      },
      {
          field: 'url',
          headerName: 'Room URL',
          editable: false,
          sortable: false,
          filterable: false,
          flex: 1,
      },
      {
          field: 'stats',
          headerName: 'Actions',
          editable: false,
          sortable: false,
          filterable: false,
          align: 'center',
          resizable: false,
          renderCell(params) {
              const id = params.id;
              return (
                  <div>
                      <IconButton
                          color="inherit"
                          size="small"
                          onClick={() => handleShowMetrics(params.row)}
                      >
                          Metrics
                      </IconButton>
                  </div>
              );
          },
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
            rows={state.rooms}
            columns={columns}
            getRowId={(row) => row.roomId}
            pageSize={10}
            rowsPerPageOptions={[10]}
            autoPageSize
            disableSelectionOnClick
            disableColumnFilter
        />
      </Container>
      <DashboardStats/>
    </>
  );
};

export default Dashboard;
