import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

const ContactList = () => {

  const [query, setQuery] = useState({ text: '' });

  const [state, setState] = useState({
    contacts: [],
    filteredContacts: [],
    loading: false,
    errorMessage: ''
  });

  useEffect( () => { 
      (async ()=>{try {
        setState(prevState => ({
          ...prevState,
          loading: true
        }))
        const response = await ContactService.getAllContacts();
        setState(prevState => ({
          ...prevState,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data
        }))
      } catch (error) {
        setState(prevState => ({
          ...prevState,
          loading: false,
          errorMessage: error.message
        }))
      }})();
  }, [])

  const clickDelete = async (contactId) => {
    try {
      const response = await ContactService.deleteContact(contactId);
      if(response){ 
        const newContacts = state.contacts.filter(contact => contact.id !== contactId);
        setState(prevState => ({
          ...prevState,
          contacts: newContacts,
          filteredContacts: newContacts
        }))
      }
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        errorMessage: error.message
      }))
    }
  }

  const searchContacts = async (e) => {
    setQuery({ ...query, text: e.target.value });

    const response = state.contacts.filter(contact => contact.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setState(prevState => ({
      ...prevState,
      loading: false,
      filteredContacts: response
    }))
  }
  const { contacts, loading, errorMessage, filteredContacts } = state;

  return (
    <>
      <section className='contact-search p-3'>
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 fw-bolder">Contact Manager
                  <Link to={'/contacts/add'} className="btn btn-primary ms-2">
                    <i className="fa fa-plus-circle me-2"/>
                    New</Link>
                </p>
                <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure voluptates vitae doloribus odio nisi recusandae, quos nihil pariatur distinctio quam expedita placeat reiciendis delectus modi perspiciatis minus praesentium saepe enim.</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className='row'>
                  <div className="col">
                    <div className="mb-2">
                      <input name="text" value={query.text} onChange={searchContacts} type="text" className='form-control' placeholder='Search Contacts...'/>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <input type="submit" value='Search' className='btn btn-outline-dark w-10'/>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {
        loading ? <Spinner/> : <section className='contact-list'>
        <div className="container">
          <div className="row">
            {
              filteredContacts.length > 0 && filteredContacts.map( contact => {
                return(
                  <div className="col-md-6" key={contact.id}>
                    <div className="card my-2">
                      <div className="card-body">
                        <div className="row align-items-center d-flex justify-content-around">
                        <div className="col-md-4">
                          <img src={contact.photo} alt="" onError={(e) => {
                            e.target.src = "https://cdn-icons-png.flaticon.com/512/3607/3607444.png";}} className='contact-img'/>
                        </div>
                        <div className="col-md-7">
                            <ul className='list-group'>
                              <li className='list-group-item list-group-item-action' >Name: <span className='fw-bold'>{contact.name}</span></li>
                              <li className='list-group-item list-group-item-action'>Mobile: <span className='fw-bold'>{contact.mobile}</span></li>
                              <li className='list-group-item list-group-item-action'>Email: <span className='fw-bold'>{contact.email}</span></li>
                            </ul>
                        </div>
                        <div className="col-md-1 d-flex flex-column align-items-center">
                          <Link to={`/contacts/view/${contact.id}`} className="btn btn-primary my-1">
                            <i className="fa fa-eye"/>
                          </Link>
                          <Link to={`/contacts/edit/${contact.id}`} className="btn btn-warning my-1">
                            <i className="fa fa-pen"/>
                          </Link>
                          <button onClick={()=>{clickDelete(contact.id)}} className="btn btn-danger my-1">
                            <i className="fa fa-trash"/>
                          </button>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            
          </div>
        </div>
      </section>
      }
      
    </>
  )
}

export default ContactList
