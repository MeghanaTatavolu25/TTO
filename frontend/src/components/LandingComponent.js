import React from "react";
import '../styles/landing.css'

function Card({ title, text }) {
    return (
      <div className="card">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    );
  }
  

function Landing() {
  return (
    <div className="container">
    <div className="card-row">
      <Card title="Card 1" text="This is the first card." />
      <Card title="Card 2" text="This is the second card." />
      <Card title="Card 3" text="This is the third card." />
    </div>
  </div>
  );
}

export default Landing;

