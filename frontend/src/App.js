import './App.css';
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import React , {useState,useEffect} from 'react'
import Register from './components/register'
import Login from './components/login'
import Logout from './components/logout'
import MainBody from './components/MainBody'
import Header from './components/Header'
import UpdatePassword from './components/UpdatePassword'
import axiosInstance from './axios'
import CreateServer from './components/Body/Modals/CreateServer'
function App() {
  const [logged,setLogged] = useState();
  const handleLogin=(curr_logged)=>{
    setLogged(curr_logged)
    // console.log(curr_logged)
  }
  useEffect(()=>{
    if(localStorage.getItem('access_token') == null){
      window.href = '/login/'
    }
    axiosInstance.post('auth/jwt/verify',{
      token:localStorage.getItem('access_token')
    }).then((res)=>{
      console.log(res)
      if(res.status == 200){
        setLogged(true)
      }
      else{
        setLogged(false)
      }
    })
  },[])
    
  return (
    // <div className="bg-purple-2"> 
    <Router>
    {/* <Header logged={logged}/> */}
    <Switch>
        <Route exact path="/"  render={(props)=>(<MainBody></MainBody>)} />
        <Route path ="/register" component={Register} />
				<Route path ="/login" render={(props)=>(<Login handleLoginFromApp={handleLogin}></Login>)}/>
				<Route path ="/logout" render={(props)=>(<Logout handleLoginFromApp={handleLogin}></Logout>)} />
        <Route path ="/update-password" render={(props)=>(<UpdatePassword/>)} />
        <Route path ="/testing" render={(props)=>(<CreateServer> </CreateServer>)}/>
      </Switch>
    </Router>
    // </div>
  );
}
export default App;
