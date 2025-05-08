import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);

    try {
      const response = await axios.post('http://localhost:5000/api/generate-topics', {
        prompt: input,
      });

      const topics = response.data.topics || ['No topics generated'];
      const reply = topics.map((topic, idx) => `${idx + 1}. ${topic}`).join('\n');

      setMessages([...newMessages, { sender: 'bot', text: reply }]);
    } catch (err) {
      console.error('Error sending message:', err.message);
      setMessages([
        ...newMessages,
        { sender: 'bot', text: 'Sorry, there was an error generating topics.' },
      ]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div>
      {!isOpen ? (
        <div className="chat-bubble" onClick={toggleChat}>
          💬
        </div>
      ) : (
        <div className="chat-box">
          <div className="chat-header">
            Answer Generator
            <span className="close-button" onClick={toggleChat}>✖</span>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                <div className="message-text">{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;




// import React, { useState } from 'react';
// import axios from 'axios';
// import './ChatWidget.css'; 

// const ChatWidget = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   const toggleChat = () => setIsOpen(!isOpen);

//   const handleSendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { sender: 'user', text: input }];
//     setMessages(newMessages);
//     setInput('');

//     try {
//       const response = await axios.post('http://localhost:5000/api/generate-topics', {
//         prompt: input,
//       });

//       const topics = response.data.topics || ['No topics generated'];
//       const reply = topics.map((topic, idx) => `${idx + 1}. ${topic}`).join('\n');

//       setMessages([...newMessages, { sender: 'bot', text: reply }]);
//     } catch (err) {
//       console.error('Error sending message:', err.message);
//       setMessages([
//         ...newMessages,
//         { sender: 'bot', text: 'Sorry, there was an error generating topics.' },
//       ]);
//     }
//   };

//   return (
//     <div>
//       {!isOpen ? (
//         <div className="chat-bubble" onClick={toggleChat}>
//           💬
//         </div>
//       ) : (
//         <div className="chat-box">
//           <div className="chat-header">
//             Answer Generator
//             <span className="close-button" onClick={toggleChat}>✖</span>
//           </div>

//           <div className="chat-messages">
//             {messages.map((msg, idx) => (
//               <div key={idx} className={`chat-message ${msg.sender}`}>
//                 <div className="message-text">{msg.text}</div>
//               </div>
//             ))}
//           </div>

//           <div className="chat-input">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ask me anything..."
//               onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//             />
//             <button onClick={handleSendMessage}>➤</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatWidget;
