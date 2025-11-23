const API_URL = import.meta.env.VITE_API_URL;

const headers = {
  'Content-Type': 'application/json',
};

// Fetch list of users
export const fetchUsers = async () => {
  const res = await fetch(`${API_URL}/users`, { credentials: 'include' });
  if (!res.ok) throw new Error('Error loading users');
  return res.json();
};

// Fetch messages from a conversation
export const fetchMessages = async (otherUserId) => {
  const res = await fetch(`${API_URL}/messages/${otherUserId}`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Error loading messages');
  return res.json();
};

// Send a message
export const sendMessage = async (receiverId, content) => {
  const res = await fetch(`${API_URL}/messages`, {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify({ receiverId, content }),
  });
  if (!res.ok) throw new Error('Error sending message');
  return res.json();
};
