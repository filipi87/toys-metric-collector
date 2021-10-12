import React, { useEffect, useState, useRef } from 'react';
import { Redirect } from 'react-router';
import DailyIframe from '@daily-co/daily-js';
import { useCallContext } from '../../contexts/calls-context';

import { useHistory } from 'react-router-dom';
import { HOME } from '../../router/router-constants';

const CallSession = () => {
  const history = useHistory();

  const [callFrame, setCallFrame] = useState(null);
  const dailyParentElement = useRef(null);
  const { dispatch, dispatchDeleteRoom, state } = useCallContext();

  const onJoinedMeeting = async () => {
    console.log('Joined the meeting')
    let networkStats = await callFrame?.getNetworkStats()
    console.log('networkStats', networkStats, callFrame)
  }

  const onLeftMeeting = () => {
    dispatch({type:'setRoomInfo', value:undefined})
    dispatchDeleteRoom(state.roomInfo.name)
    console.log('callFrame', callFrame)
    callFrame?.destroy();
    history.push(HOME);
  }

  useEffect(() => {
    if(!state.roomInfo){
      return
    }
    console.log('state.roomInfo', state.roomInfo)
    const frame = DailyIframe.createFrame(dailyParentElement.current, {
      showLeaveButton: true,
      showFullscreenButton: true,
      iframeStyle: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
      },
    });
    setCallFrame(frame);
    frame.on('joined-meeting', onJoinedMeeting);
    frame.on('left-meeting', onLeftMeeting);
    frame.join({ url: state.roomInfo.url });
  }, [state.roomInfo]);

  return (
    <div>
      <div ref={dailyParentElement} />
    </div>
  );
};
export default CallSession;
