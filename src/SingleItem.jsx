import React from 'react';
import { TiDelete } from "react-icons/ti";
function SingleItem({ link, title, price, quantity, id , fun}) {
    function handleRemove(){
        fun(id);
    }
    return (
        <>
            <div className="grid grid-row-6 lg:grid-cols-6 items-center justify-center gap-4 p-4">
                <button onClick={handleRemove}><TiDelete className='text-2xl' /></button>
                <div className='flex items-center col-span-2'>
                    <img className="w-16 h-16 object-cover" src={link} alt={title} />
                    <p className="ml-4 text-lg font-medium">{title}</p>
                </div>
                <span>
                <p className='visible lg:invisible'>Price</p>
                <p className="text-lg font-bold">${price}</p>
                </span>
                <span>
                    <p className='visible lg:invisible'>Quantity</p>
                <input className="p-2 text-lg border shadow-md" disabled value={quantity} maxLength="2" size="2" />
                </span>
                <span>
                    <p className='visible lg:invisible'>SubTotal</p>
                <p className='text-lg font-bold'>${price * quantity}</p>
                </span>
            </div>
            <hr />
        </>
    );
}

export default SingleItem;
