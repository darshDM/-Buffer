import React from 'react'
export default function Message(props){
    return <div className="messege-super">
        
        <div className="profilePic" style={{"backgroundImage":`url(${props.profilePic})`}} > </div>
        <div className="username">{ props.username }</div>
        <div className="messege">{ props.messege }</div>
    </div>
}