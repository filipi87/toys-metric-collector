import React, { useEffect, useState, useRef } from 'react';
import { Redirect, useParams } from 'react-router';
import DailyIframe from '@daily-co/daily-js';
import { useCallContext } from '../../contexts/calls-context';

const CallSession = () => {
  const { eventId } = useParams();

  const [goHome, setGoHome] = useState(false);
  const [callFrame, setCallFrame] = useState(null);
  const dailyParentElement = useRef(null);
  const { dispatch } = useCallContext();

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

    frame.on('left-meeting', () => {
      dispatch({type:'setRoomInfo', value:undefined})
      setGoHome(true);
    });
    const start = async () => {
      //TODO need to retrieve the credentials in case of private conferences
      const roomInfo = { url: `https://filipi87.daily.co/${eventId}`}
      frame.join({
        url: roomInfo.url,
        //token: roomInfo.token,
      });
    };
    start();
  }, [eventId]);

  useEffect(() => {
    callFrame?.destroy();
  }, [goHome]);

  return (
    <div>
      {goHome ? <Redirect to="/home" /> : null}
      <div ref={dailyParentElement} />
    </div>
  );
};
export default CallSession;
