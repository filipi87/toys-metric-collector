import React, { useEffect, useState, useRef } from 'react';
import { Redirect, useParams } from 'react-router';
import DailyIframe from '@daily-co/daily-js';
import { useCallContext } from '../../contexts/calls-context';

import { useHistory } from 'react-router-dom';
import { HOME } from '../../router/router-constants';

const CallSession = () => {
  const { roomName } = useParams();
  const history = useHistory();

  const [callFrame, setCallFrame] = useState(null);
  const dailyParentElement = useRef(null);
  const { dispatch, dispatchDeleteRoom } = useCallContext();

  useEffect(() => {
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
    frame.on('joined-meeting', async () => {
      console.log('Joined the meeting')
      window.dailyFrame = frame
      let networkStats = await frame.getNetworkStats()
      console.log('networkStats', networkStats)
    });
    frame.on('left-meeting', () => {
      dispatch({type:'setRoomInfo', value:undefined})
      dispatchDeleteRoom(roomName)
      callFrame?.destroy();
      history.push(HOME);
    });
    const start = async () => {
      //TODO need to retrieve the credentials in case of private conferences
      const roomInfo = { url: `https://filipi87.daily.co/${roomName}`}
      frame.join({
        url: roomInfo.url,
        //token: roomInfo.token,
      });
    };
    start();
  }, [roomName]);

  return (
    <div>
      <div ref={dailyParentElement} />
    </div>
  );
};
export default CallSession;
