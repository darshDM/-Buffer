import Box from '@material-ui/core/Box'
import ServerSideBar from './Body/ServerSideBar'
import ThreadList from './Body/ThreadList'
import Conversation from './Body/Conversation'
import { useState } from 'react'
import {w3cwebsocket as W3CWebSocket} from 'websocket'
import {useEffect } from 'react'

const socket = new W3CWebSocket(`ws://localhost:8000/ws/api/?token=${localStorage.getItem("access_token")}`)
function MainBody() {
  
  const [server,setServer] = useState(undefined)
  const [thread,setThread] = useState(undefined) 
  const [messegeObject,setMessegeObject] = useState(undefined)
  const handleServerChange = (serv) =>{
    setServer(serv)
    setThread(undefined)
  }
  const handleThreadChange = (thrd) =>{
    setThread(thrd)
  }
  socket.onopen=()=>{
    socket.send(JSON.stringify({
      command:"initial",
      // message:message,
      // server:server,
    }))
  }
  const sendMessage = (message)=>{
    socket.send(JSON.stringify({
      command:"chat_message",
      message:message,
      server:server,
    }))
  } 
  
  socket.onmessage=(res)=>{
    if(JSON.parse(res.data).server == server){
      setMessegeObject({"username":JSON.parse(res.data).username, "messege":JSON.parse(res.data).message})
    }
  }
  return (
    <Box display="flex" flexDirection="row" className="App">
      <ServerSideBar handleServerChange = {handleServerChange} />
      <ThreadList selectedServer = {server} handleThreadChange={handleThreadChange} />
      <Conversation messegeReceived = {messegeObject} selectedThread = {thread} sendMessage={sendMessage} />
    </Box>
  );
}
export default MainBody;
