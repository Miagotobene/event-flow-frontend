// import React from 'react';
import React from 'react'
import { useState, useEffect } from 'react';

const RsvpForm = (props) => {

  const [formData, setFormData] = useState({ text: '' });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };


  const handleSubmit = (evt) => {
    evt.preventDefault();
    // handleAddComment
    props.handleAddComment(formData);
    setFormData({ text: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
    <label htmlFor="text-input">RSVP For This Event?</label>
    <textarea
      required
      type="text"
      name="text"
      id="text-input"
      value={formData.text}
      onChange={handleChange}
    />
    <button type="submit">RSVP</button>
  </form>
  )
}

export default RsvpForm;