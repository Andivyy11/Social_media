import { useContext ,useState, useEffect ,useRef} from 'react'
import './messenger.css'
import Topbar from '../../components/topbar/Topbar'
import { Authcontext } from '../../context/AuthContext'
import axios from 'axios'
import { Message } from '../../components/message/message'
import { Send } from '@mui/icons-material'
import { Conversation } from '../../components/conversation/conversation'
import { io } from 'socket.io-client'
import { Online } from '../../components/onlineFriends/online'

export const Messenger = () => {
    const { user } =useContext(Authcontext)
    const [AllConversations , setConversations] = useState([])
    const [currConversation , setCurrConversation] = useState()
    const [chat , setChat] = useState()
    const [newMssg , setNewMssg] = useState()
    const [onlineFriends , setOnlineFriends] =useState([]);
    const scrollRef = useRef();
    // const message = useRef();
    const [ message , setMessage] = useState()
    const socket = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
          setNewMssg({
            senderId: data.senderId,
            text: data.text,
            createdAt: Date.now(),
          });
        });
      }, []);
    
      useEffect(() => {
        newMssg &&
          currConversation?.members.includes(newMssg.senderId) &&
          setChat((prev) => [...prev, newMssg]);
      }, [newMssg]);
    
      useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
           
            const online =  user.following.filter((f) => users.some((u) => u.userId === f))
          setOnlineFriends(online);
        });
      }, [user]);


    //retrieve all conversations of current user to show in left section
      useEffect(() => {
        const getConversations = async () => {
          try {
            const res = await axios.get("/conversation/" + user._id);
            setConversations(res.data);
          } 
          catch (err) {
            console.log(err);
          }
        };
        getConversations();
      }, [user._id]);
    
  //trigger on click 
  //get all chats of a conversation
  const setChatSection = async (conversation) =>{
      try{
       setCurrConversation(conversation)
       const res = await axios.get('/message/'+conversation._id)
       setChat(res.data)
      }
      catch(err)
      {
        console.log(err)
      }
  }  
  
  const sendMssg = async ()=>{
    console.log('current conv ',currConversation);
    const newMssg = {
      senderId: user._id,
      text: message,
      conversationId: currConversation._id,
    };
  
    const receiverId = currConversation.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: message,
    });
    try {
      const res = await axios.post("/message", newMssg);
      setChat([...chat , res.data])
    } 
    catch (err) {
      console.log(err);
    }
    setMessage("");
    }

    useEffect(()=>{
      scrollRef.current?.scrollIntoView({behaviour : "smooth"})
    } ,[chat])

    return (
        <div>
          <Topbar />
          <div className='container'>
            <div className='friendSection'>
              <input type="text" placeholder='Search for friends'/>
              {   AllConversations.map(c =>{ return  (
                  <Conversation 
                    conversation = {c} 
                    openChat={ () => setChatSection(c) }
                  /> ) })}
            </div>
            <div className='chatSection'>
              <div className='chatLog'>
              {
                !chat ? <h1 className='greyText'>Select people to see your chats</h1>: chat.length === 0 ? <h1 className='greyText'>Start chat</h1> : chat.map(c =>{
                return (
                  <div ref={scrollRef} className='mssgBox'>
                    <Message 
                      mssg = {c}
                      currUserId ={user._id}
                    />
                  </div>
                )})
              }
              </div>
              { 
                currConversation && ( 
                  <div className='typeBox'>
                    <textarea placeholder='Type message' value={message} onChange={(e)=>setMessage((e.target.value))}/>
                    <button onClick={sendMssg}><Send/></button>
                  </div> ) }
            </div>
            <div className='onlineSection'>
              <h1>Online Users</h1>
                { onlineFriends.length === 0 ? <h2 className='greyText'>No one is online</h2> : 
                  onlineFriends.map(u =>{
                  return (
                    <Online
                      userId = {u}
                    />
                  )
                })}
            </div>
          </div>
      </div> 
    )
}