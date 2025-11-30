import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => {
        if (res.status === 401)
          return 'Unauthorized (But connected to the backend ✅)';
        return res.json();
      })
      .then((data) => setMessage(JSON.stringify(data)))
      .catch((err) => setMessage('Connection error ❌'));
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 text-blue-500">
          Spotter Frontend 🏋️
        </h1>
        <p className="text-xl">Backend Status:</p>
        <pre className="mt-4 p-4 bg-black rounded border border-gray-700">
          {message}
        </pre>
      </div>
    </div>
  );
}

export default App;
