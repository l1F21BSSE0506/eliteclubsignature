import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600 uppercase tracking-widest text-[10px]'>
              Elite club signature is a lifestyle brand based in Pakistan. We provide high-quality fashion at affordable prices.
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
                <li>03334655184</li>
                <li>Eliteclubsignature@gmail.com</li>
                <li>
                    <a
                        href="https://www.instagram.com/eliteclubsignature?igsh=MWNhbmJnOHV5Z2Z0Nw=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block border border-black px-3 py-1 hover:bg-black hover:text-white transition-all"
                    >
                        Instagram
                    </a>
                </li>
                <li>Facebook</li>
                <li>YouTube</li>
                <li>
                    <a
                        href="https://www.tiktok.com/@eliteclubsignature?_r=1&_d=f1cb36ck859d5d&sec_uid=MS4wLjABAAAAShTklt0fu0CwxzPlif-gm91n5zsy7fhpm4m2rKwecn2DEjyUuXevUil2YYM1v9s2&share_author_id=7598169994299622416&sharer_language=en&source=h5_m&u_code=e5gmbg55kc765h&timestamp=1774612163&user_id=7182259612195488773&sec_user_id=MS4wLjABAAAAKa9py_TZKdhbt-Q_PMYGD4En8fIHdb9lJMtXQPublwxkjmHEn1wZFGbEYlQ4Urj7&item_author_type=2&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7620530600394442516&share_link_id=a5948fdb-91f4-4a7e-bce2-8491aeaacf3e&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b6880%2Cb5836&social_share_type=5&enable_checksum=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block border border-black px-3 py-1 hover:bg-black hover:text-white transition-all"
                    >
                        TikTok
                    </a>
                </li>
            </ul>
        </div>
      </div>
      <div>
            <hr />
            <p className='py-5 text-xs text-center uppercase tracking-widest text-gray-500'>© 2024 Elite club signature. ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  )
}

export default Footer;
