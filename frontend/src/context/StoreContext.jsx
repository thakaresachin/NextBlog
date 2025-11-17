import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const allBlogs = async () => {
      try {
        const response = await fetch("https://nextblog-3-backend.onrender.com/blogs/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        console.log("Fetched Blogs:", data);

        if (response.ok) {
          setBlogData(data.blogs || data); // ✅ handle both cases
        } else {
          console.log("Failed to fetch blogs");
        }
      } catch (error) {
        console.log("Error fetching blogs:", error);
      }
    };

    allBlogs(); // ✅ function call here
  }, [user]);

  const login = (user, token) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const Logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const contextValue = {
    blogData,
    user,
    login,
    Logout,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
