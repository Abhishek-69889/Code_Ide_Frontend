import React from 'react';
import '../css/About.css'; 
import '../css/First.css'
import Navbar from '../components/Navbar';

function About() {
  return (
    <>
      <Navbar />
      <div className="about-container home-container">
        <header className="about-header hero-section animate-fade-in-up">
          <div className="hero-text">
            <h1>
              About <span className="highlight">Codexa</span>
            </h1>
            <p>Your online front-end IDE to write and preview code instantly!</p>
          </div>
        </header>

        <section className="about-content features">
          <div className="feature-card animate-slide-in">
            <h3>What is Codexa?</h3>
            <p>
              Codexa is a free, web-based IDE designed for front-end developers. Whether you're
              learning HTML, CSS, or JavaScript, CodeWave allows you to code directly in your
              browser, preview results instantly, and share your work effortlessly.
            </p>
          </div>

          <div className="feature-card animate-slide-in">
            <h3>Our Mission</h3>
            <p>
              We aim to simplify the web development process by providing an easy-to-use, accessible
              tool for coders of all skill levels. CodeWave strives to foster a supportive and
              creative community where developers can practice, learn, and grow together.
            </p>
          </div>

          <div className="feature-card animate-slide-in">
            <h3>Key Features</h3>
            <ul>
              <li>✅ Live, real-time code preview as you type</li>
              <li>✅ Mobile-friendly interface for coding on any device</li>
              <li>✅ Shareable code snippets with simple links</li>
              <li>✅ Light and dark mode for a comfortable coding experience</li>
            </ul>
          </div>
        </section>

        <footer className="about-footer footer animate-fade-in-up">
          <p>&copy; 2025 CodeWave — Empowering developers to code anywhere.</p>
        </footer>
      </div>
    </>
  );
}

export default About;
