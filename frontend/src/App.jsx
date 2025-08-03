import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import routes from './Routes';
import { useRoutes } from 'react-router-dom';
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";

function App() {
  const { currentUser, loading } = useContext(UserContext);

  if (loading) return <div>Loading...</div>;
  // return (
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/register" element={<Register />} />
  //       <Route path="/login" element={<Login />} />
  //     </Routes>
  // );
  const routing = useRoutes(routes); // React Router 6 way

  return routing;
}

export default App;
