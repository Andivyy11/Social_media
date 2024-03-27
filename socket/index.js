const io = require('socket.io')(8900 , {
    cors : {
        origin : "http://localhost:3000"
    }
})

//array to store all current users who are accessing chat in real-time
//  array format -->  [ { userId , socketId} ]
let users = []

const addUser = (userId,socketId)=>{
    !users.some(usr => usr.userId === userId ) && users.push({ userId , socketId})
}
const removeUser = (socketId) =>{
    users = users.filter(u => u.socketId !== socketId)
}
const getUser = (userId) =>{
    return users.find(u => u.userId === userId)
}

//  a new connection to frontEnd is made 
io.on('connection' , (socket)=>{
    console.log('a user connected ')

    socket.on("addUser" , (userId) =>{
        addUser(userId,socket.id)
        console.log('user ',userId)
        io.emit("getUsers" , users)
    })

    socket.on("sendMessage" , ({ senderId , receiverId ,text })=>{
        const user = getUser(receiverId)
        console.log('emiting message to ',receiverId)
        io.to(user.socketId).emit("getMessage" , { senderId , text })
    })

    // a user leaves frontEnd
    socket.on("disconnect" , ()=>{
        console.log('a user disconnected')
        removeUser(socket.id)
        io.emit("getUsers" , users)
    })
})


