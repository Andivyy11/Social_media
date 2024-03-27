import { useEffect ,useState} from 'react';
import './online.css'
import axios from 'axios';

export const Online = ({userId}) =>{

    const [user , setUser] = useState();
    useEffect(()=>{
        const fetchUserDetails = async ()=>{
            const res = await axios.get('/user/getById/'+userId)
            setUser(res.data)
        }
        fetchUserDetails();
    },[userId])

    return (
    <div className='online'>
    {  user && 
       <>
        <div className='onlineImage'>
            <img src={user.profilePicture ? user.profilePicture : "/assets/noAvatar.jpg"} alt="proflie_pic" />
            <span className='onlineBadge'></span>
        </div>
        <span>{user.username}</span>
        </>  }
    </div>
    )
}