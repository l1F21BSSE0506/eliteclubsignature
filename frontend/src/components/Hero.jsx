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
        <div className="absolute inset-0 bg-black/10 flex flex-col justify-center items-center text-white p-4">
          <p className="uppercase tracking-[0.3em] text-sm mb-4">New Season, New Styles</p>
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-8">Big Mood Summer</h1>
          <button className="px-8 py-3 border border-white uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all">Shop Now</button>
        </div>
      </div>
    ) 
} 
export default Hero