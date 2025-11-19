import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedLayout from './components/ProtectedLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedLayout />}>
          <Route
            path="/dashboard"
            element={<h2>Bienvenido al Dashboard 🏋️‍♂️</h2>}
          />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
