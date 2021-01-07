import React from 'react';
import {Link} from "react-router-dom";

function ProductItems({items}) {
    return (
        <>
            <li>
                <article className="product-grid_artcile">
                    <figure className="product-grid-figure">
                        <Link className="product-grid-image-wrap" to={"/product/" + items.id}><img
                            src={items.default_image}
                            alt={items.title}
                            title={items.title}/></Link>
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
                            <h3><Link  to={"/product/" + items.id}>{items.title}</Link></h3>
                        </div>
                        <div className="product-grid_rating">
                            <div className="prodgrid_star">
                                <ul>
                                    <li><a href="#"><i className="fas fa-star"/></a></li>
                                    <li><a href="#"><i className="fas fa-star"/></a></li>
                                    <li><a href="#"><i className="fas fa-star"/></a></li>
                                    <li><a href="#"><i className="fas fa-star"/></a></li>
                                    <li><a href="#"><i className="far fa-star"/></a></li>
                                </ul>
                            </div>
                            <div className="prodgrid-rating_count">(4)</div>
                        </div>
                        <div className="product-grid_price">
                            {items.discount > 0 ?
                                <>
                                    <span className="discounted-price">{items.discounted_price}</span>
                                    <span className="main-price discounted">{items.price}</span>
                                    <span className="yousave-price">{items.discount}% Off</span>
                                </>
                                : <span className="discounted-price">{items.price}</span>}

                        </div>
                    </div>
                </article>
            </li>
        </>
    );
}

export default ProductItems;
