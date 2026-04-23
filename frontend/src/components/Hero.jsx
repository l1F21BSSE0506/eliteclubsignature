import React from 'react' 
import { assets } from '../assets/assets'
const Hero = () => { 
    return ( 
     <div className="w-full relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen overflow-hidden border border-gray-400">
        {/* Background Image - Full Cover */}
        <div className="absolute inset-0 w-full h-full">
            <img 
              className="w-full h-full object-cover" 
              src={assets.hero_img} 
              alt="hero"
            />
            {/* Subtle Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-white/30"></div>
        </div>

        {/* Text Overlay - Matching Reference Style */}
        <div className="relative h-full flex items-center px-8 sm:px-16 md:px-24">
            <div className="text-[#242424] max-w-2xl">
                <p className="prata-regular text-xl sm:text-2xl lg:text-3xl mb-4">
                    Where You Meet Your
                </p>
                <h1 className="prata-regular text-5xl sm:text-6xl lg:text-8xl leading-tight">
                    Elite Clothing Needs
                </h1>
            </div>
        </div>
      </div>
    ) 
} 
export default Hero
