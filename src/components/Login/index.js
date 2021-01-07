import React from "react";
import {Link} from "react-router-dom";
import Layout from "../MyLayout";

function Login() {
    return (
        <Layout>
            <section className="breadcrumbs">
                <div className="container">
                    <div className="breadcrumb">
                        <ul>
                            {/* <li><a href="index.html">Home</a></li> */}
                            <li><Link to="/">Home</Link>{' '}</li>
                            <li>Sign In</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="register_page_Mn">
                <div className="container">
                    <div className="page_heading text-center">
                        <h1>Sign In</h1>
                    </div>
                    <div className="register_page_wrapper">
                        <form action method="post">
                            <div className="login_form form_Mn">
                                <div className="form-field">
                                    <label className="form-label" htmlFor="login_email">Email Address<span
                                        className="required">*</span></label>
                                    <input className="form-input" name="login_email" id="login_email" type="email"/>
                                    <span style={{display: 'block'}} className="form-inlineMessage error">Please use a valid email address, such as user@example.com.</span>
                                </div>
                                <div className="form-field">
                                    <label className="form-label" htmlFor="login_pass">Password<span
                                        className="required">*</span></label>
                                    <input className="form-input" id="login_pass" type="password" name="login_pass"
                                           autoComplete="off"/>
                                </div>
                                <div className="form-actions text-center">
                                    <input type="submit" className="button btn-secondry" defaultValue="Sign in"/>
                                    <a className="forgot-password" href="#">Forgot password?</a>
                                </div>
                                <div className="form-actions-new-customer text-center">
                                    <p className="register-link">Don't have an account? 
                                        {/* <a href="register.html">Register here</a> */}
                                        <Link to="/signup">Register</Link>
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

export default Login;
