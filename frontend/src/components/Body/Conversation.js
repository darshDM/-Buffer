import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import './style/Conversation.css'
import Message from './Message'
const messegeList = [];
export default function Conversation(props){
    const sendMessage = props.sendMessage
    const messegeReceived = props.messegeReceived
    const [messageField,setMessageField] = useState(undefined)
    // if(messegeReceived != undefined){
    //     messegeList.push({"username":messegeReceived.username,"messege":messegeReceived.messege})
    // }
    const handleChange = (e) =>{
        const messageGot = e.target.value.trim()
        if(messageGot != '' && messageGot != undefined){
            setMessageField(messageGot)
        }
    } 
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(messageField != '' && messageField != undefined){
            sendMessage(messageField)
        }
        setMessageField("")
        document.querySelector('#message_input').value = "";
    }
    return <Box display="flex" flexDirection="column" justifyContent="flex-end">
        <Box id = "messege_history">
            {
                messegeList.map((item)=>{
                    return <Message username={item.username} messege={item.messege}></Message>
                })
            }
        </Box>
        <form>
        <Box id ="user_input" display="flex" flexDirection="row">
            <TextField
                variant="outlined"
                size="small"
                id="message_input"
                label="message"
                name="email"
                fullWidth
                onChange={handleChange}
                margin="normal"
            />
            <Button
                id= "submit_button"
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
            send
            </Button>
        </Box>
        </form>
    </Box>
}