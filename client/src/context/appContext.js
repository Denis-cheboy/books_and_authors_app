import { createContext,useContext,useState } from "react";

const AppContext=createContext()

export const AppContextProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState(null)

    return (
        <AppContext.Provider value={{currentUser,setCurrentUser}}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp=()=>{
    return useContext(AppContext)
}