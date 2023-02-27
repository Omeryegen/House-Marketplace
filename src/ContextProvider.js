import { createContext } from "react"
import { useState } from "react"

export const Context = createContext()

function ContextProvider({children}) {
    const[user, setUser] = useState(null)
   

  return (
    <Context.Provider value={{
        setUser,
        user
    }}>
        {children}
    </Context.Provider>  
  )
}

export default ContextProvider