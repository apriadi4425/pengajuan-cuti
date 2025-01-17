import React, {useEffect, useState, createContext, useCallback} from 'react';
import axios from "axios";
import {API} from "./helper";
export const GlobalContext = createContext();
const Token = JSON.parse(localStorage.getItem('token'));

export const GlobalProvider = ({children}) => {

  const [Loading, setLoading] = useState(true);
  const [User, setUser] = useState({});
  const [DataKenaikanPangkat, setDataKenaikanPangkat] = useState([])
  const [ListUser, setListUser] = useState([]);
  const [Konfig, setKonfig] = useState({});
  const [AsyncToken, setAsyncToken] = useState(null);


  const GetListUser = async (Token) => {
    await API('get','api/user', null, Token).then(res => {
      setListUser(res.data.data)
    }).catch(err => {
      console.log(err)
    })
  }

  const GetKenaikanPangkat = useCallback((Token) => {
    API('get','api/user/kenaikan-pangkat', null, Token)
      .then(res => {
        setDataKenaikanPangkat(res.data)
        console.log(res.data)
      }).catch(err => {
      console.log(err)
    })
  }, [])


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
        setAsyncToken(Token);
        setUser(res.data.data)
        setKonfig(res.data.konfig)
        GetListUser(Token);
        GetKenaikanPangkat(Token);
      }).catch(e => {
        console.log(e)
      })
    }
    setLoading(false);
  }

  useEffect(() => {
    CheckApakahLogin(Token);
  }, [])

  const GlobalState = {Loading, CheckApakahLogin, User, ListUser, GetListUser, Konfig, AsyncToken, DataKenaikanPangkat, GetKenaikanPangkat}

  return(
    <GlobalContext.Provider value={GlobalState}>
      {children}
    </GlobalContext.Provider>
  )
}
