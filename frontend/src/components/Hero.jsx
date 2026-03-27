import React from 'react' 
import { assets } from '../assets/assets'
const Hero = () => { 
    return ( 
     <div className="w-full relative h-[80vh] overflow-hidden">
        <img 
          className="w-full h-full object-cover" 
          src={assets.hero_img} 
          alt="hero"
        />
      </div>
    ) 
} 
export default Hero
