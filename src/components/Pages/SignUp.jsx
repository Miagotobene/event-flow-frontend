// import React from 'react';
import { useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import signupImage from '../../assets/images/contact-img.svg';


import {
  // CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const SignUp = () => {

  const formInitialDetails = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    country: '',
    state: ''
  }

  // location state variables
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
 

  const [formDetails, setFormDetails] = useState(formInitialDetails);

  // submit button state variable
  const [buttonText, setButtonText] = useState('Submit');

  // status: form sent successfully
  const [status, setStatus] = useState({});

  // function for updating form
  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    })
  }

  // create submit function 
  const handleSubmit = async(event) => {
    event.preventDefault();
    setButtonText('Sending...');
    let response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDetails)
    });
    setButtonText('Send');
    let result = response.json();
    setFormDetails(formInitialDetails);

    if (result.code === 200){
      setStatus({success: true, message: 'Message sent successfully'})
    } else{
      setStatus({ success: false, message: 'Something went wrong, please try again!'})
    }

  }


  return (
    <section className='singup' id='signup'>
      <Container>
        <Row className='align-items-center'>
          <Col md={6} >
          <img src={signupImage} alt="" />
          </Col >
          <Col md={6}>
          <h2>Sign Up Form</h2>
          <form action="" onSubmit={handleSubmit}>
            <Row>
              <Col sm={6} className='px-1'>
              <label htmlFor="singup">First Name: </label>
                <input type="text" value={formDetails.firstName} placeholder='First Name' onChange={(event) => onFormUpdate('firstName', event.target.value) }/>
              </Col>
              <Col sm={6} className='px-1'>
              <label htmlFor="singup">Last Name: </label>
                <input type="text" value={formDetails.lastName} placeholder='Last Name' onChange={(event) => onFormUpdate('lastName', event.target.value) }/>
              </Col>
              <Col sm={6} className='px-1'>
              <label htmlFor="singup">Email Address: </label>
                <input type="email" value={formDetails.email} placeholder='Email Address' onChange={(event) => onFormUpdate('email', event.target.value) }/>
              </Col>
              <Col sm={6} className='px-1'>
                <label htmlFor="singup">Phone Number: </label>
                <input type="tel" value={formDetails.phone} placeholder='Phone Number' onChange={(event) => onFormUpdate('phone', event.target.value) }/>
              </Col>
              {
                status.message &&
                <Col>
                <p className={status.success === false ? 'danger' : 'success'}>{status.message}</p>
                </Col>
              }
              <label htmlFor="country">Country: </label>
              <CountrySelect
                    onChange={(e) => {
                      setCountryid(e.id);
                      onFormUpdate('country', e.target.value)
                    }}
                    placeHolder="Select Country"
                  />
                <label htmlFor="state">State: </label>
                  <StateSelect
                    countryid={countryid}
                    onChange={(e) => {
                      setStateid(e.id);
                      onFormUpdate('state', e.target.value)
                    }}
                    placeHolder="Select State"
                  />                 
              <Col>
              <button type='submit'>
                <span>{buttonText}</span>
              </button>
              </Col>    
            </Row>
          </form>
          </Col>
        </Row>
      </Container>

    </section>
  )
}

export default SignUp;