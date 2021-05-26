import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios'
import List from '@material-ui/core/List/List'
import Box from '@material-ui/core/Box/Box'
import './style/ThreadList.css'
export default function ThreadList(props){
    const [threads,setThreads] = useState([]);
    const {selectedServer} = props;
    
    useEffect(()=>{
        var threadList = [];
        if(selectedServer != undefined){
            axiosInstance
            .get(`v1/get-threads/${selectedServer}`).then((res) => {
                for (var i = 0; i < res.data.length; i++) {
                    threadList.push(res.data[i].title);
                }
                setThreads(threadList);
            })
        }   
    },[props])

    return <Box className ="box_2"display="flex" flexDirection="column">
        <List className="thread__main"> {
            threads.map((item,index)=>{
                return <div key={index} className="threadItem">{item}</div>
            })
        }
        </List>
    </Box>
}