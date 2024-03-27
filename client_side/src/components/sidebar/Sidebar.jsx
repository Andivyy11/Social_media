import './sidebar.css'
import {Feed, Chat,Group, Bookmark, Videocam,QuestionMark,Event,Work,School} from '@mui/icons-material'
import { useContext, useEffect, useState } from 'react'
// import {user} from '../../dummyData'
import axios from 'axios'
import { Authcontext } from '../../context/AuthContext'
import { Link } from 'react-router-dom';

export default function Sidebar()
{
    const [popular , setPopular] =useState([])
    const { user } = useContext(Authcontext)
    useEffect(()=>{
        const fetchList = async ()=>{
            try{
               let list=[];
               list=await axios.get('/user/getRecommendedUser/'+user._id);
               setPopular(list.data);
            }
            catch(error)
            {}
        }
        fetchList();
    } , [user])
  return (
    <div className='sidebarContainer'>
        <div className='sidebarWrapper'>
            <ul>
                <li>
                    <Feed/>
                    <span>Feed</span>
                </li>
                <li>
                    <Chat/>
                    <span>Chats</span>
                </li>
                <li>
                    <Videocam />
                    <span>Videos</span>
                </li>
                <li>
                    <Group/>
                    <span>Groups</span>
                </li>
                <li>
                    <Bookmark/>
                    <span>Bookmarks</span>
                </li>
                <li>
                    <QuestionMark />
                    <span>Questions</span>
                </li>
                <li>
                    <Work/>
                    <span>Work</span>
                </li>
                <li>
                   <Event/>
                   <span>Events</span>
                </li>
                <li>
                    <School/>
                    <span>Courses</span>
                </li>
            </ul>
            <button>Show more</button>
            <hr></hr>
            <h3>Recommended Users</h3>
            <ul>
                {
                    popular.map( u => {
                        return (
                            <li key={u._id}>
                            <Link to={`/profile/${u.username}`}>
                                <img src={u.profilePicture ? u.profilePicture : "/assets/noAvatar.jpg"} alt="profile_pic"></img>
                            </Link>   
                                <span>{u.username}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    </div>
  )
}