import React, {useEffect, useState} from 'react'
import { Link,useNavigate, useParams } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService';
import Spinner from '../../Spinner/Spinner';

const EditContact = () => {
  const navigate = useNavigate();
  const {contactId} = useParams();
  const [state, setState] = useState({
    contact: {
      name: '',
      photo: '',
      mobile: '',
      email: '',
      company: '',
      title: '',
      groupId: ''
    },
    loading: false,
    errorMessage: '',
    groups: {}
  })

  useEffect(() => { 
    (async () => {  
      try {
        setState(prevState => ({
          ...prevState,
          loading: true
        }))
        const response = await ContactService.getContact(contactId);
        const groupResponse = await ContactService.getGroups(response.data);

        setState(prevState => ({
          ...prevState,
          loading: false,
          contact: response.data,
          groups: groupResponse.data
        }))
      } catch (error) {
        setState(prevState => ({
          ...prevState,
          loading: false,
          errorMessage: error.message
        }))
      }
    })()
  }, [contactId])

  const updateInput = (e) => {
    setState({ ...state, 
      contact: { ...state.contact, [e.target.name]: e.target.value 
      } 
    })
  }

  const submitForm = async (e) => { 
    e.preventDefault();
    try {
      const response = await ContactService.updateContact(state.contact, contactId);
      if(response){
        navigate('/contacts/list', {replace: true});
      }
    }
    catch(error) {
      setState({...state, errorMessage: error.message});
      navigate(`/contacts/edit/${contactId}`, {replace: false});
    }
  }

  const { contact, loading, errorMessage, groups } = state;

  return (
    <>
      {
        loading ? <Spinner /> : <>
        <section className="add-contact p-3">
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="h4 text-warning fw-bold">Edit Contact</p>
                <div className="fst-italic">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores non quo vero iste, repudiandae maiores minus aspernatur sit ex voluptate culpa perferendis dolorem odio asperiores numquam tempora, officia quae ea?</div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-md-4">
                <form onSubmit={submitForm}>
                  <div className="mb-2">
                    <input type="text" name = "name" value={contact.name} onChange={updateInput} required={true} className='form-control' placeholder='Enter Name'/>
                  </div>
                  <div className="mb-2">
                    <input type="text" name = "photo" value={contact.photo} onChange={updateInput} required={false} className='form-control' placeholder='Photo url'/>
                  </div>
                  <div className="mb-2">
                    <input type="number" name = "mobile" value={contact.mobile} onChange={updateInput} required={true} className='form-control' placeholder='Enter Mobile'/>
                  </div>
                  <div className="mb-2">
                    <input type="email" name = "email" value={contact.email} onChange={updateInput} required={true} className='form-control' placeholder='Enter Email'/>
                  </div>
                  <div className="mb-2">
                    <input type="text" name = "company" value={contact.company} onChange={updateInput} required={true} className='form-control' placeholder='Enter Company name'/>
                  </div>
                  <div className="mb-2">
                    <input type="text" name = "title" value={contact.title} onChange={updateInput} required={true} className='form-control' placeholder='Title'/>
                  </div>
                  <div className="mb-2">
                    <select name = "groupId" value={contact.groupId} onChange={updateInput} required={true} className='form-control'>
                      <option value="">Select Group</option>
                      {
                        groups.length > 0 && groups.map( group => {
                          return(
                            <option value={group.id} key={group.id}>{group.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <div>
                    <input type="submit" value='Update' className='btn btn-primary'/>
                    <Link to={'/contacts/list'} className='btn btn-dark ms-2'>Cancel</Link>
                  </div>
                </form>
              </div>
              <div className="col-md-6">
                <img src={contact.photo} alt="" className='contact-img'/>
              </div>
            </div>
          </div>
        </section></>
      }
      
    </>
  )
}

export default EditContact
