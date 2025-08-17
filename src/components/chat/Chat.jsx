// // import { use } from "react";
// import "./chat.scss";
// import { useContext, useState } from "react";
// import { format } from "timeago.js";
// import { AuthContext } from "../../context/AuthContext";
// import { apiRequest } from "../../lib/apiRequest";

// function Chat({ chats }) {
//   const [chat, setChat] = useState(false);
//   const [currentUser] = useContext(AuthContext);

//   const handleOpenChat = async (id, receiver) => {
//     try {
//       const res = await apiRequest("/chats/" + id);
//       setChat({ ...res.data, receiver });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   console.log(chats);

//   return (
//     <div className="chat">
//       <div className="messages">
//         <h1>Messages</h1>
//         {chats?.map((c) => (
//           <div
//             className="message"
//             key={c.id}
//             onClick={() => handleOpenChat(c.id, c.receiver)}
//             style={{
//               backgroundColor: c.seenBy.includes(currentUser.id)
//                 ? "white"
//                 : "#f0f0f0",
//             }}
//           >
//             <img src={c.receiver.avatar || "/noavatar.jpg"} alt="avatar" />
//             <span>{c.receiver.username}</span>
//             <p>{c.lastMessage}</p>
//           </div>
//         ))}
//       </div>

//       {chat && (
//         <div className="chatBox">
//           <div className="top">
//             <div className="user">
//               <img
//                 src={chat.receiver.avatar || "noavatar.jpg"}
//                 alt="User avatar"
//               />
//               {chat.receiver.username}
//               {/* {selectedUser} */}
//             </div>
//             <span className="close" onClick={() => setChat(null)}>
//               X
//             </span>
//           </div>

//           <div className="center">
//             {chat.messages.map((message) => (
//               <div className="chatMessage own" key={message.id}>
//                 <p>{message.text}</p>
//                 <span>{format(message.createdAt)}</span>
//               </div>
//             ))}
//           </div>

//           <div className="bottom">
//             <textarea></textarea>
//             <button>Send</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Chat;
// import { useContext, useEffect, useRef, useState } from "react";
// import "./chat.scss";
// import { AuthContext } from "../../context/AuthContext";
// import apiRequest from "../../lib/apiRequest";
// import { format } from "timeago.js";
// import { SocketContext } from "../../context/SocketContext";
// import { useNotificationStore } from "../../lib/notificationStore";

// function Chat({ chats }) {
//   const [chat, setChat] = useState(null);
//   const { currentUser } = useContext(AuthContext);
//   const { socket } = useContext(SocketContext);

//   const messageEndRef = useRef();

//   const decrease = useNotificationStore((state) => state.decrease);

//   useEffect(() => {
//     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

//   const handleOpenChat = async (id, receiver) => {
//     try {
//       const res = await apiRequest("/chats/" + id);
//       if (!res.data.seenBy.includes(currentUser.id)) {
//         decrease();
//       }
//       setChat({ ...res.data, receiver });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);
//     const text = formData.get("text");

//     if (!text) return;
//     try {
//       const res = await apiRequest.post("/messages/" + chat.id, { text });
//       setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
//       e.target.reset();
//       socket.emit("sendMessage", {
//         receiverId: chat.receiver.id,
//         data: res.data,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     const read = async () => {
//       try {
//         await apiRequest.put("/chats/read/" + chat.id);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     if (chat && socket) {
//       socket.on("getMessage", (data) => {
//         if (chat.id === data.chatId) {
//           setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
//           read();
//         }
//       });
//     }
//     return () => {
//       socket.off("getMessage");
//     };
//   }, [socket, chat]);

