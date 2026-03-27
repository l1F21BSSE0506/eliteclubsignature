import React from 'react'
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>10 F1 Wapda Avenue, WAPDA Town Block F 1<br /> Wapda Town Phase 1, Lahore, 54000, Pakistan</p>
          <p className='text-gray-500'>Tel: 03334655184 <br /> Email: Eliteclubsignature@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
          <p className='text-gray-600'>Learn more about our teams and job openings.</p>
        </div>
        <div className='flex gap-4'>
          <a
            href='https://www.instagram.com/eliteclubsignature?igsh=MWNhbmJnOHV5Z2Z0Nw=='
            target='_blank'
            rel='noopener noreferrer'
            className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'
          >
            Instagram
          </a>
          <a
            href='https://www.tiktok.com/@eliteclubsignature?_r=1&_d=f1cb36ck859d5d&sec_uid=MS4wLjABAAAAShTklt0fu0CwxzPlif-gm91n5zsy7fhpm4m2rKwecn2DEjyUuXevUil2YYM1v9s2&share_author_id=7598169994299622416&sharer_language=en&source=h5_m&u_code=e5gmbg55kc765h&timestamp=1774612163&user_id=7182259612195488773&sec_user_id=MS4wLjABAAAAKa9py_TZKdhbt-Q_PMYGD4En8fIHdb9lJMtXQPublwxkjmHEn1wZFGbEYlQ4Urj7&item_author_type=2&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7620530600394442516&share_link_id=a5948fdb-91f4-4a7e-bce2-8491aeaacf3e&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b6880%2Cb5836&social_share_type=5&enable_checksum=1'
            target='_blank'
            rel='noopener noreferrer'
            className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'
          >
            TikTok
          </a>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact;
