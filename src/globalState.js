import React, {useEffect, useState, createContext} from 'react';
import axios from "axios";
import {API} from "./helper";
export const GlobalContext = createContext();
const Token = JSON.parse(localStorage.getItem('token'));

export const GlobalProvider = ({children}) => {
  const [Loading, setLoading] = useState(true);
  const [User, setUser] = useState({});
  const [ListUser, setListUser] = useState([]);
  const [Konfig, setKonfig] = useState({});

  const GetListUser = async () => {
    await API('get','api/user').then(res => {
      setListUser(res.data.data)
    }).catch(err => {
      console.log(err)
    })
  }

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
        setKonfig(res.data.konfig)
      }).catch(e => {
        console.log(e)
      })
    }
    setLoading(false);
  }

  useEffect(() => {
    CheckApakahLogin(Token);
    GetListUser();
  }, [])

  const GlobalState = {Loading, CheckApakahLogin, User, ListUser, GetListUser, Konfig}

  return(
    <GlobalContext.Provider value={GlobalState}>
      {children}
    </GlobalContext.Provider>
  )
}
