import React from 'react'
import NavBar from "./components/Navbar/Navbar";
/*Navigate is used to redirect */
import { Navigate, Route, Routes, useLocation, Outlet } from 'react-router-dom';
import {useSelector} from 'react-redux'
import ContactList from './components/contacts/ContactList/ContactList';
import AddContact from './components/contacts/AddContact/AddContact';
import EditContact from './components/contacts/EditContact/EditContact';
import ViewContact from './components/contacts/ViewContact/ViewContact';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

function Layout(){
  const {user} = useSelector(state => state.user);
  const location = useLocation();

  return 1 ? (<Outlet/>):(
    <Navigate to='/login' state={{ from: location }} replace/>
  )
}

const App = () => {
  return (
    <>
    <NavBar />
    <Routes>  

      <Route element={<Layout/>}>
        <Route path="/" element={<Navigate to={'/contacts/list'} />} />
        <Route path="/contacts/list" element={<ContactList />} />
        <Route path="/contacts/add" element={<AddContact />} />
        <Route path="/contacts/view/:contactId" element={<ViewContact />} />
        <Route path="/contacts/edit/:contactId" element={<EditContact />} />
      </Route>

      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>

    </Routes>
    </>
  )
}

export default App;
