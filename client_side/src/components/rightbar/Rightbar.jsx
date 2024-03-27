import { useContext, useEffect, useState} from 'react';
import './rightbar.css'
import axios from 'axios';
import { Authcontext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Remove , Add} from '@mui/icons-material'
export default function Rightbar({usr})
{
    const PF=process.env.REACT_APP_PUBLIC_FPLDER;
    const { user , dispatch } =useContext(Authcontext)
    const [friendList ,setFriendList] = useState([])
    const [followed, setFollowed] = useState(user.following.includes(usr?._id));

    useEffect(()=>{
        const fetchFriends = async ()=>{
           const result= await axios.get(`/user/getFriends/${usr?._id ? usr._id : user._id}`)
           setFriendList(result.data)
        }
        fetchFriends();
        console.log('updating user friendlist', friendList)
    },[usr?._id, user._id,followed])

    useEffect(()=>{
        setFollowed(user.following.includes(usr?._id))
    } , [usr?._id,user?._id])

    const handleClick = async () => {
        try {
          if (followed) {
            console.log('unfollowing this user calling api...')
            await axios.put(`/user/${usr._id}/unfollow`, {
              userId: user._id, 
            });
            dispatch({ type: "UNFOLLOW", payload: usr._id });
          } else {
            console.log('following this user calling api...')
            await axios.put(`/user/${usr._id}/follow`, {
              userId: user._id,
            });
            dispatch({ type: "FOLLOW", payload: usr._id });
        }
          setFollowed(!followed);
        } catch (err) {
            console.log('error in handle click ')
        }
      };
    

    const Birthday= ()=>{
            return (
            <div className='birthdays'>
                <img src={PF+"/assets/gift.png"} alt="gift"></img>
                <span>Lisa and 3 others have a birthday today.</span>
            </div>
            )
    }
    const Advertisement = ()=>{
          return (
            <div className='advertise'>
                <img src={PF+"/assets/advertisement.webp"} alt="ad"></img>
            </div>
          )
    }
    const UserFriends = () =>{

        return (
            <div className='friendSection'>
                { friendList.length !==0 ?  
                <div>
                    <h2>Friends</h2>
                    <div className='userFriends'>
                    {  
                        friendList.map(frnd =>{
                            return (
                                <div key={frnd._id}>
                                <Link to={`/profile/${frnd.username}`}>
                                   <img src={frnd.profilePicture ? PF+frnd.profilePicture : PF+"/assets/noAvatar.jpg"} alt="profile" />
                                </Link>   
                                   <span>{frnd.username}</span>
                                </div>)
                    })}
                   </div>
                </div>  : <span className='noFollowing'>{usr.username} is not following anyone </span> }
            </div>
           )
    }
    const ProfileComp = ()=>{
        return (
            <div>
                <h1 className='greet'>Hello! this is {usr.username}</h1>
                {usr.username !== user.username && (
                    <button id="followbtn" onClick={handleClick}>
                        {followed ? <>Unfollow<Remove /></> : <>Follow<Add /></>}
                    </button>
                )}
                <ul className="userBio">
                    <li>Followers : {usr.followers ? usr.followers.length : 0 }</li>
                    <li>Following : {usr.following ? usr.following.length : 0}</li>
                    <li>City : {usr.city || <span className='notUpdated'>Not updated</span>}</li>
                    <li>State : {usr.state || <span className='notUpdated'>Not updated</span>}</li>
                    <li>Realationship status : {usr.relationship ? usr.relationship : <span className='notUpdated'>Not updated</span>}</li>
                </ul>
                <UserFriends />
                <Birthday />
            </div>
        )
    }
    const HomePageComp=()=>{
        return (
            <div className='rightbarWrapper'>
                <Birthday/>
                <Advertisement/>
            </div>
        )
    }
    return (
        <div className='rightbarContainer'>
            { usr ? <ProfileComp/>:<HomePageComp/> }
        </div>
    )
}