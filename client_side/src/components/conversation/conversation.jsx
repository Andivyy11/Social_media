import { useContext, useState ,useEffect } from 'react';
import './conversation.css'
import { Link } from 'react-router-dom'
import { Authcontext } from '../../context/AuthContext';
import axios from 'axios'

export const Conversation = ({conversation , openChat })=>{
    const { user } = useContext(Authcontext)
    const PF=process.env.REACT_APP_PUBLIC_FPLDER;
    const [receiver , setReceiver] = useState()

    useEffect(() => {
    const receiverId = conversation.members[0] !== user._id ? conversation.members[0] : conversation.members[1]; 
        
        // get the document of receiver to display in conversation section
        const getUser = async () => {
          try {
            const res = await axios.get("/user/getById/" + receiverId);
            setReceiver(() => res.data);

          } catch (err) {
            console.log(err);
          }
        };
        getUser();
      }, []);
    
    return (
        <div className='chatFriends' onClick={openChat} key={conversation._id}>
        {
            receiver !== undefined && (  <><Link to={`/profile/${receiver.username}`}>
                <img src={receiver.profilePicture ? PF+receiver.profilePicture : PF+"/assets/noAvatar.jpg"} alt="profile" />
            </Link>   
            <span>{receiver.username}</span> </>)
        }
        </div>
    )
}