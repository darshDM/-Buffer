import { Box } from '@material-ui/core'
import React from 'react'
import './style/Message.css'
export default function Message(props){
    console.log("sdfsdfsdfsdf");    
    console.log(props)
    return <Box>
        <div className="username">{ props.username }</div>
        <div className="messege">{ props.messege }</div>
    </Box>
}