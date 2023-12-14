import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
   <>
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container">
        <Link to={'/'} className="navbar-brand">
          <i className="fa fa-mobile text-warning"/>Contact <span className='text-warning'>Manager</span> </Link>
        
      </div>
    </nav>  
   </>
  )
}

export default Navbar
