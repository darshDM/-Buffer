import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
  const [logged, setLogged] = useState(props.logged);
  const [toggle, setToggle] = useState(false);
  useEffect(()=>{
    setLogged(props.logged);
    const hideMenu = () => {
      if(window.innerWidth > 786 && toggle){
        setToggle(false); 
      }
    }
    window.addEventListener('resize',hideMenu)
    return ()=>{
      window.removeEventListener('resize',hideMenu);
    };
  },[props])
  
  const authLinks=()=>{
    return <Fragment>
    <Link className="inline-block bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded py-1 px-3" to="/logout">Logout</Link>
    </Fragment>
  }
  const guestLinks=()=>{
    return <Fragment>
    <Link className="inline-block border bg-gray-700 border-gray-800 rounded hover:border-gray-200 text-gray-50 hover:bg-gray-200 hover:text-gray-800 py-1 px-2" to="/register">Register</Link>
    <Link className="ml-2 inline-block border bg-gray-700 border-gray-800 rounded hover:border-gray-200 text-gray-50 hover:bg-gray-200 hover:text-gray-800 py-1 px-2" to="/login">Login</Link>
    </Fragment>
  }
  const authLinksToggle=()=>{
    return <div className="flex flex-col text-gray-50 bg-gray-800">
    <Link className="p-4" to="/logout">logout</Link>
    
    </div>
  }
  const guestLinksToggle=()=>{
    return <div className="flex flex-col text-gray-50 bg-gray-800">
    <Link className="p-4" to="/register">Register</Link>
    <Link className="p-4" to="/login">Login</Link>
    </div>
  }
  return (
    <Fragment>
    <nav className="flex font-sans w-full justify-between items-center text-gray-50 h-14 bg-gray-800 shadow-sm" role="navigation">
      <div className="flex flex-row">
      <svg className="w-7 h-7 ml-10 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
      <Link to="/" className="text-xl items-center">Channels</Link>
      </div>
      
      <div className="px-4 cursor-pointer md:hidden">
      
        <svg  onClick={()=>setToggle(!toggle)} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </div>
      <div className="pr-8 md:block hidden">
      {logged ? authLinks() : guestLinks()}
      </div>
    </nav>
    {toggle ? (logged ? authLinksToggle() : guestLinksToggle()) : ""}
    </Fragment>
  )
}