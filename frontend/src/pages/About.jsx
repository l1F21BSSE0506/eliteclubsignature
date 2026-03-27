import React from 'react'
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2 = {'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <b className='text-gray-800'>Who are we?</b>
          <p>Founded in 2024, this brand is a modern lifestyle and streetwear label known for high-quality sustainable basics and lifestyle.</p>
          <b className='text-gray-800'>Vision</b>
          <p>Focus: Timelessness, Quality, and Quiet Luxury. To redefine the modern wardrobe by blending heritage-quality craftsmanship with contemporary silhouettes, ensuring that every member of the Elite Club carries a legacy of excellence in every thread.</p>
          <b className='text-gray-800'>Core Values</b>
          <ul className='list-disc ml-5 space-y-2'>
            <li>Uncompromising Quality: We believe “good enough” is the enemy of “elite.” Every detail, from fabric to finishing, must be flawless.</li>
            <li>Timeless Sophistication: We don't chase trends; we set the standard. Our designs are built to outlast the season.</li>
            <li>Discreet Exclusivity: True status doesn't need to shout. We value the “if you know, you know” connection with our community.</li>
          </ul>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We meticulously select ond vet each product to ensure it meets our stringent quoty standards.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience::</b>
          <p className='text-gray-600'>With our user-friendly interface and hassle free ordering process, shopping has never been easier.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority</p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About;
