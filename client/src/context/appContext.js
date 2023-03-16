import { createContext,useContext,useState } from "react";

const AppContext=createContext()

export const AppContextProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState({})
    const [modal,setModal]=useState(false)

    return (
        <AppContext.Provider value={{currentUser,setCurrentUser,modal,setModal}}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp=()=>{
    return useContext(AppContext)
}