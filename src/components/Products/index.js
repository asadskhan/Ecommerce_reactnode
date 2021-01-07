import React, {useEffect, useState} from 'react';
import Layout from "../MyLayout";
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import ProductItems from "./productItems";
import CategoryItems from "./CategoryItems";
import BrandItems from "./BrandItems";
import ColorItems from "./ColorItems";
import Slider from '@material-ui/core/Slider';
import makeStyles from "@material-ui/core/styles/makeStyles";
function valuetext(value) {
    return `${value}°C`;
}

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

function Products() {
    const classes = useStyles();
    let history = useHistory();
    const [value, setValue] = React.useState([0, 1000]);

    const [allProducts, setAllProduct] = useState([]);
    const [categoryLists, setCategoryLists] = useState([]);
    const [brandLists, setBrandLists] = useState([]);
    const [colorLists, setColorLists] = useState([]);
    const [brandArray, setBrandArray] = useState([]);
    const [categoryArray, setCategoryArray] = useState([]);
    const [colorArray, setColorArray] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    let [colorFilter, setColorFilter] = useState('');
    let [priceFilter, setPriceFilter] = useState('');
    let [sortFilter, setSortFilter] = useState('');
    useEffect(() => {
        callAPI();
    }, []);

    /**
     * Product List
     * */
    const callAPI = (filter = '') => {
        //making a get request with the fetch API
        if(filter) {
            history.push(filter);
        }
        axios({
            method: 'get',
            url: 'http://localhost:8082/products' + filter,
            data: JSON.stringify({}),
            config: {headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}}
        })
            .then((response) => {
                console.log('response.data', response.data);
                setAllProduct(response.data.allProduct)
                setCategoryLists(response.data.categoryLists)
                setBrandLists(response.data.brandLists)
                setColorLists(response.data.colorLists)
            })
            .catch(function (response) {
                console.log(response);
            });
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
        let filter = 'min_price=' + newValue[0] + '&max_price=' + +newValue[1]
        setPriceFilter(filter)
        callAPI(getFilters('price', filter))
        console.log(newValue)
    };
    const handleSortChange = (event) => {
        let filter = 'sort=' + event.target.value
        setSortFilter(filter)
        callAPI(getFilters('sort', filter))
    };
    const parameterizeArray = (key, brandArray) => {
        brandArray = brandArray.map(encodeURIComponent)
        return key + '[]=' + brandArray.join('&' + key + '[]=')
    }
    const handelCategoryChange = (event) => {
        console.log(event.target.checked)
        //parameterizeArray('brand', brandArray);
        // const filter = '?brand[]=1&brand[]=4&category[]=18&category[]=19&color=1&min_price=201&max_price=1000'
        let isChecked = event.target.checked;
        if (isChecked) {
            categoryArray.push(event.target.value)
        } else {
            const index = categoryArray.indexOf(event.target.value);
            if (index > -1) {
                categoryArray.splice(index, 1);
            }
        }
        let filter = parameterizeArray('category', categoryArray);
        setCategoryFilter(filter)
        callAPI(getFilters('category', filter))
    }
    const getFilters = (filter, option) => {
        let filterFinal = '';
        if (filter === 'category') {
            colorFilter = colorFilter ? '&' + colorFilter : ''
            priceFilter = priceFilter ? '&' + priceFilter : ''
            sortFilter = sortFilter ? '&' + sortFilter : ''
            filterFinal = brandFilter ? '?' + brandFilter + '&' + option + colorFilter + priceFilter + sortFilter : '?' + option + colorFilter + priceFilter + sortFilter
        }
        if (filter === 'brand') {
            colorFilter = colorFilter ? '&' + colorFilter : ''
            priceFilter = priceFilter ? '&' + priceFilter : ''
            sortFilter = sortFilter ? '&' + sortFilter : ''
            filterFinal = categoryFilter ? '?' + categoryFilter + '&' + option + colorFilter + priceFilter + sortFilter : '?' + option + colorFilter + priceFilter + sortFilter
        }
        if (filter === 'color') {
            if (brandFilter
                || categoryFilter
                || priceFilter
                || sortFilter) {
                filterFinal = '?' + brandFilter + '&'  + priceFilter + '&'  + sortFilter + '&' + categoryFilter + '&' + option
            } else {
                filterFinal = '?' + option
            }
        }
        if (filter === 'price') {
            if (brandFilter
                || categoryFilter
                || colorFilter
                || sortFilter) {
                filterFinal = '?' + colorFilter + '&' + sortFilter + '&' + brandFilter + '&' + categoryFilter + '&' + option
            } else {
                filterFinal = '?' + option
            }
        }
        if (filter === 'sort') {
            if (brandFilter
                || categoryFilter
                || colorFilter
                || priceFilter) {
                filterFinal = '?' + colorFilter + '&' + brandFilter + '&' + categoryFilter + '&' + priceFilter + '&' + option
            } else {
                filterFinal = '?' + option
            }
        }
        return filterFinal;
    }
    const handelBrandChange = (event) => {
        console.log(event)
        let isChecked = event.target.checked;
        if (isChecked) {
            brandArray.push(event.target.value)
        } else {
            const index = brandArray.indexOf(event.target.value);
            if (index > -1) {
                brandArray.splice(index, 1);
            }
        }
        let filter = parameterizeArray('brand', brandArray);
        setBrandFilter(filter)
        callAPI(getFilters('brand', filter))
    }
    const handelColorChange = (event) => {
        console.log(event)
        let filter = 'color=' + event;
        setColorFilter(filter)
        callAPI(getFilters('color', filter))
    }
    return (
        <Layout>
            <section className="breadcrumbs">
                <div className="container">
                    <div className="breadcrumb">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li>Men</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="listing_pageMn">
                <div className="container">
                    <div className="listing_page">
                        <div className="page_heading mobile_heading">
                            <h1>OUR PRODUCTS</h1>
                        </div>
                        <div className="sb_filter_toggle">Filter</div>
                        <aside className="listing_sidebar">
                            <div className="sb_filterMn">
                                <div id="sbcategory-head" className="sb_filter_title">
                                    <h2>Filter by Category</h2>
                                </div>
                                <div id="sbcategory-content" className="sb_filter_content sb_filter_checkbox">
                                    <ul>
                                        {categoryLists
                                        && categoryLists.length
                                        && categoryLists.map(item => {
                                            return <CategoryItems items={item}
                                                                  handelCategoryChange={handelCategoryChange}/>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="sb_filterMn">
                                <div id="sbbrand-head" className="sb_filter_title">
                                    <h2>Filter by Brand</h2>
                                </div>
                                <div id="sbbrand-content" className="sb_filter_content sb_filter_checkbox">
                                    <ul>
                                        {brandLists
                                        && brandLists.length
                                        && brandLists.map(item => {
                                            return <BrandItems items={item} handelBrandChange={handelBrandChange}/>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="sb_filterMn">
                                <div id="sbcolor-head" className="sb_filter_title">
                                    <h2>Filter by Color</h2>
                                </div>
                                <div id="sbcolor-content" className="sb_filter_content sb_filter_color">
                                    <ul>
                                        {colorLists
                                        && colorLists.length
                                        && colorLists.map(item => {
                                            return <ColorItems items={item} handelColorChange={handelColorChange}/>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="sb_filterMn">
                                <div id="sbprice-head" className="sb_filter_title">
                                    <h2>Filter by Price</h2>
                                </div>
                                <div id="sbprice-content" className="sb_filter_content sb_filter_price">
                                    <Slider
                                        value={value}
                                        max={1000}
                                        onChange={handleChange}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="range-slider"
                                        getAriaValueText={valuetext}
                                    />
                                    {/* <div className="slider-labels">
                                        <div className="caption">
                                            <span id="slider-range-value1"/>
                                        </div>
                                        <div className="caption">
                                            <span id="slider-range-value2"/>
                                        </div>
                                    </div>
                                    <div className="pr-range-wrap">
                                        <div id="slider-range"/>
                                    </div>*/}
                                </div>
                            </div>
                        </aside>
                        <main className="listing-productsMn">
                            <div className="page_heading">
                                <h1>OUR PRODUCTS</h1>
                            </div>
                            <div className="listing_actionBar">
                                <div className="sortby">
                                    <select name="sort" id="sort" onChange={(e) => handleSortChange(e)}>
                                        <option value selected>Sort by Position</option>
                                        <option value="featured">Featured Items</option>
                                        <option value="newest">Newest Items</option>
                                        <option value="bestselling">Best Selling</option>
                                        <option value="alphaasc">A to Z</option>
                                        <option value="alphadesc">Z to A</option>
                                        <option value="avgcustomerreview">By Review</option>
                                        <option value="priceasc">Price: Ascending</option>
                                        <option value="pricedesc">Price: Descending</option>
                                    </select>
                                </div>
                                <div className="paginationMn">
                                    <div className="page_prev"><a href="#">Prev</a></div>
                                    <div className="pagination">
                                        <ul>
                                            <li><a href="#">1</a></li>
                                            <li className="active"><a href="#">2</a></li>
                                            <li><a href="#">3</a></li>
                                        </ul>
                                    </div>
                                    <div className="page_next"><a href="#">Next</a></div>
                                </div>
                            </div>
                            <div className="listing-products">
                                <div className="product_grid">
                                    <ul>
                                        {allProducts
                                        && allProducts.length
                                        && allProducts.map(item => {
                                            return <ProductItems items={item}/>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="listing_actionBar lp_bottom">
                                <div className="paginationMn">
                                    <div className="page_prev"><a href="#">Prev</a></div>
                                    <div className="pagination">
                                        <ul>
                                            <li><a href="#">1</a></li>
                                            <li className="active"><a href="#">2</a></li>
                                            <li><a href="#">3</a></li>
                                        </ul>
                                    </div>
                                    <div className="page_next"><a href="#">Next</a></div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default Products;
