import React from 'react';

function BrandItems({items, handelBrandChange}) {
    return (
        <>
            <li>
                <label className="sb_checkbox">{items.name}
                    <input type="checkbox" value={items.id} onChange={e => {
                        handelBrandChange(e)
                    }}/>
                    <span className="checkmark"/>
                </label>
                <div className="sb-count">({items.count})</div>
            </li>
        </>
    );
}

export default BrandItems;
