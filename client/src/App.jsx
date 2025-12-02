import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { Layout } from './components/Layout';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Temporary component for Home
const HomePage = () => (
  <div className="p-4">
    <h1>Welcome to Home (Protected)</h1>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route: Login */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Private Routes (With Layout) */}
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
