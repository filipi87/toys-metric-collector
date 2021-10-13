import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

import { useCallContext } from '../../contexts/calls-context';

const DashboardStats = () => {
  const { state, dispatch, dispatchGetRoom } = useCallContext();

  useEffect(() => {
    if(!state.metricViewerRoomId){
      return
    }
    dispatchGetRoom(state.metricViewerRoomId)
  }, [state.metricViewerRoomId]);

  const onClose = () => {
    dispatch({type:'closeMetricViewer'})
  };

  return (
    <Dialog fullWidth={true} maxWidth='lg' open={state.metricViewerOpened} onClose={onClose}>
      <DialogTitle>Metrics viewer</DialogTitle>
      <DialogContent>
          Statistics for room {state.metricViewerRoomId}
      </DialogContent>
      <DialogActions>
          <Button onClick={onClose} color="default">
              Close
          </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DashboardStats;
