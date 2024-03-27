import './feed.css'
import Sharepost from '../sharePost/sharepost'
import Post from '../post/Post'
import React, { useContext } from 'react' 
import axios from 'axios'
import { Authcontext } from '../../context/AuthContext'

export default function Feed( {username} )
{
    const [post,setPost]= React.useState([])
    const {user} = useContext(Authcontext)

    React.useEffect( ()=>{
        const fetchedPosts = async ()=> {
            try{
            let allPosts=[]
            if(username)
                allPosts=await axios.get("/post/allPosts/"+username.username);
            else
                allPosts=await axios.get("/post/timeline/"+user._id);
            setPost(allPosts.data.sort((p1,p2)=>{
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }));
        }
        catch(error)
        {
            
        }
    }
        fetchedPosts();
        },[username,user]);

    return (
        <div className='feedContainer'>
            { !username && <Sharepost/>}
            {
                post.map( d => {
                    return (
                        <Post 
                            key={d._id}
                            post={d}
                        />
                    )
                })
            }
            { username && post.length === 0 && <div className='noPostText'><p>{username.username} has not posted yet</p></div>}
        </div>
    )
}