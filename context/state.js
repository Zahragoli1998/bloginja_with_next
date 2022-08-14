import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const[isEdited,setIsEdited] = useState(false)

  return (
    <AppContext.Provider value={{isEdited,setIsEdited}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}