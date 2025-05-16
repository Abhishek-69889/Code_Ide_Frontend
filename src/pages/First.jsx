import React from 'react';
import '../css/first.css';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

function First() {
    return (
        <>
            <Navbar />
            <div className="home-container">
                <header className="hero-section">
                    <div className="hero-text animate-fade-in-up">
                        <h1 className="animate-slide-in">Welcome to <span className="text-[70px] font-bold text-[#4F46E5]" style={{ fontFamily: "Segoe UI" }}>Codexa<span className="text-[#10B981]">.</span></span></h1>
                        <p className="animate-fade-in">Your Online Front-End IDE for HTML, CSS, and JS!</p>
                        <Link to="/login" className="cta-button">Start Coding</Link>
                    </div>
                </header>

                <section className="features">
                    <div className="feature-card animate-fade-in-up">
                        <h3>Real-time Preview</h3>
                        <p>Instant feedback with live code preview as you write your code.</p>
                    </div>
                    <div className="feature-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <h3>Responsive Editor</h3>
                        <p>Works seamlessly across all devices, from desktops to phones.</p>
                    </div>
                    <div className="feature-card animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <h3>Shareable Code Snippets</h3>
                        <p>Share your code with others using a simple link.</p>
                    </div>
                </section>

                <footer className="footer">
                    <p>&copy; 2025 CodeWave - All Rights Reserved</p>
                </footer>
            </div>
        </>
    );
}

export default First;
