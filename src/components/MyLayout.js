import React, {Component} from 'react'
import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => (
    <>
        <div className="wrapper">
            <Header/>
            {/*MAIN SECTION*/}
            {props.children}
        </div>
        {/*Footer Section*/}
        <Footer/>
    </>
)

export default Layout
