import React from "react";
import { NavLink } from "react-router-dom";
function Header() {
  return (
    <div>
    
      <header className="header">
        <div className="htop-bar">
          <div className="container-lg">
            <div className="htop-bar-inner">
             <div className="left-colmn">         
              <div className="hcontact-info">
                <ul>
                  <li className="wow fadeInDown" data-wow-delay="0.1s"><a href="tel:+2123456789"><i className="fas fa-phone-alt"></i>+21 23456789</a></li>
                  <li className="wow fadeInDown" data-wow-delay="0.2s"><a href="mailto:store@domain.com"><i className="far fa-envelope"></i>store@domain.com</a></li>
                </ul>
              </div>
             </div>
             <div className="right-colmn">
              <div className="htop-sale-message wow fadeInDown" data-wow-delay="0.2s">Summer sale discount off <span>50%</span>! Shop Now</div>
             </div>
            </div>
          </div>
        </div>
        <div className="hmiddle">
         <div className="container-lg">
          <div className="hmiddle-inner">
           <div className="left-colmn">       
            <div className="hsocial-icon">
              <ul>
               <li className="wow fadeInUp" data-wow-delay="0.1s"><a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
               <li className="wow fadeInUp" data-wow-delay="0.2s"><a href="#" target="_blank"><i className="fab fa-twitter"></i></a></li>
               <li className="wow fadeInUp" data-wow-delay="0.3s"><a href="#" target="_blank"><i className="fab fa-instagram"></i></a></li>
              </ul>
            </div>
           </div> 
           <div className="middle-colmn">
            <div className="logo"><a href="index.html"><img src="images/store-logo.png" alt="store.com" title="store.com" /> </a></div>
           </div> 
           <div className="right-colmn">
            <div className="hcontent_icons">
              <ul>
               <li className="wow fadeInUp" data-wow-delay="0.1s"><a id="hsearch" href="javascript:;"><i className="fas fa-search"></i></a></li>
               <li className="h-account wow fadeInUp" data-wow-delay="0.2s"><a href="javascript:;"><i className="far fa-user-circle"></i></a>
                <div className="h-account_flyout">
                  <ul>
                    <li><a href="#">Sign in</a></li>
                    <li><a href="#">Register</a></li>               
                  </ul>
                </div>
               </li>
               <li className="wow fadeInUp" data-wow-delay="0.3s"><a href="javascript:;"><i className="far fa-heart"></i></a></li>
               <li className="hcartmn wow fadeInUp" data-wow-delay="0.4s">
                 <a href="javascript:;">
                  <div className="hcart-counter">0</div>
                <i className="fas fa-shopping-cart"></i>
                 </a>
              </li>
              </ul>
            </div>
            <div className="hamburger-menu wow fadeInUp" data-wow-delay="0.5s"><a href="#my-menu"><i className="fas fa-bars"></i> <i className="fas fa-times"></i></a></div>
           </div> 
          </div>
         </div> 

        <div className="search-overlay">
          <button className="search-overlay_close-icon"><i className="fas fa-times"></i></button>
          <div className="search-overlay_content">
            <form className="space-mb--20">
              <input type="search" placeholder="Search Products..." />
            </form>
          <div className="search-overlay_hint"># Hit enter to search</div>
          </div>
        </div>


        </div>
        <div className="head-bottom">
          <div className="container">
            <div className="head-bottom-inner">
              <nav className="desktop-navigation">
                <ul>
                  <li><a href="index.html">Home</a></li>  
                  <li><a href="#">Shop</a>
                    <ul className="sub-menu sub-menu--mega sub-menu--mega--column-5">
                     <li className="sub-menu--mega__title">
                      <h2><a href="/">Home Group</a></h2>
                      <ul className="sub-menu--mega__list">
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li> 
                      </ul>
                     </li>
                     <li className="sub-menu--mega__title">
                      <h2><a href="/">Home Group</a></h2>
                      <ul className="sub-menu--mega__list">
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li> 
                      </ul>
                     </li>
                     <li className="sub-menu--mega__title">
                      <h2><a href="/">Home Group</a></h2>
                      <ul className="sub-menu--mega__list">
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li> 
                      </ul>
                     </li>
                     <li className="sub-menu--mega__title">
                      <h2><a href="/">Home Group</a></h2>
                      <ul className="sub-menu--mega__list">
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li> 
                      </ul>
                     </li>
                     <li className="sub-menu--mega__title">
                      <h2><a href="/">Home Group</a></h2>
                      <ul className="sub-menu--mega__list">
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li> 
                      </ul>
                     </li>                                                  
                    </ul>

                  </li>
                  <li><a href="#">Product</a></li>
                  <li><a href="#">Pages</a></li>
                  <li><a href="#">Elements</a></li>
                  <li><a href="#">Accessories</a></li>  
                  <li><a href="#">Sale</a></li>   
                </ul>
              </nav>
              <nav id="my-menu" style="display: none;">
                <ul>
                  <li><a href="index.html">Home</a></li>  
                  <li><a href="#">Shop</a>
                    <ul>                 
                      <li><a href="#">Home Group 01</a>
                    <ul>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li> 
                      </ul>
                       </li>
                      <li><a href="#">Home Group 02</a>
                    <ul>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li> 
                      </ul>
                       </li>                                                              
                      <li><a href="#">Home Group 03</a>
                    <ul>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li> 
                      </ul>
                       </li>
                      <li><a href="#">Home Group 04</a>
                    <ul>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li> 
                      </ul>
                       </li>
                      <li><a href="#">Home Group 05</a>
                    <ul>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li>
                       <li><a href="#">Sample Category</a></li> 
                      </ul>
                       </li>                                                                    
                    </ul>
                  </li>
                  <li><a href="#">Product</a></li>
                  <li><a href="#">Pages</a></li>
                  <li><a href="#">Elements</a></li>
                  <li><a href="#">Accessories</a></li>  
                  <li><a href="#">Sale</a></li> 
                  <li><a href="#">Login</a></li>
                    <li><a href="#">Register</a></li> 
                </ul>           
              </nav>        
            </div>
          </div>
        </div>
      </header>

    </div>
  );
}
export default Header;


