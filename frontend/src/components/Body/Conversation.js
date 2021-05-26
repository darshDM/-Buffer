import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
export default function Conversation(props){
    // console.log(props.message)
    const sendMessage = props.sendMessage
    const [messageField,setMessageField] = useState(undefined)
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
    }
    return <>
        <form>
        <TextField
		    variant="outlined"
            size="small"
            id="message"
            label="message"
            name="email"
            fullWidth
            onChange={handleChange}
            margin="normal"
        />
        <Button
			type="submit"
			fullWidth
			variant="contained"
			color="primary"
			// className={classes.submit}
			onClick={handleSubmit}
		>
		send
		</Button>
        </form>
    </>
}