// src/context/UserContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // for initial load

  // 🔍 Check session from backend
  useEffect(() => {
    axios.get("http://localhost:3000/api/current-user", {
      withCredentials: true
    })
    .then(res => {
      setCurrentUser(res.data.user);
    })
    .catch(() => {
      setCurrentUser(null);
    })
    .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
