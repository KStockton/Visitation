import React from "react";

function Welcome({ onGetStarted }) {
  return (
    <section className="welcome-section">
      <h1>
        Travel <span className="second-word-title-letter">L</span>og
      </h1>
      <h2>Visit all 30 cities</h2>
      <button onClick={onGetStarted}>Get Started</button>
    </section>
  );
};

export default Welcome;
