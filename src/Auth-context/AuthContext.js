import React,{useState} from 'react'

export const AuthContext = React.createContext({
    token : "",
    isLoggedIn : false,
    login : (token)=>{},
    logout : ()=>{}
})

const AuthContextProvider = (props) =>{
    const initialToken = localStorage.getItem("token")
    const [token, settoken] = useState(initialToken)
    const userIsLoggedIn = !!token

    
    const loginHandler = (token) =>{
        settoken(token)
        localStorage.setItem("token",token)
        setTimeout(logoutHandler,300000)
    }

    const logoutHandler = () =>{
        settoken(null)
        localStorage.removeItem("token")
    }
    
    
    const ContextValue = {
        token : token,
        login : loginHandler,
        logout : logoutHandler,
        isLoggedIn : userIsLoggedIn
    }


    return(
        <AuthContext.Provider value={ContextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider