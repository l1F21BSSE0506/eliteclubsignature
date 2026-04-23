import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const DiscountOffers = () => {
  const { products } = useContext(ShopContext);
  const [discountProducts, setDiscountProducts] = useState([]);

  useEffect(() => {
    const filtered = products
      .filter((item) => item.discountedOffer === true || Number(item.discount) > 0)
      .sort((a, b) => Number(b.discount || 0) - Number(a.discount || 0))
      .slice(0, 5);

    setDiscountProducts(filtered);
  }, [products]);

  if (discountProducts.length === 0) return null;

  return (
    <div className='my-10'>
      <div className='text-center py-8'>
        <Title text1={'DISCOUNTED'} text2={'OFFERS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm text-gray-500 uppercase tracking-widest'>
          Featured deals managed from your admin dashboard.
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {discountProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item.id}
            image={item.images}
            name={item.name}
            price={item.price}
            discount={item.discount}
          />
        ))}
      </div>
    </div>
  );
};

export default DiscountOffers;
