import React from 'react';
import './Navbar.css';
import { Link } from 'umi';
import AdminMenu from '@/layout/_menu/AdminMenu';
import TopMenu from '@/layout/_menu/TopMenu';
import UserInfo from '@/pages/user/topInfo/UserInfo';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light background-color: #e3f2fd">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Ask
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/*<div className="collapse navbar-collapse" id="navbarNav">*/}
        {/*  <ul className="navbar-nav">*/}
        {/*    <li className="nav-item">*/}
        {/*      <a className="nav-link active" aria-current="page" href="#"><AdminMenu /></a>*/}
        {/*    </li>*/}
        {/*    <li className="nav-item">*/}
        {/*      <a className="nav-link" href="#"><TopMenu /></a>*/}
        {/*    </li>*/}
        {/*    <li className="nav-item">*/}
        {/*      <a className="nav-link" href="#"> <UserInfo /></a>*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*</div>*/}

        <AdminMenu />
        <TopMenu />
        <UserInfo />
      </div>
    </nav>
  );
};

export default Navbar;
