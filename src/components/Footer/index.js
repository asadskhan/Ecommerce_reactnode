import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

function Footer() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('email', email);
        setLoading(true)
        callAPI(email)
    }
    /**
     * Submit New Letter
     * */
    const callAPI = (newsletter) => {
        //making a get request with the fetch API
        axios({
            method: 'POST',
            url: 'http://localhost:8082/newsletter',
            data: {newsletter: newsletter},
            config: {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}}
        })
            .then((response) => {
                console.log('response.data', response.data);
                setMessage(response.data.message)
                setLoading(false)
            })
            .catch(function (response) {
                setLoading(false)
                console.log(response);
            });
    }
    return (
        <>
            <footer className="footer">
                <div className="footer-top">
                    <div className="container-lg">
                        <div className="footer-wrap">
                            <div className="fcolumn1 wow fadeInLeft">
                                {/* <div className="flogo"><a href="index.html"><img src="/images/store-logo.png"
                                                                                 alt="store.com"
                                                                                 title="store.com"/></a></div> */}
                                <div className="flogo"><Link to="/"><img src="/images/store-logo.png"
                                                                                 alt="store.com"
                                                                                 title="store.com"/></Link>{' '}</div>
                                <div className="fcontact-info">
                                    <ul>
                                        <li>
                                            <div className="icon"><i className="fas fa-map-marker-alt"></i></div>
                                            <div className="content">
                                                <p>184 Main Rd E, St Albans VIC 3021, Australia</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon"><i className="far fa-envelope"></i></div>
                                            <div className="content">
                                                <p><a href="mailto:store@domain.com">store@domain.com</a></p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="icon"><i className="fas fa-phone-alt"></i></div>
                                            <div className="content">
                                                <p><a href="tel:+2123456789">+21 23456789</a></p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="fsocial">
                                    <ul>
                                        <li><a href="#" target="_blank"><i className="fab fa-facebook-f"/></a></li>
                                        <li><a href="#" target="_blank"><i className="fab fa-twitter"/></a></li>
                                        <li><a href="#" target="_blank"><i className="fab fa-instagram"/></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="fcolumn2 footer-top-link wow fadeInUp" data-wow-delay="0.1s">
                                <h6>Categories</h6>
                                <ul>
                                    <li><a href="#">Men</a></li>
                                    <li><a href="#">Women</a></li>
                                    <li><a href="#">Accessories</a></li>
                                    <li><a href="#">Shoes</a></li>
                                    <li><a href="#">Denim</a></li>
                                    <li><a href="#">Dress</a></li>
                                </ul>
                            </div>
                            <div className="fcolumn3 footer-top-link wow fadeInUp" data-wow-delay="0.3s">
                                <h6>Infomation</h6>
                                <ul>
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                    <li><a href="#">Terms & Conditions</a></li>
                                    <li><a href="#">Returns & Exchanges</a></li>
                                    <li><a href="#">Shipping & Delivery</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                </ul>
                            </div>
                            <div className="fcolumn4 footer-top-link wow fadeInUp" data-wow-delay="0.6s">
                                <h6>Quick Links</h6>
                                <ul>
                                    <li><a href="#">Store Location</a></li>
                                    <li><a href="#">My Account</a></li>
                                    <li><a href="#">Accessories</a></li>
                                    <li><a href="#">Orders Tracking</a></li>
                                    <li><a href="#">Size Guide</a></li>
                                    <li><a href="#">FAQs</a></li>
                                </ul>
                            </div>
                            <div className="fcolumn5 wow fadeInRight">
                                <div className="fnewsletter-mn">
                                    <p>Subscribe to our newsletter and get 10% off your first purchase</p>

                                    <div className="fnewsletter-inner">
                                        <form name="subscribe" id="subscribefrm" onSubmit={(e) => handleSubmit(e)}>
                                            <input type="email" placeholder="Your email address" required
                                                   onChange={(e) => setEmail(e.target.value)} name="newsletter"
                                                   id="subscribe_email"/>

                                            <span id="subscribemsg" className="error"/>
                                            {!loading ?
                                                <input type="submit" value="Subscribe" className="sunscribebtn"/> :
                                                <input type="submit" disabled value="Loading..."
                                                       className="sunscribebtn"/>}

                                        </form>
                                    </div>
                                </div>
                                {message ?
                                    <span className="error" id="subscribeerror">{message}</span> : ''}
                                <div className="fpayment-mn">
                                    <ul>
                                        <li><i className="fab fa-cc-visa"/></li>
                                        <li><i className="fab fa-cc-paypal"/></li>
                                        <li><i className="fab fa-cc-mastercard"/></li>
                                        <li><i className="fab fa-cc-amex"/></li>
                                        <li><i className="fab fa-cc-discover"/></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container-lg">
                        <div className="footer-wrap">
                            <div className="footer-link">
                                <ul>
                                    <li className="wow fadeIn" data-wow-delay="0.1s"><a href="#">Blog</a></li>
                                    <li className="wow fadeIn" data-wow-delay="0.3s"><a href="#">Contact Us</a></li>
                                    <li className="wow fadeIn" data-wow-delay="0.6s"><a href="#">About Us</a></li>
                                    <li className="wow fadeIn" data-wow-delay="0.9s"><a href="#">Shop</a></li>
                                </ul>
                            </div>
                            <div className="copyright-txt wow fadeIn" data-wow-delay="0.1s"><p>Copyright &copy; 2020
                                Store. All
                                rights reserved.</p></div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
