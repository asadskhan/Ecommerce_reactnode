import React, {Component} from "react";
import axios from "axios";
import Layout from "../MyLayout";
import Slider from "react-slick";
import {Link} from "react-router-dom";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCategory: [],
            collectionCategory: [],
            sliders: [],
            dealDay: [],
            homeBlog: [],
            newarrival: [],
            featured: [],
            bestseller: [],
            saleproduct: [],
            topratted: [],
            products: [],
            activeLink: 'Featured'
        };
    }

    handleClick = name => {
        const {featured, bestseller, saleproduct, topratted} = this.state;
        switch (name) {
            case 'Featured':
                this.setState({products: featured})
                break
            case 'Bestseller':
                this.setState({products: bestseller})
                break
            case 'Sale':
                this.setState({products: saleproduct})
                break
            case 'TopRate':
                this.setState({products: topratted})
                break
            default:
                this.setState({products: featured})
        }
        if (name === 'Featured') {
            this.setState({products: featured})
        }
        this.setState({activeLink: name});
    };

    callAPI() {

        //making a get request with the fetch API
        axios({
            method: 'get',
            url: 'http://localhost:8082/',
            data: JSON.stringify({}),
            config: {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}}
        })
            .then((response) => {

                this.setState({
                    allCategory: response.data.allCategory,
                    collectionCategory: response.data.collectionCategory,
                    sliders: response.data.sliders,
                    dealDay: response.data.dealDay,
                    homeBlog: response.data.homeBlog,
                    newarrival: response.data.newarrival,
                    featured: response.data.featured,
                    bestseller: response.data.bestseller,
                    saleproduct: response.data.saleproduct,
                    topratted: response.data.topratted,
                    products: response.data.featured
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
        const {activeLink} = this.state;
        const settings = {
            dots: false,
            lazyLoad: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            arrows: false,
            initialSlide: 2
        };
        var settingsOurProduct = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,
            autoplay: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        var settingsOurProductInstagram = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 7,
            slidesToScroll: 7,
            initialSlide: 0,
            autoplay: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        };
        let mainSlider = this.state && this.state.sliders.length > 0 ?
            this.state.sliders.map((el, index) => (
                <div key={index} style={{position: "relative"}}>
                    <img src={el.default_image} data-src={el.default_image}/>
                </div>
            )) : <></>;


        let delayi = 3;
        let categories = this.state && this.state.allCategory.length > 0 ? this.state.allCategory.map(p =>
            <li className="wow fadeInDown" data-wow-delay="0.2s" key={p.id}>
                <a href="#">
                    <figure>
                        <img src={p.default_image} alt={p.title} title={p.title}/>
                        <figcaption>
                            <div className="sc-desc">
                                <h3>Shop {p.title}</h3>
                                <h2>2020</h2>
                                <div className="explorelink">Explore <i className="fas fa-long-arrow-alt-right"/>
                                </div>
                            </div>
                        </figcaption>
                    </figure>
                </a>
            </li>
        ) : <></>;
        let collectionCategory = this.state && this.state.collectionCategory.length > 0 ? this.state.collectionCategory.map(p =>
                <li className="hsp_lookbook wow fadeInLeft">
                    <div className="home-special_wrap hover15">
                        <a href="#">
                            <figure>
                                <img src={p.default_image} onError={this.src = "images/lookbook.jpg"} alt="lookbook"
                                     title="lookbook"/>
                                <figcaption>
                                    <div className="hsp_link">VIEW COLLECTIONS</div>
                                    <h3>{p.title}</h3>
                                    <p>{p.text}</p>
                                </figcaption>
                            </figure>
                        </a>
                    </div>
                </li>
            ) :
            <></>;
        let homeBlog = this.state && this.state.homeBlog.length > 0 ? this.state.homeBlog.map(p =>
                <li className="wow fadeIn" data-wow-delay="0.1s">
                    <div className="homeblogs_wrap hover15">
                        <figure>
                            <a href="#"><img src={p.default_image} alt="blog" title="blog"/></a>
                        </figure>
                        <div className="homeblog_content">
                            <h4><a href="#">{p.title}</a></h4>
                            <div
                                className="homeblog_info">By <strong>Clause</strong> on <strong>{p.default_date}</strong>
                            </div>
                        </div>
                    </div>
                </li>
            ) :
            <></>;

        let newarrivals = this.state && this.state.newarrival.length > 0 ?
            this.state.newarrival.map(p =>
                <div>
                    <article className="product-grid_artcile">
                        <figure className="product-grid-figure">
                            <Link className="product-grid-image-wrap" to="/products">
                                <img src={p.default_image} alt={p.title} title={p.title}/>
                            </Link>
                            <figcaption className="product-grid-figcaption">
                                <div className="product-grid_floating-badges">
                                    <span className="new badge">New</span>
                                </div>
                                <div className="product-grid_floating-icons">
                                    <div className="wishlist_floating">
                                        <a href="javascript:void(0);">
                                            <i className="far fa-heart"/>
                                        </a>
                                    </div>
                                    <div className="addtocart_floating"><a href="#">Add to Cart</a></div>
                                </div>
                            </figcaption>
                        </figure>
                        <div className="product-grid_content">
                            <div className="title">
                                <h3><Link to="/products">{p.title}</Link></h3>
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
                                {p.discount > 0 ?
                                    <>
                                        <span className="discounted-price">${p.discounted_price}</span>
                                        <span className="main-price discounted">${p.price}</span>
                                        <span className="yousave-price">${p.discount}% Off</span>
                                    </>
                                    : <span className="discounted-price">${p.price}</span>}

                            </div>
                        </div>
                    </article>
                </div>
            ) : <li></li>;
        let featured = this.state && this.state.products.length > 0 ?
            this.state.products.map(p =>
                <li>
                    <article className="product-grid_artcile">
                        <figure className="product-grid-figure">
                            <a className="product-grid-image-wrap" href="/products"><img src={p.default_image}
                                                                                         alt={p.title} title={p.title}/></a>
                            <figcaption className="product-grid-figcaption">
                                <div className="product-grid_floating-badges">
                                    <span className="new badge">New</span>
                                </div>
                                <div className="product-grid_floating-icons">
                                    <div className="wishlist_floating">
                                        <a href="javascript:void(0);">
                                            <i className="far fa-heart"/>
                                        </a>
                                    </div>
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
                                {p.discount > 0 ?
                                    <>
                                        <span className="discounted-price">${p.discounted_price}</span>
                                        <span className="main-price discounted">${p.price}</span>
                                        <span className="yousave-price">${p.discount}% Off</span>
                                    </>
                                    : <span className="discounted-price">${p.price}</span>}

                            </div>
                        </div>
                    </article>
                </li>
            ) : <li></li>;

        let dealDay = this.state && this.state.dealDay.length > 0 ?
            this.state.dealDay.map(p =>
            <li class="hsp_saleprod wow fadeIn">
                <article class="product-grid_artcile">
                    <figure class="product-grid-figure">
                      <a class="product-grid-image-wrap" href="#"><img src={p.default_image} alt={p.title} title={p.title} /></a>
                       <figcaption class="product-grid-figcaption">                   
                                <div class="product-grid_floating-badges">                      
                                  <span class="sale badge">Sale</span>                            
                                </div>
                                <div class="product-grid_floating-icons">
                                  <div class="wishlist_floating"><a href="javascript:;"><i class="far fa-heart"></i></a></div>
                                  <div class="addtocart_floating"><a href="#">Add to Cart</a></div>
                                </div>                  
                       </figcaption>
                    </figure>

                    <div class="product-grid_content">
                        <div class="countdown_mn">
                            <span id="future_date"></span>
                        </div>
                        <div class="title">
                            <h3><a href="">{p.title}</a></h3>                     
                        </div>                  
                        <div class="product-grid_price">
                            <span class="discounted-price">${p.discounted_price}</span>
                            <span class="main-price discounted">${p.price}</span>
                        </div>
                    </div>
                </article>
            </li>
            ) :  <li></li>;

        return (
            <Layout>
                <div>
                    <section className="home-banner_mn">
                            <div className="my-slider">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>

                            <div className="my-slider">
                                <Slider {...settings}>
                                    {mainSlider}
                                </Slider>
                            </div>
                    </section>

                    {/*<section className="small-category_mn">
                        <div className="container">
                            <div className="small-categories">
                                <ul>
                                    {categories}
                                </ul>
                            </div>
                        </div>
                    </section>*/}

                    <section className="small-category_mn">
                        <div className="container">
                            <div className="small-categories">
                                <ul>
                                    <li className="wow fadeInDown" data-wow-delay="0.1s">
                                        <a href="#">
                                            <figure>
                                                <img src="images/cate-img01.jpg" alt="Shop women" title="Shop women"/>
                                                <figcaption>
                                                    <div className="sc-desc">
                                                        <h3>Shop women</h3>
                                                        <h2>2020</h2>
                                                        <div className="explorelink">Explore <i
                                                            className="fas fa-long-arrow-alt-right"></i>
                                                        </div>
                                                    </div>
                                                </figcaption>
                                            </figure>
                                        </a>
                                    </li>
                                    <li className="wow fadeInDown" data-wow-delay="0.3s">
                                        <a href="#">
                                            <figure>
                                                <img src="images/cate-img02.jpg" alt="Shop Men" title="Shop Men"/>
                                                <figcaption>
                                                    <div className="sc-desc">
                                                        <h3>Shop Men</h3>
                                                        <h2>Flash Sale</h2>
                                                        <div className="explorelink">Explore <i
                                                            className="fas fa-long-arrow-alt-right"></i>
                                                        </div>
                                                    </div>
                                                </figcaption>
                                            </figure>
                                        </a>
                                    </li>
                                    <li className="wow fadeInDown" data-wow-delay="0.5s">
                                        <a href="#">
                                            <figure>
                                                <img src="images/cate-img03.jpg" alt="Accessories" title="Accessories"/>
                                                <figcaption>
                                                    <div className="sc-desc">
                                                        <h3>Accessories</h3>
                                                        <h2>Style up</h2>
                                                        <div className="explorelink">Explore <i
                                                            className="fas fa-long-arrow-alt-right"></i>
                                                        </div>
                                                    </div>
                                                </figcaption>
                                            </figure>
                                        </a>
                                    </li>
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
                                <Slider {...settingsOurProduct} className="newarrival-slider">
                                    {newarrivals}
                                </Slider>
                            </div>
                        </div>
                    </section>
                    <section className="home-special-mn">
                        <div className="container">
                            <div className="home-special">
                                <ul>
                                    {collectionCategory}
                                    {dealDay}
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section className="home-section-mn">
                        <div className="container">
                            <div className="home-section-inner">
                                <div className="home-section-head wow fadeInDown">
                                    <h2>OUR PRODUCTS</h2>
                                    <em>Top view in the week</em>
                                </div>
                            </div>
                            <div id="horizontaltab">
                                <ul className="resp-tabs-list">
                                    <li className={"wow fadeInDown" + ('Featured' === activeLink ? " active" : "")}
                                        data-wow-delay="0.1s"><a
                                        href="javascript:void(0)"
                                        onClick={() => this.handleClick('Featured')}>Featured</a></li>
                                    <li className={"wow fadeInDown" + ('Bestseller' === activeLink ? " active" : "")}
                                        data-wow-delay="0.3s"><a
                                        href="javascript:void(0)"
                                        onClick={() => this.handleClick('Bestseller')}>Bestseller</a></li>
                                    <li className={"wow fadeInDown" + ('Sale' === activeLink ? " active" : "")}
                                        data-wow-delay="0.6s"><a href="javascript:void(0)"
                                                                 onClick={() => this.handleClick('Sale')}>Sale</a></li>
                                    <li className={"wow fadeInDown" + ('TopRate' === activeLink ? " active" : "")}
                                        data-wow-delay="0.8s"><a href="javascript:void(0)"
                                                                 onClick={() => this.handleClick('TopRate')}>Top
                                        Rate</a>
                                    </li>
                                </ul>
                                <div className="resp-tabs-container">
                                    <div id="featured">
                                        <div className="product_grid home-our-prod">
                                            <ul>
                                                {featured}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="home-section-mn">
                        <div className="container">
                            <div className="home-section-inner">
                                <div className="home-section-head wow fadeInDown">
                                    <h2>LATEST FROM BLOG</h2>
                                    <em>The freshest and most exciting news</em>
                                </div>
                                <div className="homeblogs">
                                    <ul>
                                        {homeBlog}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="home-section-mn">
                        <div className="home-section-inner">
                            <div className="container">
                                <div className="home-section-head wow fadeInDown">
                                    <h2>@ FOLLOW US ON INSTAGRAM</h2>
                                </div>
                            </div>
                            <div className="home-instagram">
                                <Slider {...settingsOurProductInstagram} className="instagram-slide">
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block2.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block3.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block4.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block2.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block3.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block4.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block2.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block3.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block4.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block2.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block3.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block4.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block2.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block3.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block4.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block2.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block3.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block4.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block2.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block3.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#">
                                            <div className="insta-img">
                                                <img src="images/insta-block4.jpg" alt="instagram" title="instagram"/>
                                            </div>
                                            <div className="insta-hover">
                                                <div className="insta-hover-inner">
                                                    <div className="insta-likes"><i className="far fa-heart"/> 505</div>
                                                    <div className="insta-comments"><i className="far fa-comments"/> 20
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </section>
                    <section className="hbtm-info-mn">
                        <div className="container">
                            <div className="hbtm-info-wrap">
                                <ul>
                                    <li className="wow fadeIn" data-wow-delay="0.1s">
                                        <div className="infowrap_row">
                                            <div className="left-colmn">
                                                <i className="fas fa-truck"/>
                                            </div>
                                            <div className="right-colmn">
                                                <h5>FREE SHIPPING</h5>
                                                <p>Free shipping on all US order or order above $200</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="wow fadeIn" data-wow-delay="0.3s">
                                        <div className="infowrap_row">
                                            <div className="left-colmn">
                                                <i className="fas fa-headset"/>
                                            </div>
                                            <div className="right-colmn">
                                                <h5>SUPPORT 24/7</h5>
                                                <p>Contact us 24 hours a day, 7 days a week</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="wow fadeIn" data-wow-delay="0.5s">
                                        <div className="infowrap_row">
                                            <div className="left-colmn">
                                                <i className="fas fa-undo-alt"/>
                                            </div>
                                            <div className="right-colmn">
                                                <h5>30 DAYS RETURN</h5>
                                                <p>Simply return it within 30 days for an exchange.</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="wow fadeIn" data-wow-delay="0.7s">
                                        <div className="infowrap_row">
                                            <div className="left-colmn">
                                                <i className="far fa-credit-card"/>
                                            </div>
                                            <div className="right-colmn">
                                                <h5>100% PAYMENT SECURE</h5>
                                                <p>We ensure secure payment with PEV</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        );
    }
}
