import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import { assets } from '../assets/assets'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <div className="my-10">
        <img
          src={assets.jeanbanner}
          alt="Jeans Banner"
          className="w-full h-auto rounded"
        />
      </div>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home;
