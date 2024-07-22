
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from '../../assets/images/contact-img.svg';



const Home = () => {

  // create state variable called loop number which registers the index of the word being displayed
  const [loopNum, setLoopNum] = useState(0);

  // state variable for typing the word or deleting it
  const [isDeleting, setIsDeleting] = useState(false);

  // state variable for registering each letter of the word being displayed
  const [text, setText] = useState('');
  const period = .001; // for time/transition between each word being typed out

  // state variable  .01 - Math.random() * 10
  const [delta, setDelta] = useState(0); // variable for time/transition between each letter

  // variables with words to rotate  on homepage
  const toRotate = ['Events,', 'Experiences,', 'Memories Await!'];

  const [index, setIndex] = useState(1);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  // define tick function here 
  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2)
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }


  return (
    <section className='home' id='home'>
      <Container>
        <Row className='align-items-center'>
          <Col xs={12} md={6} xl={7}>
          <img src={Image} alt="" />
            <h1>{`Your`} <span className="txt-rotate" data-rotate='["Fun Events,", "Delightful Experiences,", "Unforgettable Memories Await!"]'></span><span className='wrap'>{text}</span></h1>
            <p>Plan, organize, and execute events effortlessly. Your perfect event starts here—don't miss out! Sign up now!</p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Home;