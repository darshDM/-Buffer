import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import React , {useState,useEffect} from 'react'
import Register from './components/Register'
import Login from './components/Login'
import Logout from './components/logout'
import MainBody from './components/MainBody'
// import UpdatePassword from './components/UpdatePassword'
import axiosInstance from './helper/axios'
function App() {
  const [logged,setLogged] = useState();
  const handleLogin=(curr_logged)=>{
    setLogged(curr_logged)
  }
  useEffect(()=>{
    if(localStorage.getItem('access_token') == null){
      window.href = '/login/'
    }
    axiosInstance.post('auth/jwt/verify',{
      token:localStorage.getItem('access_token')
    }).then((res)=>{
      if(res.status == 200){
        setLogged(true)
      }
      else{
        setLogged(false)
        window.href = '/login/'
      }
    })
  },[])
    
  return (
    <Router>
    <Switch>
        <Route exact path="/"  render={(props)=>(<MainBody></MainBody>)} />
        <Route path ="/register" component={Register} />
				<Route path ="/login" render={(props)=>(<Login handleLoginFromApp={handleLogin}></Login>)}/>
			  <Route path ="/logout" render={(props)=>(<Logout handleLoginFromApp={handleLogin}></Logout>)} />
        
        {/*
          update "update-password" with new tailwindcss
         <Route path ="/update-password" render={(props)=>(<UpdatePassword/>)} />   
        */}
      </Switch>
    </Router>
  );
}
export default App;
