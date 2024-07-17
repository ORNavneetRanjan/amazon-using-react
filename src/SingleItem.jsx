import React from 'react';
import { TiDelete } from "react-icons/ti";

function SingleItem({ link, title, price, quantity }) {
    return (
        <>
            <div className="grid grid-cols-6 items-center gap-4 p-4">
                <TiDelete className='text-2xl' />
                <div className='flex items-center col-span-2'>
                    <img className="w-16 h-16 object-cover" src={link} alt={title} />
                    <p className="ml-4 text-lg font-medium">{title}</p>
                </div>
                <p className="text-lg font-bold">${price}</p>
                <span>
                <input className="p-2 text-lg border shadow-md" value={quantity} maxlength="2" size="2" />
                </span>
                <p className='text-lg font-bold'>${price * quantity}</p>
            </div>
            <hr />
        </>
    );
}

export default SingleItem;
