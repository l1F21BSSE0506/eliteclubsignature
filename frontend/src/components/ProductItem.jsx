import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price, discount }) => {
  const { currency } = useContext(ShopContext); 

  // Ensure `image` is an array and has at least one element
  const productImage = Array.isArray(image) && image.length > 0 ? image[0] : "placeholder.jpg";

  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount ? price - (price * discount / 100) : price;

  return (
    <Link className='text-gray-700 cursor-pointer' to={id ? `/product/${id}` : '#'}>
      <div className='overflow-hidden relative'>
        <img className='hover:scale-110 transition ease-in-out' src={productImage} alt={name || "Product"} />
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            {discount}% OFF
          </span>
        )}
      </div>
      <p className='pt-3 pb-1 text-sm'>{name || "No Name"}</p>
      <div className="flex gap-2 items-center">
        <p className='text-sm font-medium'>{currency}{finalPrice.toFixed(0)}</p>
        {hasDiscount && (
          <p className='text-xs text-gray-500 line-through'>{currency}{price}</p>
        )}
      </div>
    </Link>
  );
};

export default ProductItem;
