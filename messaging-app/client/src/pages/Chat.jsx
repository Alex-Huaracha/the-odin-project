import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUsers, fetchMessages, sendMessage } from '../services/api';

const Chat = () => {
  const { user, logout } = useAuth();

  // States
  const [users, setUsers] = useState([]); // List of contacts
  const [selectedUser, setSelectedUser] = useState(null); // Active chat
  const [messages, setMessages] = useState([]); // Current message history
  const [newMessage, setNewMessage] = useState(''); // Text input

  // Ref for automatic scrolling to the last message
  const messagesEndRef = useRef(null);

  // 1. Load users on initialization
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadUsers();
  }, []);

  // 2. POLLING: Load messages every 2 seconds if a user is selected
  useEffect(() => {
    if (!selectedUser) return;

    const loadMessages = async () => {
      try {
        const data = await fetchMessages(selectedUser.id);
        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    // Immediate initial load
    loadMessages();

    // Interval to simulate real-time updates
    const intervalId = setInterval(loadMessages, 2000);

    // Cleanup on unmount or user change
    return () => clearInterval(intervalId);
  }, [selectedUser]);

  // Automatic scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle message sending
  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    try {
      await sendMessage(selectedUser.id, newMessage);
      setNewMessage('');

      // Force immediate reload of messages to see the sent one
      const data = await fetchMessages(selectedUser.id);
      setMessages(data);
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* SIDEBAR (User List) - Glassmorphism */}
      <div className="w-1/3 bg-slate-800/40 backdrop-blur-xl border-r border-white/10 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 bg-slate-700/30 backdrop-blur-md border-b border-white/10 flex justify-between items-center">
          <h2 className="font-bold text-lg text-slate-100">
            {user?.username} (You)
          </h2>
          <button
            onClick={logout}
            className="text-sm text-red-400 hover:text-red-300 font-semibold transition"
          >
            Logout
          </button>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {users.map((u) => (
            <div
              key={u.id}
              onClick={() => setSelectedUser(u)}
              className={`p-4 border-b border-white/5 cursor-pointer hover:bg-slate-700/30 transition ${
                selectedUser?.id === u.id
                  ? 'bg-indigo-500/20 border-l-4 border-l-indigo-400'
                  : ''
              }`}
            >
              <div className="font-semibold text-slate-100">{u.username}</div>
              <div className="text-xs text-slate-400 truncate">
                {u.bio || 'Messaging App User'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header - Glassmorphism */}
            <div className="p-4 bg-slate-800/40 backdrop-blur-xl border-b border-white/10 shadow-lg flex items-center">
              <div className="w-10 h-10 bg-indigo-500/80 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold mr-3 border border-indigo-400/30">
                {selectedUser.username.charAt(0).toUpperCase()}
              </div>
              <h3 className="font-bold text-lg text-slate-100">
                {selectedUser.username}
              </h3>
            </div>

            {/* Messages (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
              {messages.map((msg) => {
                const isMe = msg.senderId === user.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md p-3 rounded-lg shadow-lg backdrop-blur-md ${
                        isMe
                          ? 'bg-indigo-500/30 border border-indigo-400/30 text-slate-100 rounded-br-none'
                          : 'bg-slate-700/40 border border-slate-600/30 text-slate-100 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <span
                        className={`text-xs block mt-1 text-right ${
                          isMe ? 'text-indigo-200' : 'text-slate-400'
                        }`}
                      >
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Glassmorphism */}
            <form
              onSubmit={handleSend}
              className="p-4 bg-slate-800/40 backdrop-blur-xl border-t border-white/10 flex gap-2"
            >
              <input
                type="text"
                className="flex-1 p-3 bg-slate-700/50 backdrop-blur-md border border-slate-600/50 rounded-lg
                           text-slate-100 placeholder-slate-400
                           focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50
                           transition"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                type="submit"
                className="bg-indigo-600/80 backdrop-blur-md border border-indigo-500/30
                           text-white px-6 py-2 rounded-lg font-semibold
                           hover:bg-indigo-500/80 hover:border-indigo-400/50
                           transition shadow-lg hover:shadow-indigo-500/25"
              >
                Send
              </button>
            </form>
          </>
        ) : (
          /* Empty State (No chat selected) */
          <div className="flex-1 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm">
            <div className="text-center bg-slate-800/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
              <h2 className="text-2xl font-bold mb-2 text-slate-100">
                Welcome to Messaging App
              </h2>
              <p className="text-slate-400">
                Select a user from the left to start chatting.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
