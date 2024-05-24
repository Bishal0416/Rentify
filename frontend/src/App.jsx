import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Profile from './pages/Profile'
import NavBar from './components/NavBar'
import PrivateRoute from './components/PrivateRoute'
import Propertylisting from './pages/Propertylisting'
import Property from './pages/Property'
import UpdateProperty from './pages/UpdateProperty'
import Search from './pages/Search'


function App() {
  return(
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path = '/' element = {<Home/>}/>
          <Route path = '/sign-up' element = {<SignUp/>}/>
          <Route path = '/sign-in' element = {<SignIn/>}/>
          <Route path = '/about' element = {<About/>}/>
          <Route path = '/search' element = {<Search/>}/>
          <Route path = '/property-listing/:listingid' element = {<Property/>}/>
          <Route element={<PrivateRoute/>}>
            <Route path = '/profile' element = {<Profile/>}/>
            <Route path = '/property-listing' element = {<Propertylisting/>}/>
            <Route path = '/property-update/:propertyid' element = {<UpdateProperty/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  ); 
};

export default App
