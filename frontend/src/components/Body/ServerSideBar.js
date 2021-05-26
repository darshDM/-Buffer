import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import axiosInstance from '../../axios';
import './style/ServerSideBarStyle.css'
import ThreadList from './ThreadList'

export default function ServerSideBar(props) {
    var serverList = [];
    const handleServerChange = props.handleServerChange
    const [serverListState,setServerListState] = useState([])
    //const [currServer,setCurrServer] = useState();
    useEffect(() => {
        axiosInstance
            .get(`v1/my-server-list`).then((res) => {
                for (var i = 0; i < res.data.length; i++) {
                    serverList.push(res.data[i].name);
                }
                setServerListState(serverList);
            })
    },[])
    return <Box className ="box_1" display="flex" flexDirection="row">
        <List className="list__main">
        {
            serverListState.map((item,index)=>{
                return <div className="ListItem" onClick={()=>handleServerChange(item)} key={index}>{item}</div>
            })
        }
            
        </List>
        {/* <ThreadList server = {currServer} /> */}
    </Box>
}