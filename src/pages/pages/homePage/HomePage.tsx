import React from 'react';
import { connect, Link } from 'umi';
import prof from '@/pages/pages/homePage/images/prof.png';
import './HomePage.css';
import teacher from '@/pages/pages/homePage/images/teacher.png';
import lawyer from '@/pages/pages/homePage/images/lawyerImg.png';
import doctor from '@/pages/pages/homePage/images/doctor.png';
// @ts-ignore
import betty from '@/pages/pages/homePage/images/testimonials/betty.jpg';
import { get } from 'lodash';
import { IUserAccount } from '@/pages/user/userSearch/types';
import { Carousel } from 'antd';

interface IProps {
  Account: IUserAccount;
}

function HomePage(props: IProps) {
  const isUserAuth = get(props, 'Account._id');

  return (
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

      <div className="container cards">
        <div className="row">
          <div className="col-sm">
            <div className="card width: 18rem">
              <img src={lawyer} className="card-img-top card-img" alt="lawyer-img" />
              <div className="card-body">
                <h5 className="card-title">Lawyers</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>

          <div className="col-sm">
            <div className="card width: 18rem">
              <img src={teacher} className="card-img-top card-img" alt="teacher" />
              <div className="card-body">
                <h5 className="card-title">Teachers</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>

          <div className="col-sm">
            <div className="card width: 18rem">
              <img src={doctor} className="card-img-top card-img" alt="doctor" />
              <div className="card-body">
                <h5 className="card-title">Doctors</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Testimonials*/}
      <div id="testimonials">
        <div id="testimonial-carousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active carousel-layout">
              <h2 className="testimonial-text">
                I had the best trip ever to skiing, so easy, no hidden fees. tripPlanner made my vacation special
              </h2>
              <img className="testimonial-image" src={betty} alt="betty-profile" />
              <em>Ally, Turkey</em>
            </div>

            <div className="carousel-item carousel-layout">
              <h2 className="testimonial-text">
                I booked my trip to Europe through tripPlanner, and made the right choice. Highly recommend!
              </h2>
              <img className="testimonial-image" src="images/lady-img.jpg" alt="lady-profile" />
              <em>Beverly, Chicago</em>
            </div>

            <div className="carousel-item carousel-layout">
              <h2 className="testimonial-text">
                I traveled to South Africa with tripPlanner, and was surprised how easy it is. Have many lovely
                memories. Thank you tripPlanner
              </h2>
              <img className="testimonial-image" src="images/betty1.jpg" alt="betty-profile" />
              <em>Betty, New York</em>
            </div>

            <a className="carousel-control-prev" href="" role="button" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </a>
            <a className="carousel-control-next" href="#" role="button" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  Account: state.Account,
});

export default connect(mapStateToProps)(HomePage);
