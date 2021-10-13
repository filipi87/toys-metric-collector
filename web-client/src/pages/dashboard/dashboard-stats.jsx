import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { Chart } from "react-google-charts";

import { useCallContext } from '../../contexts/calls-context';

const DashboardStats = () => {

  const { state, dispatch, dispatchGetRoom } = useCallContext();
  console.log('state.roomInfo', state.roomInfo)

  useEffect(() => {
    if(!state.metricViewerRoomId){
      return
    }
    dispatchGetRoom(state.metricViewerRoomId)
  }, [state.metricViewerRoomId]);

  const onClose = () => {
    dispatch({type:'closeMetricViewer'})
  };

  if(!state.roomInfo){
    return null
  }

  const items = state.roomInfo.users.map(user => {
    const videoStatistics = user.videoStatistics
    const options= {
      title: "Bits per second",
      vAxis: { title: 'Amount' },
    }
    const data = [ ['x','Received', 'Send'] ]
    for ( let i = 0; i < videoStatistics.videoRecvBitsPerSecond.length; i++ ) {
      const line = [i, videoStatistics.videoRecvBitsPerSecond[i], videoStatistics.videoSendBitsPerSecond[i]]
      data.push(line);
    }
    return (
       <Chart
         key={user.id}
         chartType="LineChart"
         data={data}
         options={options}
         height="400px"
       />
    )
  });

  return (
    <Dialog fullWidth={true} maxWidth='lg' open={state.metricViewerOpened} onClose={onClose}>
      <DialogTitle>Metrics viewer</DialogTitle>
      <DialogContent>
          {items}
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
