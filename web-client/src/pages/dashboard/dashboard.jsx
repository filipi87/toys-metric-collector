import React, { useEffect } from 'react';
import { Typography, Container } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

import { useCallContext } from '../../contexts/calls-context';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '100vh',
        width: '100vw'
    }
}));

const Dashboard = () => {
  const classes = useStyles();
  const { state, dispatchGetRooms, dispatchGetRoom } = useCallContext();

  useEffect(() => {
    dispatchGetRooms()
  }, []);

  const columns = [
      {
          field: 'roomId',
          headerName: 'Room Id',
          sortable: false,
          filterable: false,
          flex: 1,
      },
      {
          field: 'url',
          headerName: 'Room URL',
          sortable: false,
          filterable: false,
          width: 200,
      },
  ];

  if(!state.rooms) {
    return null
  }
  return (
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
  );
};

export default Dashboard;
