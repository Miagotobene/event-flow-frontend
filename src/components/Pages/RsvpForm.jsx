// import React from 'react';
import React from 'react'
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import './eventlist.css'


const RsvpForm = (props) => {

  const [formData, setFormData] = useState({ text: '' });

  // const handleChange = (evt) => {
  //   setFormData({ ...formData, [evt.target.name]: evt.target.value });
  // };


  const handleSubmit = (evt) => {
    evt.preventDefault();
    // handleAddComment
    // props.handleAddComment(formData);
    setFormData({ text: '' });
  };

  return (
    <div>
      <Form.Group className="rsvp-group">
      <Form.Label>RSVP</Form.Label>
      <Form.Select aria-label="category" onSubmit={handleSubmit}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </Form.Select>
      </Form.Group>
    <button type="submit">Submit</button>
    </div>
    
    


  //   <form onSubmit={handleSubmit}>
  //   <label htmlFor="text-input">RSVP For This Event?</label>
  //   <textarea
  //     required
  //     type="text"
  //     name="text"
  //     id="text-input"
  //     value={formData.text}
  //     onChange={handleChange}
  //   />
  //   <button type="submit">RSVP</button>
  // </form>
  )
}

export default RsvpForm;