import React, {useState, useEffect} from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email,password) => {}
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
useEffect(()=>{
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedInInformation');
if(storedUserLoggedInInformation === '1') {
    setIsLoggedIn(true)
}
},[])
  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
