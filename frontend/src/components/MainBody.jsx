import ServerSideBar from './Body/ServerSideBar'
import ThreadList from './Body/ThreadList'
import Conversation from './Body/Conversation'
import { useState, createContext, useReducer, useEffect } from 'react'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import CreateThread from './Body/CreateThread'
import axiosInstance from '../helper/axios'
import Split from 'react-split'
import MyEditor from './Body/Editor'
export const ServerContext = createContext();
export const ThreadContext = createContext();
const socket = new W3CWebSocket(`ws://localhost:8000/ws/api/?token=${localStorage.getItem("access_token")}`)

function MainBody() {
  const [createThread, handleCreateThread] = useState(false)
  const [server, setServer] = useState(null)
  const [thread, setThread] = useState(null)
  const [threads, setThreads] = useState([])
  const [messegeObject, setMessegeObject] = useState(null)
  const [loading,setLoading] = useState(false);
  const handleServerChange = (serv) => {
    setServer(serv);
    let threadList = [];
    setLoading(true);
  
    axiosInstance
      .get(`v1/get-threads/${serv.id}`).then((res) => {
        setLoading(false);
        for (var i = 0; i < res.data.length; i++) {
          if(i == 0)setThread({ id: res.data[i].id, title: res.data[i].title });
          threadList.push({ id: res.data[i].id, title: res.data[i].title });
        }
        setThreads(threadList);
      })
      
  }
  const handleThreadChange = (thrd) => {
    setThread(thrd)
    handleCreateThread(false);
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
      server:server.name,
    }))
  } 

  socket.onmessage=(res)=>{
    if(JSON.parse(res.data).server == server){
      setMessegeObject({"username":JSON.parse(res.data).username, "messege":JSON.parse(res.data).message})
      console.log(res.data);
    }
  }
  return (

    <div className="flex flex-row w-full overflow-hidden bg-gray-900">
      <ServerContext.Provider value={{ server: server}}>
        <ThreadContext.Provider value={{ threads: threads, setThreads:setThreads}}>
          <ServerSideBar handleServerChange={handleServerChange}/>
          
          <ThreadList loading={loading} threads={threads} handleThreadChange= {handleThreadChange} handleCreateThread={handleCreateThread} />
          
          {createThread == true ? <CreateThread handleThreadChange={handleThreadChange} /> :
          <Split cursor="col-resize" minSize={400} gutterSize={5} style={{width:"100%", display:"flex", flexFlow:"row"}}>
            <Conversation messegeReceived = {messegeObject} selectedThread = {thread} sendMessage={sendMessage}  />
            <MyEditor/>
          </Split>}
        </ThreadContext.Provider>
      </ServerContext.Provider>
    </div>

  );
}

export default MainBody;
