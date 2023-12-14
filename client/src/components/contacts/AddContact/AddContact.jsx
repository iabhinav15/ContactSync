import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService'

const AddContact = () => {

  const navigate = useNavigate();

  const [state, setState] = useState({
    loading: false,
    contact: {name: '',
      photo: '',
      mobile: '',
      email: '',
      company: '',
      title: '',
      groupId: ''
    },
    groups:  [],
    errorMessage: ''
  })

  const updateInput = (e) => {
    setState({ ...state, 
      contact: { ...state.contact, [e.target.name]: e.target.value 
      } 
    })
  }

  useEffect(() => {
    (async() => {
      try{
        setState({...state, loading: true});
        const response = await ContactService.getGroups();
        setState({...state, loading: false, groups: response.data});
      }
      catch(error) {
        setState({...state, errorMessage: error.message})
      }
    })();
    
   }, [])
  
  const submitForm = async (e) => { 
    e.preventDefault();
    try {
      const response = await ContactService.createContact(state.contact);
      if(response){
        navigate('/contacts/list', {replace: true});
      }
    }
    catch(error) {
      setState({...state, loading: false, errorMessage: error.message});
      navigate('/contacts/add', {replace: false});
    }
  }

  const { loading, contact, groups, errorMessage } = state;

  return (
    <>
      <section className="add-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-success fw-bold">Create Contact</p>
              <div className="fst-italic">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores non quo vero iste, repudiandae maiores minus aspernatur sit ex voluptate culpa perferendis dolorem odio asperiores numquam tempora, officia quae ea?</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className="mb-2">
                  <input type="text" name = "name" value={contact.name} onChange={updateInput} required={true}  className='form-control' placeholder='Enter Name'/>
                </div>
                <div className="mb-2">
                  <input name = "photo" value={contact.photo} onChange={updateInput} required={false}  type="text" className='form-control' placeholder='Photo url'/>
                </div>
                <div className="mb-2">
                  <input name = "mobile" value={contact.mobile} onChange={updateInput} required={true}   type="number" className='form-control' placeholder='Enter Mobile'/>
                </div>
                <div className="mb-2">
                  <input name = "email" value={contact.email} onChange={updateInput} required={true}   type="email" className='form-control' placeholder='Enter Email'/>
                </div>
                <div className="mb-2">
                  <input name = "company" value={contact.company} onChange={updateInput} required={true}   type="text" className='form-control' placeholder='Enter Company name'/>
                </div>
                <div className="mb-2">
                  <input name = "title" value={contact.title} onChange={updateInput} required={true} type="text" className='form-control' placeholder='Title'/>
                </div>
                <div className="mb-2">
                  <select name = "groupId" value={contact.groupId} onChange={updateInput} required={true}   className='form-control'>
                    <option value="">Select Group</option>
                    {
                      groups.length > 0 && 
                      (groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>))
                    }
                  </select>
                </div>
                <div>
                  <input type="submit" value='Create' className='btn btn-success'/>
                  <Link to={'/contacts/list'} className='btn btn-dark ms-2'>Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AddContact
