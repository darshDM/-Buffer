import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios'
// import './style/ThreadList.css'
export default function ThreadList(props){
    const [threads,setThreads] = useState([]);
    const {selectedServer} = props;
    const handleThreadChange = props.handleThreadChange
    
    useEffect(()=>{
        var threadList = [];
        if(selectedServer != undefined){
            axiosInstance
            .get(`v1/get-threads/${selectedServer.id}`).then((res) => {
                for (var i = 0; i < res.data.length; i++) {
                    threadList.push({id:res.data[i].id, title:res.data[i].title});
                }
                setThreads(threadList);
            })
        }   
    },[props])
    
    return <div className ="thread-list-main">
        <div className="channel-title">
            {selectedServer != undefined ? selectedServer.name : ""}
        </div>
        <div className="thread-list-super">
        <button  class="add-thread-button" type="submit">Create</button>
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