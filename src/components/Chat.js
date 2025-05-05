import { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp,onSnapshot, query, where, orderBy} from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import '../styles/Chat.css'; // Import the CSS file for styling


export const Chat = (props) => {
    const { room } = props; // Get the room name from props
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]); // State to store messages

    const messagesRef = collection(db, "messages"); // Reference to the messages collection in Firestore

        useEffect(() => {
            const queryMessages = query(
                messagesRef, 
                where("room", "==", room),
                orderBy("createdAt", "asc") // Order messages by creation time in ascending order
            ); // Query to get messages for the specific room
            const unsuscribe = onSnapshot(queryMessages,(snapshot) => {
                let messages = []; // Initialize an array to store messages
                snapshot.forEach((doc) => {
                    messages.push({...doc.data(), id: doc.id}); // Push each message to the array
                });
                setMessages(messages); // Update the state with the messages
            });

            return () => unsuscribe(); // Cleanup the subscription on unmount
        },[]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;
        
        await addDoc(messagesRef,{
            text: newMessage,
            createdAt: serverTimestamp(), // Automatically set the timestamp when the message is created
            user: auth.currentUser.displayName, // Get the current user's display name
            room,
        })
        setNewMessage(""); // Clear the input field after sending the message
     };
    
    return ( 
    <div className="chat-app">
        <div className='header'>
            <h1>Welcome to {room}</h1>
            </div>
        <div className='messages'>
            {messages.map((message) => (
                <div className='message' key={message.id}>
                    <span className='user'>{message.user}</span>
                    {message.text}

                </div>
            ))}
            </div>
        <form onSubmit={handleSubmit} className="new-message-form">
            <input className="new-message-input" 
            placeholder="Type your message here..." 
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            />
            <button type="submit" className="new-message-submit">Send</button>
        </form>
    </div>
    );
}