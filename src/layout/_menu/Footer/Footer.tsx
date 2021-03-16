import React from 'react';
import { Link } from 'umi';
import './Footer.css';
import '@fortawesome/react-fontawesome';

const menu = [
  { link: '/contact', text: 'Contact' },
  { link: '/subscribe', text: 'Subscribe' },
  { link: '/pricing', text: 'Pricing' },
  { link: '/industries', text: 'Industries' },
  { link: '/faq', text: 'FAQ' },
];

const Footer = () => {
  return (
    <div className="footer">
      <footer className="footer-menu-items">
        {menu.map((el) => (
          <Link key={el.link} to={el.link} className="me-2 ">
            {el.text}
          </Link>
        ))}
      </footer>

      <p>© Copyright 2021 Ask</p>
    </div>
  );
};

export default Footer;
