import React from 'react'
export default function Message(props){
    return <div className="flex flex-row m-1 p-2 hover:bg-gray-800 rounded">
        
        <div className="w-8 h-8 bg-contain rounded-3xl align-middle" style={{"backgroundImage":`url(${props.profilePic})`}} > </div>
        <div className="flex flex-col ml-2">
        <div className="text-purple-400 text-bold ml-1">{ props.username }</div>
        <div className="text-white ml-1">{ props.messege }</div>
        </div>
    </div>
}