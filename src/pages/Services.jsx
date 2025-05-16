import React from 'react';
import '../css/Services.css'; // Link to your CSS file for styling
import Navbar from '../components/Navbar';

function Services() {
  return (
    <>
    <Navbar/>
    <div className="services-container">
      <header className="services-header">
        <h1>Our Services</h1>
        <p>Explore the powerful features CodeWave has to offer for front-end development.</p>
      </header>

      <section className="services-list">
        <div className="service-card">
          <h2>Real-time Code Preview</h2>
          <p>
            Write your HTML, CSS, and JavaScript code and see live previews instantly! No need for external tools or local setups.
          </p>
        </div>

        <div className="service-card">
          <h2>Mobile-Friendly Interface</h2>
          <p>
            CodeWave works seamlessly on all devices, from desktops to smartphones. Develop and preview your projects on the go!
          </p>
        </div>

        <div className="service-card">
          <h2>Shareable Code Snippets</h2>
          <p>
            Share your code instantly with others using simple links. Great for collaboration, sharing examples, or showing off your work.
          </p>
        </div>

        <div className="service-card">
          <h2>Light & Dark Mode</h2>
          <p>
            Choose the theme that suits you best! Toggle between light and dark modes for a more personalized coding experience.
          </p>
        </div>

        <div className="service-card">
          <h2>Responsive Layout</h2>
          <p>
            CodeWave automatically adjusts to any screen size, ensuring a smooth and comfortable experience no matter the device.
          </p>
        </div>

        <div className="service-card">
          <h2>Easy Export and Sharing</h2>
          <p>
            Export your projects and code easily, or share them with others with a single click. CodeWave makes sharing a breeze.
          </p>
        </div>
      </section>

      <footer className="services-footer">
        <p>&copy; 2025 CodeWave - Empowering Developers Everywhere</p>
      </footer>
    </div>
    </>
  );
}

export default Services;
