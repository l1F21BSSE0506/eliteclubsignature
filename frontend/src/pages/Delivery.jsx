import React from 'react'
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';

const Delivery = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'DELIVERY'} text2={'INFO'}/>
      </div>
      <div className='my-10 flex flex-col gap-6 text-gray-600 max-w-3xl mx-auto'>
        <p>We aim to deliver your order swiftly and safely. Standard delivery times range between 2–5 business days within Pakistan.</p>
        <p>Orders are processed within 24 hours. You will receive a confirmation and tracking details via email once your package ships.</p>
        <p>Delivery charges may apply based on location and order size. Cash on Delivery is available nationwide.</p>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Delivery
