import React from "react";
import {Link} from "react-router-dom";
import Layout from "../MyLayout";

function Register() {
    return (
        <Layout>
            <section className="breadcrumbs">
                <div className="container">
                    <div className="breadcrumb">
                    <ul>
                        {/* <li><a href="index.html">Home</a></li> */}
                        <li><Link to="/">Home</Link>{' '}</li>
                        <li>Register</li>
                    </ul>
                    </div>
                </div>
            </section>
            <section className="login_page_Mn">
                <div className="container">
                    <div className="page_heading text-center">
                        <h1>Register</h1>
                    </div>
                    <div className="login_page_wrapper">
                        <form action method="post">
                            <div className="register_form form_Mn">
                                <div className="form-field">
                                    <label className="form-label" htmlFor="first_name">First Name<span>*</span></label>
                                    <input type="text" name="first_name" className="form-input"/>
                                </div>
                                <div className="form-field">
                                    <label className="form-label" htmlFor="last_name">Last Name<span>*</span></label>
                                    <input type="text" name="last_name" className="form-input"/>
                                </div>
                                <div className="form-field">
                                    <label className="form-label" htmlFor="reg_email">Email
                                        Address<span>*</span></label>
                                    <input className="form-input" name="reg_email" id="reg_email" type="email"/>
                                    <span style={{display: 'block'}} className="form-inlineMessage error">Please use a valid email address, such as user@example.com.</span>
                                </div>
                                <div className="form-field">
                                    <label className="form-label" htmlFor="reg_pass">Password<span>*</span></label>
                                    <input className="form-input" id="reg_pass" type="password" name="reg_pass"/>
                                </div>
                                <div className="form-field">
                                    <label className="form-label" htmlFor="reg_confirm_pass">Confirm
                                        Password<span>*</span></label>
                                    <input className="form-input" id="reg_confirm_pass" type="password"
                                           name="reg_confirm_pass"/>
                                </div>
                                <div className="form-actions text-center">
                                    <input type="submit" className="button btn-secondry" defaultValue="Register"/>
                                </div>
                                <div className="form-actions-alredy-customer text-center">
                                    <p className="alredy-customer-link">Already have an account? 
                                    {/* <a href="login.html">Log In</a> */}
                                    <Link to="/login">Log In</Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default Register;
