import React, { useEffect, useState, useRef } from 'react';
import { Redirect, useParams } from 'react-router';
import DailyIframe from '@daily-co/daily-js';
import { useCallContext } from '../../contexts/calls-context';

import { useHistory } from 'react-router-dom';
import { HOME } from '../../router/router-constants';

const CallSession = () => {
  const { roomId } = useParams();
  const history = useHistory();

  const [callFrame, setCallFrame] = useState(null);
  const dailyParentElement = useRef(null);
  const { dispatch, dispatchDeleteRoom, state, dispatchStats } = useCallContext();

  const sendNetworkStats = async () => {
    const localParticipant = callFrame.participants().local
    const userInfo = {id: localParticipant.user_id, name:localParticipant.user_name}
    let networkStats = await callFrame.getNetworkStats()
    const {videoRecvBitsPerSecond, videoRecvPacketLoss, videoSendBitsPerSecond, videoSendPacketLoss} =  networkStats?.stats?.latest
    dispatchStats({
      userInfo,
      stats: { videoRecvBitsPerSecond, videoRecvPacketLoss, videoSendBitsPerSecond, videoSendPacketLoss }
    })
  }

  const onLeftMeeting = () => {
    dispatch({type:'setRoomInfo', value:undefined})
    dispatchDeleteRoom(state.roomInfo.roomId)
    callFrame?.destroy()
    history.push(HOME);
  }

  //used for loading data when accessing directly by the link
  useEffect(() => {
    console.log('roomId', roomId)
  }, [roomId]);

  useEffect(() => {
    if(!callFrame){
      return
    }
    const interval = setInterval(() => {
      sendNetworkStats();
    }, 15000);
    return () => clearInterval(interval);
  }, [callFrame]);

  useEffect(() => {
    if(!state.roomInfo){
      return
    }
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
