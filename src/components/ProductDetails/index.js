import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Slider from "react-slick";
import Layout from "../MyLayout";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

function ProductDetails() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    var settingsOurProduct = {
        dots: false,
        infinite: true,
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
    const [productId, setProductId] = useState("");
    const [productCount, setProductCount] = useState(1);
    const [productDetails, setProductDetails] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [productReviwes, setProductReviwes] = useState([]);
    const [productImages, setProductImages] = useState([]);
    // retrieve params into a variable
    const params = useParams();
    useEffect(() => {
        setProductId(params.id)
        callAPI(params.id);
    }, []);

    /**
     * Product Details
     * */
    const callAPI = (pId) => {

        //making a get request with the fetch details API
        axios({
            method: 'get',
            url: 'http://localhost:8082/product/' + pId,
            data: JSON.stringify({}),
            config: {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}}
        })
            .then((response) => {
                console.log('response.data', response.data);
                setProductDetails(response.data.products[0]);
                setRelatedProduct(response.data.ralatedProduct);
                setProductImages(response.data.images);
                setProductReviwes(response.data.reviwes);
            })
            .catch(function (response) {
                console.log(response);
            });
    }

    function dynamicHtml(html) {
        return {
            __html: html
        };
    }

    const IncrementItem = () => {
        setProductCount(productCount + 1);
    }
    const DecreaseItem = () => {
        if (productCount > 0) {
            setProductCount(productCount - 1);
        }
    }
    return (
        <Layout>
            <section className="breadcrumbs">
                <div className="container">
                    <div className="breadcrumb">
                        <ul>
                            {/* <li><a href="/">Home</a></li> */}
                            <li><Link to="/">Home</Link>{' '}</li>
                            {/* <li><a href="/">Men</a></li> */}
                            <li><Link to="/">Men</Link>{' '}</li>
                            <li>{productDetails.title}</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="prd_detailMn">
                <div className="container">
                    <div className="prd_detail_wrap">
                        <div className="prd_detail_info">
                            <div className="prd_detail_heading mobile_heading">
                                <h1>{productDetails.title}</h1>
                            </div>
                            <div className="prd_detail_left">
                                <div className="prod_view_mainimage">
                                    <figure>
                                        <a href="javascript:;"><img src={productDetails.default_image} alt="prodview"
                                                                    title="prodview"/></a>
                                    </figure>
                                </div>
                                <div className="prod_view_thumbimage">
                                    <ul className="thumbslider owl-carousel">
                                        <li>
                                            <figure><a href="javascript:;"><img src="images/prodthumb.jpg"
                                                                                alt="prodthumb" title="prodthumb"/></a>
                                            </figure>
                                        </li>
                                        <li>
                                            <figure><a href="javascript:;"><img src="images/prodthumb.jpg"
                                                                                alt="prodthumb" title="prodthumb"/></a>
                                            </figure>
                                        </li>
                                        <li>
                                            <figure><a href="javascript:;"><img src="images/prodthumb.jpg"
                                                                                alt="prodthumb" title="prodthumb"/></a>
                                            </figure>
                                        </li>
                                        <li>
                                            <figure><a href="javascript:;"><img src="images/prodthumb.jpg"
                                                                                alt="prodthumb" title="prodthumb"/></a>
                                            </figure>
                                        </li>
                                        <li>
                                            <figure><a href="javascript:;"><img src="images/prodthumb.jpg"
                                                                                alt="prodthumb" title="prodthumb"/></a>
                                            </figure>
                                        </li>
                                        <li>
                                            <figure><a href="javascript:;"><img src="images/prodthumb.jpg"
                                                                                alt="prodthumb" title="prodthumb"/></a>
                                            </figure>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="prd_detail_right">
                                <div className="prd_detail_heading">
                                    <h1>{productDetails.title}</h1>
                                </div>
                                <div className="pd_reviewMn">
                                    <div className="prodgrid_star">
                                        <Rating name="half-rating-read" value={parseFloat(productDetails.avrageratting)}
                                                precision={0.5} readOnly/>
                                    </div>
                                    <div className="pd_rating_count">({productDetails.totalReview} Reviews)</div>
                                    <div className="pd_writereview"><a id="openreviewlink">Write a
                                        Review</a>
                                    </div>
                                </div>
                                <div className="pd_detailsWrp">
                                    <div className="product-grid_price">
                                        {productDetails.discount ? <>
                                                <span className="discounted-price">{productDetails.price}</span>
                                                <span
                                                    className="main-price discounted">{productDetails.discounted_price}</span>
                                                <span className="yousave-price">${productDetails.discount}% Off</span>
                                            </> :
                                            <span className="discounted-price">{productDetails.price}</span>}
                                    </div>
                                    <div className="pd_details_info">
                                        <div className="pd_details_row">
                                            <div className="left_dt">Product ID:</div>
                                            <div className="right_dd">00129</div>
                                        </div>
                                        <div className="pd_details_row">
                                            <div className="left_dt">Shipping:</div>
                                            <div className="right_dd">$10.00</div>
                                        </div>
                                        <div className="pd_details_row">
                                            <div className="left_dt">Delivery:</div>
                                            <div className="right_dd">5-7 Business Days</div>
                                        </div>
                                        <div className="pd_details_row">
                                            <div className="left_dt">Quantity:</div>
                                            <div className="right_dd">
                                                <div className="quantity buttons_added">
                                                    <input type="number" step={1} min={1} max name="quantity"
                                                           defaultValue={productCount} value={productCount} title="Qty"
                                                           className="input-text qty text"
                                                           size={4} pattern inputMode/>
                                                    <button className="minus" onClick={e => {
                                                        DecreaseItem()
                                                    }}><i className="fas fa-minus"/></button>
                                                    <button className="plus" onClick={e => {
                                                        IncrementItem()
                                                    }}><i className="fas fa-plus"/></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pd_actions">
                                        <div className="btn-groups-wrp">
                                            <button className="btn-secondry" href="#">Buy Now</button>
                                        </div>
                                        <div className="btn-groups-wrp">
                                            <button type="submit" className="btn-primary">Add to Cart</button>
                                        </div>
                                        <div className="btn-groups-wrp">
                                            <button href="#" className="btn-wishlist"><i className="far fa-heart"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="pd_info_list">
                                        <ul>
                                            <li>
                                                <div className="icon"><i className="far fa-eye"/></div>
                                                <div className="content">140 Viewing This Product</div>
                                            </li>
                                            <li>
                                                <div className="icon"><i className="far fa-check-circle"/></div>
                                                <div className="content">Verified Purchase (994)</div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="pincode_box">
                                        <input type="text" placeholder="Enter Pincode for delivery" name="pincode"/>
                                        <input type="submit" defaultValue="Check"/>
                                        <div className="form-inlineMessage error" style={{display: 'block'}}><i
                                            className="fas fa-exclamation-circle"/> Please enter a valid pincode.
                                        </div>
                                        <div className="form-inlineMessage success" style={{display: 'block'}}><i
                                            className="far fa-check-circle"/> COD is available on 0000
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="prod_detail_tabs" className="prd_detail_tabing">
                            <Paper position="static">
                                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                    <Tab label="Description" {...a11yProps(0)} />
                                    <Tab label="Specifications" {...a11yProps(1)} />
                                    <Tab label="Reviews" {...a11yProps(2)} />
                                </Tabs>
                            </Paper>
                            <TabPanel value={value} index={0}>
                                <div id="description"
                                     dangerouslySetInnerHTML={dynamicHtml(productDetails.description)}/>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <div id="specifications"
                                     dangerouslySetInnerHTML={dynamicHtml(productDetails.specification)}/>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <div id="reviews">
                                    <div id="openreviewtab"/>
                                    <div className="customer-review-Mn">
                                        <div className="customer-review-head">
                                            <h2 className="customer-review-tilte">{productReviwes.length} Reviews</h2>
                                        </div>
                                        <div className="customer-review-lists">
                                            {productReviwes
                                            && productReviwes.length
                                                ? productReviwes.map(item => {
                                                    return <div className="customer-review">
                                                        <h4 className="name">{item.name}</h4>
                                                        <div className="customer-review-wrap">
                                                            <Rating
                                                                name="simple-controlled"
                                                                value={item.ratting}
                                                                readOnly
                                                            />
                                                            <span className="date">{item.created_at}</span>
                                                        </div>
                                                        <p className="content">{item.message}</p>
                                                    </div>
                                                }) : ""}
                                        </div>
                                    </div>
                                    <div className="prod-reviewsform">
                                        <h2>Add a Review</h2>
                                        <div className="form_Mn">
                                            <div className="form-field">
                                                <label className="form-label" htmlFor>Full Name</label>
                                                <input type="text" name className="form-input"/>
                                            </div>
                                            <div className="form-field">
                                                <label className="form-label" htmlFor>Email
                                                    Address<span>*</span></label>
                                                <input className="form-input" name type="email"/>
                                            </div>
                                            <div className="form-field">
                                                <label className="form-label" htmlFor>Message<span>*</span></label>
                                                <textarea className="form-textarea" defaultValue={""}/>
                                            </div>
                                            <div className="form-field">
                                                <label className="form-label" htmlFor>Select
                                                    Rating<span>*</span></label>
                                                <div className="star-rating">
                                                    <input type="radio" id="5-stars" name="rating" defaultValue={5}/>
                                                    <label htmlFor="5-stars" className="star">★</label>
                                                    <input type="radio" id="4-stars" name="rating" defaultValue={4}/>
                                                    <label htmlFor="4-stars" className="star">★</label>
                                                    <input type="radio" id="3-stars" name="rating" defaultValue={3}/>
                                                    <label htmlFor="3-stars" className="star">★</label>
                                                    <input type="radio" id="2-stars" name="rating" defaultValue={2}/>
                                                    <label htmlFor="2-stars" className="star">★</label>
                                                    <input type="radio" id="1-star" name="rating" defaultValue={1}/>
                                                    <label htmlFor="1-star" className="star">★</label>
                                                </div>
                                            </div>
                                            <div className="form-actions text-center">
                                                <input type="submit" className="button btn-secondry"
                                                       defaultValue="Submit"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </div>
                        <div className="prd_detail_relatedMn">
                            <div className="home-section-inner">
                                <div className="home-section-head wow fadeInDown">
                                    <h2>RELATED PRODUCTS</h2>
                                    <em>Check items to add to the cart</em>
                                </div>
                            </div>
                            <div className="product_grid prd_detail_related home_newarrival">
                                <Slider {...settingsOurProduct}>
                                    {relatedProduct
                                    && relatedProduct.length
                                    && relatedProduct.map(p => {
                                            return <div>
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
                                                                <div className="addtocart_floating"><a href="#">Add to
                                                                    Cart</a></div>
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
                                                                    <span
                                                                        className="discounted-price">${p.discounted_price}</span>
                                                                    <span
                                                                        className="main-price discounted">${p.price}</span>
                                                                    <span
                                                                        className="yousave-price">${p.discount}% Off</span>
                                                                </>
                                                                : <span className="discounted-price">${p.price}</span>}

                                                        </div>
                                                    </div>
                                                </article>
                                            </div>
                                        }
                                    )}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default ProductDetails;