//   return (
//     <div className="chat">
//       <div className="messages">
//         <h1>Messages</h1>
//         {chats?.map((c) => (
//           <div
//             className="message"
//             key={c.id}
//             style={{
//               backgroundColor:
//                 c.seenBy.includes(currentUser.id) || chat?.id === c.id
//                   ? "white"
//                   : "#fecd514e",
//             }}
//             onClick={() => handleOpenChat(c.id, c.receiver)}
//           >
//             <img src={c.receiver.avatar || "/noavatar.jpg"} alt="" />
//             <span>{c.receiver.username}</span>
//             <p>{c.lastMessage}</p>
//           </div>
//         ))}
//       </div>
//       {chat && (
//         <div className="chatBox">
//           <div className="top">
//             <div className="user">
//               <img src={chat.receiver.avatar || "noavatar.jpg"} alt="" />
//               {chat.receiver.username}
//             </div>
//             <span className="close" onClick={() => setChat(null)}>
//               X
//             </span>
//           </div>
//           <div className="center">
//             {chat.messages.map((message) => (
//               <div
//                 className="chatMessage"
//                 style={{
//                   alignSelf:
//                     message.userId === currentUser.id
//                       ? "flex-end"
//                       : "flex-start",
//                   textAlign:
//                     message.userId === currentUser.id ? "right" : "left",
//                 }}
//                 key={message.id}
//               >
//                 <p>{message.text}</p>
//                 <span>{format(message.createdAt)}</span>
//               </div>
//             ))}
//             <div ref={messageEndRef}></div>
//           </div>
//           <form onSubmit={handleSubmit} className="bottom">
//             <textarea name="text"></textarea>
//             <button>Send</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Chat;
// import { useState } from "react";
// import "./chat.scss";

// function Chat({ chats }) {
//   const [chatOpen, setChatOpen] = useState(false);
//   // const [selectedUser, setSelectedUser] = useState(null); // For future enhancement
//   // const [chatMessages, setChatMessages] = useState([]); // For future enhancement

//   // const handleOpenChat = (receiver) => {
//   //   setChatOpen(true);
//   //   // setSelectedUser(receiver);
//   //   // Load chat messages here if needed
//   // };

//   return (
//     <div className="chat">
//       <div className="messages">
//         <h1>Messages</h1>
//         {chats.map((c) => (
//           <div
//             className="message"
//             key={c.id}
//             // onClick={() => handleOpenChat(c.receiver)}
//           >
//             <img src={c.receiver.avatar || "/noavatar.jpg"} alt="avatar" />
//             <span>{c.receiver.username}</span>
//             <p>{c.lastMessage}</p>
//           </div>
//         ))}
//       </div>

//       {chatOpen && (
//         <div className="chatBox">
//           <div className="top">
//             <div className="user">
//               <img src="noavatar.jpg" alt="User avatar" />
//               {/* <span>{selectedUser?.username}</span> */}
//             </div>
//             <span className="close" onClick={() => setChatOpen(false)}>
//               X
//             </span>
//           </div>

//           <div className="center">
//             {/* {chatMessages.map((msg, i) => (
//               <div className={`chatMessage ${msg.own ? "own" : ""}`} key={i}>
//                 <p>{msg.text}</p>
//                 <span>1 hour ago</span>
//               </div>
//             ))} */}
//           </div>

//           <div className="bottom">
//             <textarea placeholder="Type your message..." />
//             <button>Send</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Chat;
import "./chat.scss";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";

import { useNotificationStore } from "../../lib/notificationStore";
import { useRef } from "react";

const Chat = ({ chats }) => {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const messageEndRef = useRef();

  const decrease = useNotificationStore((state) => state.decrease);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenchat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");
    if (!text) return;
    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
  }, [socket, chat]);

  return (
    <div className="chat">
      <div className="messages">
        <h1>messages</h1>
        {chats.map((c) => (
          <div
            className="message"
            key={c.id}
            style={{
              backgroundColor:
                c.seenBy.includes(currentUser.id) || chat?.id === c.id
                  ? "white"
                  : "#fecd514e",
            }}
            onClick={() => handleOpenchat(c.id, c.receiver)}
          >
            <img src={c.receiver.avatar || "noavatar.jpg"} alt="" />
            <span>{c.receiver.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.receiver.avatar || "noavatar.jpg"} alt="" />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                className="chatMessage"
                key={message.id}
                style={{
                  alignSelf:
                    message.userId === currentUser.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser.id ? "right" : "left",
                }}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
