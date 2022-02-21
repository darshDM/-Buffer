import React, { useState, useEffect } from 'react'
import axiosInstance from '../../helper/axios';
import Message from './Message'

import { PaperAirplaneIcon } from '@heroicons/react/outline';
import { PlusCircleIcon } from '@heroicons/react/outline'
const messegeList = [];
export default function Conversation(props) {
    const sendMessage = props.sendMessage
    const messegeReceived = props.messegeReceived
    const selectedThread = props.selectedThread
    const [messegeListState, setMessegeListState] = useState([])
    const messegeList = []
    useEffect(() => {
        if (selectedThread != undefined) {
            axiosInstance.get(`v1/get-thread-messages/${props.selectedThread.id}`).then((res) => {
                for (var i = 0; i < res.data.length; i++) {
                    messegeList.push({ "profilePic": res.data[i].sender.profilePic, "username": res.data[i].sender.username, "messege": res.data[i].message });
                }
                setMessegeListState(messegeList);
            })
        }
    }, [props.selectedThread])
    const [messageField, setMessageField] = useState(undefined)
    if (messegeReceived != undefined) {
        messegeList.push({ "username": messegeReceived.user, "messege": messegeReceived.messege })
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
                    return <Message profilePic={profilePic} username={item.username} messege={item.messege}></Message>
                })
            }

        </div>
        <form className="max-w-full">
            {/* <div class="message-input flex flex-row">
                <input className="input-message" name="email" placeholder="Message" onChange={handleChange} type="email" id="email" ></input>
                <PaperAirplaneIcon onClick={handleSubmit} className="send-button" type="submit">Send</PaperAirplaneIcon>
            </div> */}
            <div class="w-auto mb-3 mx-3 pt-3 flex flex-row rounded place-content-around bg-gray-800 ">
                <div className="flex flex-col w-5/6">
                    <label class="block text-gray-200 text-sm w-3/4 font-bold mb-2 ml-3">Message</label>
                    <div className="flex flex-row max-w-full">
                        <PlusCircleIcon className='w-8 h-8 p-1 mb-2 ml-1.5 hover:bg-gray-900 rounded-lg justify-self-center '></PlusCircleIcon>
                        <input name="title" type="text" id="title" class="bg-gray-800 max-w-full rounded text-gray-200 focus:outline-none  focus:border-purple-600 transition duration-300 px-3 pb-3"></input>
                    </div>
                </div>
                <PaperAirplaneIcon onClick={handleSubmit} className="send-button mt-3 p-1" type="submit">Send</PaperAirplaneIcon>
            </div>
        </form>
    </div>
}