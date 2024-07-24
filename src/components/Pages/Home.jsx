
// import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from '../../assets/images/contact-img.svg';

const Home = () => {


  return (
    <section className='home' id='home'>
      <Container>
        <Row className='align-items-center'>
          <Col xs={12} md={6} xl={7}>
          <img src={Image} alt="" />
            <h1>{`Your`} <span className="txt-rotate" data-rotate='["Fun Events,", "Delightful Experiences,", "Unforgettable Memories Await!"]'></span><span className='wrap'>Delightful Experiences Await!</span></h1>
            <p>Plan, organize, and execute events effortlessly. Your perfect event starts here—don't miss out! Sign up now!</p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Home;