import React, { useState, useEffect,useContext } from 'react';
import axiosInstance from '../../helper/axios'
import Modal from 'react-modal';
import {ServerContext, ThreadContext} from '../MainBody'
Modal.setAppElement('#root')
export default function ThreadList(props){
    // const [threads,setThreads] = useState(props.threads);
    const server = useContext(ServerContext).server
    const threads = useContext(ThreadContext).threads
    const handleThreadChange = props.handleThreadChange;
    const {loading} = props;
    const current = useContext(ServerContext);
    const selectedServer = current.server

    const customStyle = {
        content: {
            backgroundColor: 'rgba(255,255,255,0)',
            marginTop: '2.5rem',
            marginBottom: '2.5rem',
            padding: '0px',
            border: '0px',
        },
        overlay: {
            backgroundColor: 'rgba(255, 255, 255, 0.25)'
        }

    }
    const handleSubmit = (e) =>{

    }
    return <div className ="thread-list-main">
        <div className="channel-title">
            {selectedServer != undefined ? selectedServer.name : ""}
        </div>
        <div className="thread-list-super">
        {loading == true?"loading...":""}
        {selectedServer != null ? <button class="add-thread-button" type="submit" onClick={()=>props.handleCreateThread(true)}>Create</button> : ""}
            <div className="thread-list">
            {
                threads.map((item)=>{
                    return <div key={item.id} className="thread-item" onClick={()=>handleThreadChange(item)}>{item.title}</div>
                })
            }
            </div>
        </div>
    </div>
}