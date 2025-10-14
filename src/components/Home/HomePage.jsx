import React from 'react'

import iphone from '../../assets/iPhone.webp'
import mac from '../../assets/mac.jpg'
import HeroSection from './HeroSection.jsx'
import FeaturedProducts from './FeaturedProducts.jsx'

const HomePage = () => {
  return (
    <div>
      <HeroSection 
        title="Buy iphone 14 Pro " 
        subtitle="Experience the power of the latest iPhone 14 
        with our most Pro camera ever."
        link='/'
        image={iphone}
       />
       <FeaturedProducts/>
       <HeroSection 
          title="Build the ultimate setup" 
          subtitle="You can add Studio Display and color-matched Magic
          accessories to your bag after configure your Mac mini."
          link='/'
          image={mac}
        />
     </div>
  )
}

export default HomePage