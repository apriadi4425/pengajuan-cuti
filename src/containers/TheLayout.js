import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import {Redirect} from 'react-router-dom'

const TheLayout = () => {

  return (
    localStorage.getItem('login') ?
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div> : <Redirect to={'/login'}/>
  )
}

export default TheLayout
