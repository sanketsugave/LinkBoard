import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
// import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home.jsx'
import { UserProvider } from './context/UserContext'; // adjust the path if needed


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* ✅ This is REQUIRED for useRoutes() or <Routes> */}
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);


