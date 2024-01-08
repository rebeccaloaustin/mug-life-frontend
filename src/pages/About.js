import React from "react";
import "../About.scss";

export default function About() {
  return (
    <div className="aboutpage container">
      <h1 className="heading">About Us</h1>
      <div className="left-side">
        <h2>Our Story</h2>
      </div>
      <div className="right-side">
        <p className="aboutIntro">
          At Mug Life Coffee, we believe that a cup of coffee is more than just
          a beverage; it's a ritual, a moment of solace, and a daily indulgence
          that brings people together. Our journey began with a passion for
          crafting exceptional coffee experiences, and it has evolved into a
          commitment to providing you with the finest coffee that embodies the
          spirit of "Mug Life."
        </p>
        <img
          src="https://images.unsplash.com/photo-1496374200594-218d93021c8c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          id="cupOJoe"
          alt="Mug of coffee"
        />
        <h2 id="mugExperience">The Mug Life Experience</h2>
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <div className="card">
                <div className="card-block">
                  <h4 className="card-title">Craftsmanship in Every Cup</h4>
                  <p className="card-text">
                  We take pride in sourcing the highest quality beans from renowned
            coffee regions around the world. Our beans are carefully roasted to
            perfection, ensuring a rich and flavorful cup that captures the
            essence of our dedication to craftsmanship.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card">
                <div className="card-block">
                  <h4 className="card-title">Sustainable Practices</h4>
                  <p className="card-text">
                  Mug Life Coffee is not just about great taste; it's about
            responsibility. We are committed to sustainable and ethical
            practices, working closely with farmers to support fair trade and
            environmentally friendly initiatives. Your enjoyment of our coffee
            reflects our commitment to a better world.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card">
                <div className="card-block">
                  <h4 className="card-title">Community and Connection</h4>
                  <p className="card-text">
                  Mug Life Coffee is more than a brand; it's a community. We cherish
            the relationships we build, from the farmers who grow our beans to
            the coffee enthusiasts who savor every drop. Join us in celebrating
            the shared moments and connections that make life richer.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card">
                <div className="card-block">
                  <h4 className="card-title">Join the Mug Life Movement</h4>
                  <p className="card-text">
                  Are you ready to embark on a coffee adventure filled with flavor,
            fun, and a sprinkle of coffee magic? Whether you're a seasoned
            sipper or a coffee newbie, Mug Life Coffee welcomes you with open
            mugs. Let's make life a bit more brewtiful, one cup at a time!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1607681034540-2c46cc71896d?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          id="cupOJoe"
          alt="Mug of coffee"
        />
        <p id="brewedLife">Brewed for Life, Sipped for Joy: Mug Life Coffee</p>
      </div>
    </div>
  );
}
