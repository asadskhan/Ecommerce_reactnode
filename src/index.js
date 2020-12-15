import React, { Component } from "react";
import ReactDOM from 'react-dom';
// import Header from './components/Header.js'
import Layout from './components/MyLayout.js'
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import axios from 'axios';

//import React from 'react'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

// import TinySlider from "tiny-slider-react";

 

/*import $ from 'jquery'
  
import OwlCarousel from "react-owl-carousel";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";*/

/*import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';*/
 

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        	allCategory:[],
            collectionCategory:[],
            sliders:[],
            dealDay:[],
            homeBlog:[],
            newarrival:[],
            featured:[],
            bestseller:[],
            saleproduct:[],
            topratted:[]
        };
    }

    callAPI() {

    	//making a get request with the fetch API
      axios({
          method: 'get',
          url: 'http://localhost:8082/',
          data:JSON.stringify({}),
          	config: { headers: {'Content-Type': 'application/json', 'Accept': 'application/json' }}
      	}) 
      	.then((response) => { 
 			 
          	this.setState({
	            allCategory:response.data.allCategory, 
                collectionCategory:response.data.collectionCategory, 
                sliders:response.data.sliders, 
                dealDay:response.data.dealDay, 
                homeBlog:response.data.homeBlog, 
                newarrival:response.data.newarrival, 
                featured:response.data.featured, 
                bestseller:response.data.bestseller, 
                saleproduct:response.data.saleproduct, 
                topratted:response.data.topratted
          	})
      	})
      .catch(function (response) {
        //handle error
        console.log(response);
      });

        /*fetch("http://localhost:8082/")
            .then(res => console.log("Response : "+res))
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);*/
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
    	let partners = this.state && this.state.sliders.length > 0 ?
        this.state.sliders.map(p=>
        	<li key={p.id}>
                <img src={p.default_image} alt={p.title}/>
            </li>
        ) : <li></li>;

        let mainSlider = this.state && this.state.sliders.length > 0 ?
        this.state.sliders.map((el, index) => (
						      <div key={index} style={{ position: "relative" }}>
						        <img src={el.default_image} data-src={el.default_image}  />
						      </div>
						    )) : <li></li>;

         

        let delayi = 3;
        let categories = this.state && this.state.allCategory.length > 0 ?
        this.state.allCategory.map(p=>
        	<li className="wow fadeInDown" data-wow-delay="0.2s" key={p.id}>
	            <a href="#">
	            <figure>
	              <img src={p.default_image} alt={p.title} title={p.title} />
	              <figcaption>
	                <div className="sc-desc">
	                  <h3>Shop {p.title}</h3>
	                  <h2>2020</h2>
	                  <div className="explorelink">Explore <i className="fas fa-long-arrow-alt-right"></i></div> 
	                </div>                
	              </figcaption>             
	            </figure>
	            </a>  
	          </li>
        ) : <li></li>;

        let newarrivals = this.state && this.state.newarrival.length > 0 ?
        this.state.newarrival.map(p=>
        	<li>
	            <article className="product-grid_artcile">
	             <figure className="product-grid-figure">
	                  <a className="product-grid-image-wrap" href="/products"><img src={p.default_image} alt={p.title} title={p.title} /></a>
	                   <figcaption className="product-grid-figcaption">
	                            <div className="product-grid_floating-badges">                      
	                              <span className="new badge">New</span>                            
	                            </div>
	                            <div className="product-grid_floating-icons">
	                              <div className="wishlist_floating"><a href="javascript:void(0);"><i className="far fa-heart"></i></a></div>
	                              <div className="addtocart_floating"><a href="#">Add to Cart</a></div>
	                            </div>                  
	                   </figcaption>
	                </figure>
	                <div className="product-grid_content">
	                  <div className="title">
	                    <h3><a href="">{p.title}</a></h3>                     
	                  </div>
	                  <div className="product-grid_rating">
	                    <div className="prodgrid_star">
	                      <ul>
	                        <li><a href="#"><i className="fas fa-star"></i></a></li>
	                        <li><a href="#"><i className="fas fa-star"></i></a></li>
	                        <li><a href="#"><i className="fas fa-star"></i></a></li>
	                        <li><a href="#"><i className="fas fa-star"></i></a></li>
	                        <li><a href="#"><i className="far fa-star"></i></a></li>
	                      </ul>
	                    </div>
	                    <div className="prodgrid-rating_count">(45)</div>
	                  </div>
	                  <div className="product-grid_price">
	                    p.discount > 0 ? 
	                    <span className="discounted-price">${p.discounted_price}</span>
	                    <span className="main-price discounted">${p.price}</span>
	                    <span className="yousave-price">${p.discount}% Off</span>
	                    :<span className="discounted-price">${p.price}</span>
	                    
	                  </div>
	                </div>
	            </article>
	          </li>
        ) : <li></li>;

        return (
        	  <Layout title='Ecommerce React Js' description='description' keywords='description' >
        	    <div>

        	    <section className="home-banner_mn">
				    <div className="container">
				    <div className="my-slider">
  <div></div>
  <div></div>
  <div></div>
</div>
				    
				     	<div className="my-slider">
				     	 
				     	 
						    {mainSlider}
					     
						 

				     	{/*this.state.sliders.length && (
			          <OwlCarousel className="owl-theme" loop margin={10} nav>
			            {this.state.sliders.map((story, index) => {
			              console.log(story); //this prints successfully everytime in loop

			              return (
			                <>
			                  <div className="item">
			                    <h4>{story}</h4>
			                  </div>
			                </>
			              );
			            })}
			          </OwlCarousel>
			        ) */}

				     	<ul className="home-slide owl-carousel">
					 	 <li><img src="images/banner01.jpg" alt="banner" title="banner" /></li>
					 	 <li><img src="images/banner01.jpg" alt="banner" title="banner" /></li>	
					 	</ul> 
					      	  
				     	</div>
				    </div>
			  	</section>

			  	<section className="small-category_mn">
				    <div className="container">
				      <div className="small-categories">
				        <ul>
				          {categories}
				                              
				        </ul>
				      </div>
				    </div>
				</section>

				<section className="home-section-mn">
				    <div className="container">
				      <div className="home-section-inner">
				        <div className="home-section-head wow fadeInDown">
				          <h2>NEW ARRIVALS</h2>
				          <em>New product of our store</em>
				        </div>
				      </div>

				      <div className="product_grid home_newarrival">
				        <ul className="newarrival-slider owl-carousel">
				           {newarrivals}
				                
				        </ul>
				      </div>
				           

				    </div>
			  	</section>
			  	 
			  	 <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
			 	<script src="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.2/min/tiny-slider.js"></script>
			  	<link rel="stylesheet" href="/node_modules/owl.carousel/dist/assets/owl.carousel.min.css" />
			  	<script src="/node_modules/jquery/dist/jquery.js"></script>
				<script src="/node_modules/owl.carousel/dist/owl.carousel.min.js"></script>
				<script dangerouslySetInnerHTML={{
	          	__html: `$(function(){$('.owl-carousel').owlCarousel({
					loop:true,
				    items:1,
				    margin:0,
				    nav:false,
				    dots:false,
				    autowidth:false
				});});
				`,
	        	}}>
	        	</script>
				 
        	     
            	</div>
              </Layout>
        );
    }
}
ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();