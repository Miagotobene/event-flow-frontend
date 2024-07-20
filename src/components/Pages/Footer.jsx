import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import navIcon1 from '../../assets/images/nav-icon1.svg';
import  navIcon2 from '../../assets/images/nav-icon2.svg';
import  navIcon3 from '../../assets/images/nav-icon3.svg';
import navIcon4 from '../../assets/images/github_icon.svg';


const Footer = () => {
  return (
    <footer className='footer'>
        <Container>
            <Row className='align-item-center'>
            <Col sm={6}>
            <h3>Event Flow</h3>
            {/* <img src="" alt="" /> */}
            </Col>
            <Col sm={6} className='text-center text-sm-end'>
            <div className='social-icon'>
                <a href="https://github.com/Miagotobene"><img src={navIcon4} alt="" /></a>
                <a href="#"><img src={navIcon4} alt="" /></a>
                <a href="#"><img src={navIcon4 } alt="" /></a>
            </div>
            <p>CopyRight 2024, All Rights Reserved.</p>
            </Col>
            </Row>
        </Container>

    </footer>
  )
}

export default Footer