import React from 'react'
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';

const Privacy = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'PRIVACY'} text2={'POLICY'}/>
      </div>
      <div className='my-10 flex flex-col gap-6 text-gray-600 max-w-3xl mx-auto'>
        <p>We respect your privacy. Your personal information is used to process orders, improve our services, and communicate updates.</p>
        <p>We do not sell your data to third parties. Payment information is handled securely by trusted providers.</p>
        <p>For data requests or questions, contact Eliteclubsignature@gmail.com.</p>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Privacy
