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

const createAsyncFunctions = (dispatch, state) => {
  const dispatchCreateRoom = async (roomId) => {
    console.log('Will create new room:', roomId)
    const response = await axios.post('/calls/v1/rooms', {roomId})
    const roomInfo = response.data
    dispatch({type:'setRoomInfo', value:roomInfo})
  }
  const dispatchGetRoom = async (roomId) => {
    console.log('Room will be deleted:', roomId)
    const response = await axios.get(`/calls/v1/rooms/${roomId}`)
    const roomInfo = response.data
    dispatch({type:'setRoomInfo', value:roomInfo})
  }
  const dispatchDeleteRoom = async (roomId) => {
    console.log('Room will be deleted:', roomId)
    await axios.delete(`/calls/v1/rooms/${roomId}`)
    dispatch({type:'setRoomInfo', value:undefined})
  }
  const dispatchStats = async (videoStats) => {
    console.log('dispatchStats:', videoStats)
    // TODO implement the server to receive the statistics
    //const response = await axios.post('/calls/v1/rooms', {roomId})
  }
  return { dispatchCreateRoom, dispatchDeleteRoom, dispatchStats, dispatchGetRoom }
}

const CallProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(callReducer, initialState);
  const asyncFunctions = createAsyncFunctions(dispatch, state)
  const value = { state, dispatch, ...asyncFunctions };
  return <CallsContext.Provider value={value}>{children}</CallsContext.Provider>;
}

const useCallContext = () => {
  const context = React.useContext(CallsContext);
  return context;
}

export { CallProvider, useCallContext };
