import React,{useState} from 'react'

export const AuthContext = React.createContext({
    token : "",
    isLoggedIn : false,
    login : (token)=>{},
    logout : ()=>{}
})

const AuthContextProvider = (props) =>{
    const [token, settoken] = useState("")
    const userIsLoggedIn = !!token

    const loginHandler = (token) =>{
        settoken(token)
    }

    const logoutHandler = () =>{
        settoken(null)
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