import './topbar.css'
import {Search , Person, Notifications , Message} from '@mui/icons-material'
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import { Authcontext } from '../../context/AuthContext';

export default function Topbar()
{
    const {user} = useContext(Authcontext)
    // console.log('Admin name ',user.username , user.profilePicture)
    const PF=process.env.REACT_APP_PUBLIC_FPLDER
    return (
    <div className='topbarContainer'>
        <div className='topbarLeft'>
            <Link to="/" style={{textDecoration:"none"}}>
            <span className='logo'>AnidSocial</span>
            </Link>
        </div>
        <div className="topbarCenter">
           <div className='search'>
            <Search className='searchIcon'/>
            <input placeholder='Search for people, posts' />
            </div>
        </div>
        <div className='topbarRight'>
            <div className='topbarLinks'>
                <a href="/">Homepage</a>
                <a href="/">Timeline</a>
            </div>
            <div>
            <div className='topbarIconItem'>
                <Person />
                <span className='iconBadge'>1</span>
            </div>
            <div className='topbarIconItem'>
                <Notifications/>
                <span className='iconBadge'>1</span>
            </div>
            <div className='topbarIconItem'>
                <Link to="/messenger" >
                    <Message htmlColor='white'/>
                </Link>
                <span className='iconBadge'>1</span>
            </div>
            </div>
            <Link to={`/profile/${user.username}`} >
            <img src={ user.profilePicture ? PF+user.profilePicture : PF+"/assets/noAvatar.jpg"} alt="profile_pic"></img>
            </Link>
        </div>
    </div>);
}