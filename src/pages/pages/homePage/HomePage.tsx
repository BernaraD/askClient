import React from 'react';
import { connect, Link } from 'umi';
import prof from '@/pages/pages/homePage/images/prof.png';
import './HomePage.css';
import img2 from '@/pages/pages/homePage/images/homePageIllustration2.png';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';

interface IProps {
  Account: IUserAccount;
}

function HomePage(props: IProps) {
  const isUserAuth = get(props, 'Account._id');

  return (
    // <div className="container mt-5 mb-5">
    //   <div className="row">
    //     <div className="col-lg-6">

    <div className="container">
      <div className="row">
        <div>
          <img src={prof} className="prof-image" alt="Ask" title="Ask" />
        </div>

        <div className="col-lg-12 first-paragraph">
          <h1 className="mb-4">Ask your question today to the top ranked professionals</h1>

          <p className="mt-4">Our network of professionals will answer your question in minutes.</p>

          {!isUserAuth && (
            <div className="mt-5">
              <Link className="ant-btn ant-btn-primary login-form-button" to="/user/register">
                Sign up for free
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="search-form">
        <div className="ant-col-lg-6 ant-col-sm-2 column">
          <input type="text" className="" placeholder="Legal Issue or Lawyer Name" />
        </div>

        <div className="ant-col-lg-6 ant-col-sm-2 column">
          <input type="text" className="" placeholder="Legal Issue or Lawyer Name" />
        </div>

        <div className="ant-col-lg-6 ant-col-sm-2 column">
          <input type="text" className="" placeholder="Legal Issue or Lawyer Name" />
        </div>
      </div>

      {/*<div className="row">*/}
      {/*  <div className="row mt-5">*/}
      {/*    <div className="col-lg-7">*/}
      {/*      <div className="mt-5 mb-5">*/}
      {/*        <h3>Clients</h3>*/}
      {/*        <p>Organize your client and vendor lists and keep a single accurate version for each contact.</p>*/}
      {/*      </div>*/}

      {/*<div className="mt-5 mb-5">*/}
      {/*  <h3>Estimates, Invoices, Payments</h3>*/}
      {/*  <p>*/}
      {/*    No more wasting your time filling out the same information. Turn estimates into invoices, invoices into*/}
      {/*    payments with a click of a button. Create more revenue by working efficiently.*/}
      {/*  </p>*/}
      {/*</div>*/}

      {/*<div className="mt-5 mb-5">*/}
      {/*  <h3>Calls and Messages</h3>*/}
      {/*  <p>*/}
      {/*    Messages and calls between your team and the client are logged in an integrated chat, so everyone is*/}
      {/*    instantly updated. No miscommunication, no extra phone calls.*/}
      {/*  </p>*/}
      {/*</div>*/}

      {/*<div className="mt-5 mb-5">*/}
      {/*  <h3>Schedule Tasks</h3>*/}
      {/*  <p>Make scheduling a breeze, never miss a meeting.</p>*/}
      {/*</div>*/}

      {!isUserAuth && (
        <div className="mt-4 mb-5">
          <Link className="ant-btn ant-btn-primary login-form-button" to="/user/register">
            Start today
          </Link>
        </div>
      )}
    </div>

    //     <div className="col-lg-5">
    //       <img src={img2} className="align-content-center w-100" alt="ClientBase " title="ClientBase " />
    //     </div>
    //   </div>
    // </div>
    // </div>
  );
}

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

export default connect(mapStateToProps)(HomePage);
