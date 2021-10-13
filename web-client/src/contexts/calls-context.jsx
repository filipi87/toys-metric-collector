import React from 'react';
import axios from 'axios'

const CallsContext = React.createContext();

const initialState = {
  roomInfo: undefined,
  rooms: []
};

const callReducer = (state, action) => {
  switch (action.type) {
    case 'setRoomInfo': {
      return { roomInfo: action.value };
    }
    case 'setRooms': {
      return { rooms: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const createAsyncFunctions = (dispatch, state) => {
  const dispatchCreateRoom = async (roomId) => {
    console.log('Create new room:', roomId)
    const response = await axios.post('/calls/v1/rooms', {roomId})
    const roomInfo = response.data
    dispatch({type:'setRoomInfo', value:roomInfo})
  }
  const dispatchGetRoom = async (roomId) => {
    console.log('Get room:', roomId)
    const response = await axios.get(`/calls/v1/rooms/${roomId}`)
    const roomInfo = response.data
    dispatch({type:'setRoomInfo', value:roomInfo})
  }
  const dispatchGetRooms = async (roomId) => {
    console.log('Get rooms:', roomId)
    const response = await axios.get(`/calls/v1/rooms`)
    const rooms = response.data
    dispatch({type:'setRooms', value:rooms})
  }
  const dispatchDeleteRoom = async (roomId) => {
    console.log('Delete room:', roomId)
    await axios.delete(`/calls/v1/rooms/${roomId}`)
    dispatch({type:'setRoomInfo', value:undefined})
  }
  const dispatchStats = async (roomId, videoStats) => {
    console.log('Statistics:', videoStats)
    await axios.post(`/calls/v1/rooms/${roomId}/stats`, videoStats)
  }
  return { dispatchCreateRoom, dispatchDeleteRoom, dispatchStats, dispatchGetRoom, dispatchGetRooms }
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
