import React,{useState,useEffect,useRef} from 'react'
import {io} from 'socket.io-client'
import { v4 as uuid } from 'uuid';


const OnlineUsers = () => {
    const [users,setUsers]=useState([])
    const socket =useRef()
    const userId=useRef()
   

useEffect(() =>{
    userId.current = uuid();
  socket.current= io('ws://localhost:8900')
  socket.current.emit("addUser",userId.current )
 
},[])
   
    useEffect(() => {
        socket.current.on("getUsers",socketUsers=>{setUsers(socketUsers)
        console.log(socketUsers)})
   socket.current?.on('welcome', (msg) => console.log(msg))
    },[socket])
  return (
      <>
    <div>SocketTest</div>
    <div>Users</div>
  <ul>
     { users.length>0 && users.map(user=><li key={user.id  }>{user.id}</li>) }
  </ul>
    </>
  )
}

export default OnlineUsers