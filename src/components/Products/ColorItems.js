import React from 'react';

function ColorItems({items, handelColorChange}) {
    return (
        <>
            <li style={{backgroundColor: items.clrCode}}><a href="javascript:;" onClick={e => {
                handelColorChange(items.id)
            }}/></li>
        </>
    );
}

export default ColorItems;
