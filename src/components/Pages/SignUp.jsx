import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { fetchSignup } from '../../services/apiServices';

import {
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const SignUp = ({ setUser }) => {
  const navigate = useNavigate();

  const formInitialDetails = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    country: '',
    state: ''
  }

  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Submit');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setButtonText('Sending...');

    try {
      const signupApi = await fetchSignup(formDetails);

      setButtonText('Send');
      setFormDetails(formInitialDetails);

      if (signupApi.status === 201) {
        setStatus({ success: true, message: 'Signup successful' });
        setUser(signupApi.data);
        navigate('/');
      } else {
        setStatus({ success: false, message: 'Something went wrong, please try again!' });
      }
    } catch (error) {
      setButtonText('Send');
      setFormDetails(formInitialDetails);
      setStatus({ success: false, message: 'Something went wrong, please try again!' });
    }

  };


  return (
    <section className='signup' id='signup'>
      <Container>
        <Row className='align-items-center'>
          <Col md={6} >
            {/* <img src={signupImage} alt="" /> */}
          </Col >
          <Col md={6}>
            <h2>Sign Up Form</h2>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col sm={6} className='px-1'>
                  <input type="text" value={formDetails.firstName} placeholder='First Name' onChange={(event) => onFormUpdate('firstName', event.target.value)} />
                </Col>
                <Col sm={6} className='px-1'>
                  <input type="text" value={formDetails.lastName} placeholder='Last Name' onChange={(event) => onFormUpdate('lastName', event.target.value)} />
                </Col>
                <Col sm={6} className='px-1'>
                  <input type="text" value={formDetails.username} placeholder='User Name' onChange={(event) => onFormUpdate('username', event.target.value)} />
                </Col>
                <Col sm={6} className='px-1'>
                  <input
                    type="password"
                    value={formDetails.password}
                    placeholder='Password'
                    onChange={(event) => onFormUpdate('password', event.target.value)}
                  />
                </Col>
                <Col sm={6} className='px-1'>
                  <input type="email" value={formDetails.email} placeholder='Email Address' onChange={(event) => onFormUpdate('email', event.target.value)} />
                </Col>
                <Col sm={6} className='px-1'>
                  <input type="tel" value={formDetails.phone} placeholder='Phone Number' onChange={(event) => onFormUpdate('phone', event.target.value)} />
                </Col>
                {
                  status.message &&
                  <Col>
                    <p className={status.success === false ? 'danger' : 'success'}>{status.message}</p>
                  </Col>
                }
                <CountrySelect className='country'
                  onChange={(e) => {
                    setCountryid(e.id);
                    onFormUpdate('country', e.name)
                  }}
                  placeHolder="Select Country"
                />
                <StateSelect className='state'
                  countryid={countryid}
                  onChange={(e) => {
                    setStateid(e.id);
                    onFormUpdate('state', e.name)
                  }}
                  placeHolder="Select State"
                />
                <Col>
                  <button type='submit'>
                    <span>{buttonText}</span>
                  </button>
                </Col>

                <div className='w-100 text-center mt-2' id='register-log'>
                  <p>Already have an account? <a href="/login">Log In</a></p>

                </div>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default SignUp;