import React, { useState, useEffect } from "react";

const MyContext =  React.createContext() 

function MyProvider({children}) {

    const [admin, setAdmin] = useState([]);

    useEffect(() => {
        fetch("/admins")
          .then((res) => res.json())
          .then((data) => setAdmin(data));
      }, []);

      function handleAddAdmin(newAdmin) {
        const updatedAdmin = [...admin, newAdmin];
        setAdmin(updatedAdmin);
      }

    return (
        <MyContext.Provider value={{ admin, setAdmin, handleAddAdmin}}>
            {children}
        </MyContext.Provider>
    ) 
}

    export { MyProvider, MyContext}