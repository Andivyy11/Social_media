import './post.css';
import { Link } from 'react-router-dom';
import axios from 'axios'
// import TimeAgo from 'javascript-time-ago'
// import en from 'javascript-time-ago/locale/en'
import { MoreVert } from '@mui/icons-material'
import React, { useContext } from "react";
import { Authcontext } from '../../context/AuthContext';

export default function Post({post})   // post document
{
    const {user} = useContext(Authcontext)
    const [likes ,setLikes]= React.useState(post.likes.length);
    const [hearts,setHearts]=React.useState(post.hearts.length);
    const [isLiked ,setIsLiked] =React.useState(post.likes.includes(user._id));
    const [isHeart , setIsHeart]=React.useState(post.hearts.includes(user._id));
    const [postUser , setPostUser] =React.useState({});
    const PF =process.env.REACT_APP_PUBLIC_FPLDER;

// TimeAgo.addDefaultLocale(en)
// const timeAgo = new TimeAgo('en-US')

    React.useEffect(()=>{            // get document of user who posted this post
        const getUser= async ()=>{
            const postedBy=await axios.get(`/user/getById/${post.userId}`);
            setPostUser(postedBy.data)
        }
        getUser();
    },[post.userId])
    
    const deletePost =()=>{
        const func = async ()=>{
        try{
           await axios.delete(`/post/${post._id}` , {data : { "userId" : user._id} })
           window.location.reload();
        }
        catch(error){}
    }
    func();
    }
    return (
        <div className='postContainer'>
        <div className='postWrapper'>
            <div className='postTop'>
                <div>
                    <Link to={`/profile/${postUser.username}`}>
                        <img src={PF+postUser.profilePicture || PF+"/assets/People/p1.jpg"} alt="profile_pic"></img>
                    </Link>
                    <h4 className='username'>{postUser.username}</h4>
                    {/* <span className='postTime'>{timeAgo.format(new Date(postUser.created_At))}</span> */}
                </div>
                <div className='more'>
                    <MoreVert/>
                    <div className='postOptions'>
                        { post.userId === user._id && <span onClick={deletePost}>Delete</span> }
                        { post.userId !== user._id && <span>Save</span>}
                    </div>
                </div>
            </div>
            <div className='postMiddle'>
                <span className='postText'>
                    {post.description}
                </span>
                { post.img &&<img src={PF+post.img} alt="post_pic"></img>}
                
            </div>
            <div className='postBottom'>
                <div className='likeStats'>
                    <div>
                        <img src={isLiked ? PF+"/assets/like.jpg" : PF+"/assets/emptyLike.jpg"} alt="likes" onClick={()=>{
                            
                            setLikes(isLiked? likes-1 : likes+1);
                            setIsLiked(!isLiked)
                            axios.put(`/post/${post._id}/like` , { userId : user._id })
                        }}/>   
                        <span>{likes}</span>
                    </div>
                    <div>
                        <img src={isHeart ? PF+"/assets/heart.jpg": PF+"/assets/emptyHeart.jpg"} alt="hearts" onClick={()=>{
                               axios.put(`/post/${post._id}/heart` , { userId : user._id });
                               setHearts(isHeart ? hearts-1 : hearts+1);
                               setIsHeart(!isHeart)              
                }}/>
                        <span>{hearts}</span>
                    </div>
                </div>
                <div className='commentStats'>
                    <span>{post.comments ? post.comments : 0} comments</span>
                </div>
            </div>
            </div>
        </div>
    )
}