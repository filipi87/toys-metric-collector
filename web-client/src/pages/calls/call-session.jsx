import React, { useEffect, useState, useRef } from 'react';
import { Redirect, useParams } from 'react-router';
import DailyIframe from '@daily-co/daily-js';
import styles from './call-session.css';

const CallSession = () => {
  const { eventId } = useParams();

  const [goHome, setGoHome] = useState(false);
  const [callFrame, setCallFrame] = useState(null);
  const dailyParentElement = useRef(null);

  useEffect(() => {
    const frame = DailyIframe.createFrame(dailyParentElement.current, {
      showLeaveButton: true,
      showFullscreenButton: true,
      iframeStyle: {
        position: 'fixed',
        width: '100%',
        height: '100%',
      },
    });
    setCallFrame(frame);

    frame.on('left-meeting', () => {
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
  }, []);

  useEffect(() => {
    callFrame?.destroy();
  }, [goHome]);

  return (
    <div className={styles.CallSession}>
      {goHome ? <Redirect to="/home" /> : null}
      <div ref={dailyParentElement} />
    </div>
  );
};
export default CallSession;
