import React from 'react'
import spinnerImg from '../../assets/image/loader.gif'

const Spinner = () => {
  return (
    <div>
      <img src={spinnerImg} alt="Loading..." className='d-block m-auto' style={{width:"200px"}}/>
    </div>
  )
}

export default Spinner
