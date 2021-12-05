import React, { useState, useEffect } from 'react'
import axiosInstance from './../../axios';
// import './style/Conversation.css'
import Message from './Message'
import { PaperAirplaneIcon } from '@heroicons/react/outline';
const messegeList = [];
export default function Conversation(props) {
    const sendMessage = props.sendMessage
    const messegeReceived = props.messegeReceived
    const selectedThread = props.selectedThread
    const [messegeListState,setMessegeListState] = useState([])
    const messegeList = []
    useEffect(()=>{
        if(selectedThread != undefined){
        axiosInstance.get(`v1/get-thread-messages/${props.selectedThread.id}`).then((res) => {
                for (var i = 0; i < res.data.length; i++) {
                   messegeList.push({"profilePic":res.data[i].sender.profilePic,"username":res.data[i].sender.username,"messege":res.data[i].message});
                }
                setMessegeListState(messegeList);
            })
        }
    },[props.selectedThread])
    const [messageField, setMessageField] = useState(undefined)
    if(messegeReceived != undefined){
        messegeList.push({ "username":messegeReceived.user,"messege":messegeReceived.messege})
    }
    const handleChange = (e) => {
        const messageGot = e.target.value.trim()
        if (messageGot != '' && messageGot != undefined) {
            setMessageField(messageGot)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (messageField != '' && messageField != undefined) {
            sendMessage(messageField)
        }
        setMessageField("")
        document.querySelector('#message_input').value = "";
    }

    return <div className="main-body">
        <div className="message-list" id="messege_history">
            {/* wef */}
            {
                
                messegeListState.map((item) => {
                    const profilePic = `http://localhost:8000${item.profilePic}/`
                    return <Message profilePic = {profilePic} username={item.username} messege={item.messege}></Message>
                })
            }
            
        </div>
        <form>
            <div class="message-input flex flex-row">
                <input className="input-message" name="email" placeholder="Message" onChange={handleChange} type="email" id="email" ></input>
                <PaperAirplaneIcon onClick={handleSubmit} className="send-button" type="submit">Send</PaperAirplaneIcon>
            </div>
        </form>
    </div>
}