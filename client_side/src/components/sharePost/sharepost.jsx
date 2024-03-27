import {Label, LocationOn , EmojiEmotions ,PermMedia, Cancel} from '@mui/icons-material'
import './sharepost.css'
import { useContext , useState} from 'react';
import { Authcontext } from '../../context/AuthContext';
import axios from 'axios';

export default function Sharepost()
{
    const PF=process.env.REACT_APP_PUBLIC_FPLDER;
    const {user} = useContext(Authcontext)

    const [postText , setPostText]= useState("");
    const [file , setFile] = useState("")
    const sendPost= async ()=>{
          if(postText !== "" || file !== "")
          {
            try{
                await axios.post(`/post` ,{ userId : user._id , description : postText , img: "/assets/Post/"+file})
                window.location.reload();
            }
            catch(error)
            {
                console.log("error while posting...")
            }
            setPostText("")
            setFile("")
          }
    }
     return(
        <div className="sharepostContainer">
           <div className="shareTop">
              <img src={ user.profilePicture ? PF+user.profilePicture : PF+"/assets/noAvatar.jpg"} alt="profilr_pic"></img>
              <input placeholder="What's on your mind?" onChange={(e)=>setPostText(e.target.value) } value={postText}></input>
           </div>
           <hr></hr>
           <div className="shareBottom">
           { file && 
           <div className='shareImgContainer'>
                <Cancel className='cancelbtn' onClick={()=>setFile("")}/>
                <img src={"/assets/Post/"+file} alt="shareImg"/>
           </div>}
           <div className='shareOptions'>
                <label htmlFor='file' className='shareIcons'>
                    <PermMedia htmlColor='tomato'/>
                    <span>Photo Video</span>
                    <input type="file" accept="png,jpg,jpeg" id="file" onChange={(e)=> setFile(e.target.files[0].name)}></input>
                </label>
                <div className='shareIcons'>
                    <Label htmlColor='blue'/>
                    <span>Labels</span>
                </div>
                <div className='shareIcons'>
                    <LocationOn htmlColor='red'/>
                    <span>Location</span>
                </div>
                <div className='shareIcons'>
                    <EmojiEmotions htmlColor='goldenrod'/>
                    <span>Feelings</span>
                </div>
            </div>
            <button onClick={sendPost}>Share</button>
            </div>
        </div>
     )
}