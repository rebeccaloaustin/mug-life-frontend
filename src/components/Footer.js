import React from 'react'
import '../Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: info@muglifecoffee.com</p>
            <p>Phone: +1 (234) 547-8910</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/shop">Shop</a></li>
              <li><a href="/about">About Us</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Connect With Us</h5>
            <p>Follow us on social media:</p>
            <ul className="list-inline">
              <li className="list-inline-item"><a href="#"><i className="bi bi-facebook"></i></a></li>
              <li className="list-inline-item"><a href="#"><i className="bi bi-twitter-x"></i></a></li>
              <li className="list-inline-item"><a href="#"><i className="bi bi-instagram"></i></a></li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-12 text-center">
            <p>&copy; 2023 Mug Life Coffee. All rights reserved. | <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
};
