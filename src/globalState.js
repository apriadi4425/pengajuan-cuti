import React, {useEffect, useState, createContext} from 'react';
import axios from "axios";
export const GlobalContext = createContext();
const Token = JSON.parse(localStorage.getItem('token'));

export const GlobalProvider = ({children}) => {
  const [Loading, setLoading] = useState(true);
  const [User, setUser] = useState({});

  const CheckApakahLogin = async (Token) => {
    if(Token !== null){
      await axios({
        method : 'get',
        url : `${process.env.REACT_APP_BASE_URL}/api/user/saya`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`,
        },
      }).then(res => {
        setUser(res.data.data)
      }).catch(e => {
        console.log(e)
      })
    }
    setLoading(false);
  }

  useEffect(() => {
    CheckApakahLogin(Token);
  }, [])

  const GlobalState = {Loading, CheckApakahLogin, User}

  return(
    <GlobalContext.Provider value={GlobalState}>
      {children}
    </GlobalContext.Provider>
  )
}
