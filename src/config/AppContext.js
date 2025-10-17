// AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sharedObject, setSharedObject] = useState({
    user: null,
  });

  return (
    <AppContext.Provider value={{ sharedObject, setSharedObject }}>
      {children}
    </AppContext.Provider>
  );
};
