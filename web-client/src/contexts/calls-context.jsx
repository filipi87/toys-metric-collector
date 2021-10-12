import React from 'react';
import axios from 'axios'

const CallsContext = React.createContext();

const initialState = {
  roomInfo: undefined,
};

const callReducer = (state, action) => {
  switch (action.type) {
    case 'setRoomInfo': {
      return { roomInfo: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const CallProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(callReducer, initialState);
  const dispatchCreateRoom = async (roomName) => {
    console.log('Will create new room:', roomName)
    const response = await axios.post('/calls/v1/rooms', {roomName})
    const roomInfo = response.data
    dispatch({type:'setRoomInfo', value:roomInfo})
  }
  const value = { state, dispatch, dispatchCreateRoom };
  return <CallsContext.Provider value={value}>{children}</CallsContext.Provider>;
}

const useCallContext = () => {
  const context = React.useContext(CallsContext);
  return context;
}

export { CallProvider, useCallContext };
