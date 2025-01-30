import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // dodanie nowego uzytkownika do localStorage
  const register = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.username === username)) {
      return false;
    }
    const newUser = { username, password, orders: [] };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  };

  // sprawdzenie danych uzytkownika
  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || []; // sprawdzamy czy uzytkownik jest zapisany w localStorage
    const validUser = users.find((u) => u.username === username && u.password === password);
  
    if (validUser) {
      if (!validUser.orders) {
        validUser.orders = []; // Zapewniamy, że orders istnieje
      }
  
      localStorage.setItem("user", JSON.stringify(validUser)); //zapisanie uzytkownika w localstorage po zalogowaniu
      setUser(validUser);
      return true;
    }
  
    return false;
  };
  
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const placeOrder = (cart) => {
    if (!user) return;
  
    // Grupowanie książek w zamówieniu
    const groupedCart = cart.reduce((acc, book) => {
      const existingBook = acc.find((item) => item.id === book.id);
      if (existingBook) {
        existingBook.quantity += 1;
      } else {
        acc.push({ ...book, quantity: 1 });
      }
      return acc;
    }, []);
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) => {
      if (u.username === user.username) {
        return {
          ...u,
          orders: [...(u.orders || []), { date: new Date(), items: groupedCart }]
        };
      }
      return u;
    });
  
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("user", JSON.stringify(updatedUsers.find((u) => u.username === user.username)));
    
    setUser(updatedUsers.find((u) => u.username === user.username));
  };
  
  

  return (
    <AuthContext.Provider value={{ user, login, logout, register, placeOrder }}>
      {children}
    </AuthContext.Provider>
  );
};
