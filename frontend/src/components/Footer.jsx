import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600 uppercase tracking-widest text-[10px]'>
              LAMA is a lifestyle brand based in Pakistan. We provide high-quality fashion at affordable prices.
            </p>
        </div>
        <div>
            <p className='text-sm font-semibold mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600 text-[12px]'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className='text-sm font-semibold mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600 text-[12px]'>
                <li>+92 321 444 5262</li>
                <li>care@lamaretail.com</li>
                <li>Instagram</li>
                <li>Facebook</li>
                <li>YouTube</li>
                <li>TikTok</li>
            </ul>
        </div>
      </div>
      <div>
            <hr />
            <p className='py-5 text-xs text-center uppercase tracking-widest text-gray-500'>© 2024 LAMA RETAIL. ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  )
}

export default Footer;
