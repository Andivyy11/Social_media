import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import './profile.css'
import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Profile() 
{
    const [user, setUser] = React.useState({});
    const username = useParams().username;

    React.useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/user/getByName/${username}`);
      setUser(res.data);
    };
    fetchUser();
    }, [username]);
    const PF=process.env.REACT_APP_PUBLIC_FPLDER;
    return (
        <div>
            <Topbar />
            <div className='profilePage' >
                <Sidebar />
                <div className='rightSection'>
                    <div className='rightTop'>
                        <div className='profilePictures'>
                            <img src={user.coverPicture ? PF+user.coverPicture: PF+"/assets/noCover.jpg"} alt="cover" className='cover'></img>
                            <img src={ user.profilePicture ? PF+user.profilePicture : PF+"/assets/noAvatar.jpg"} alt="profile" className='profilePic'></img>
                        </div>
                        <div className='profileText'>
                            <h2>{user.username}</h2>
                            <span>hello friends 👋🏻</span>
                        </div>
                    </div>
                    <div className='rightBottom'>
                        <Feed username={user}/>
                        <Rightbar usr={user}/>
                    </div>
                </div>
            </div>
        </div>
    )
}