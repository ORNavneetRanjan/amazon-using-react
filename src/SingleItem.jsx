import { useState } from 'react';
import { TiDelete } from "react-icons/ti";

function SingleItem({ link, title, price, quantity, id, fun, updateQuantity }) {
    function handleRemove() {
        fun(id);
    }
    const [newQuantity, setQuantity] = useState(quantity);
    function handleUpdateCart(event) {
        setQuantity(event.target.value);
        updateQuantity(id, parseInt(event.target.value));
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
                    <input
                        type='number'
                        min={0}
                        onChange={handleUpdateCart}
                        value={newQuantity}
                        className="p-2 text-lg border shadow-md w-16"
                    />
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
