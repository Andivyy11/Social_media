import { useState ,useEffect} from 'react'
import './message.css'
import axios from 'axios'

export const Message = ( {mssg , currUserId}) =>{
    const align = mssg.senderId === currUserId ? "right" : "left"
    const [sender , setSender] =useState()

    useEffect(()=>{
         const fetchSender = async ()=>{
            const result = await axios.get('/user/getById/'+mssg.senderId)
            setSender(result.data)
         }
         fetchSender();
    } , [mssg._id])
    return (
        <div className={`message ${align}`} key={mssg._id}>
           <img src={sender !== undefined ? sender.profilePicture : "/assets/noAvatar.jpg"} alt="profile" />  
            <div className={`messageBody ${align}`}>
                <p>{mssg.text}</p>
                <span>5 min ago</span>
            </div>
        </div>
    ) 
}