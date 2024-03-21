import { createContext } from "react";
import { useState } from "react";
const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const [ user, setUser ] = useState({user_id:1 , user_name:"Scaler"});
    return (
        <AuthContext.Provider value={{user}}>
        {props.children}

        </AuthContext.Provider>
    )
}


export default AuthContextProvider;
export { AuthContext };
