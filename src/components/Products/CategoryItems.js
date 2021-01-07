import React from 'react';

function CategoryItems({items, handelCategoryChange}) {
    return (
        <>
            <li>
                <label className="sb_checkbox">{items.name}
                    <input type="checkbox" onChange={e => {
                        handelCategoryChange(e)
                    }} value={items.id}/>
                    <span className="checkmark"/>
                </label>
                <div className="sb-count">({items.count})</div>
            </li>
        </>
    );
}

export default CategoryItems;
