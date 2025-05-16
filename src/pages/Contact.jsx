import React, { useState } from 'react';
import '../css/Contact.css';

import Navbar from '../components/Navbar';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (like sending an email or storing data)
    alert('Your message has been sent!');
    setFormData({ name: '', email: '', message: '' }); // Reset form after submission
  };

  return (
    <>
    <Navbar/>
    <div className="contact-container">
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>Have questions or need support? Reach out to us!</p>
      </header>

      <section className="contact-form-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </section>

      <footer className="contact-footer">
        <p>&copy; 2025 CodeWave - All Rights Reserved</p>
      </footer>
    </div>
    </>
  );
}

export default Contact;
