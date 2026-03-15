import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* Logo */}
      <Link to='/'><img src={assets.logo} className="w-36" alt="Logo" /></Link>

      {/* Desktop Nav Links */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <li>
          <NavLink to="/" className="flex flex-col items-center gap-1">
            {({ isActive }) => (
              <>
                <p>HOME</p>
                <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? '' : 'hidden'}`} />
              </>
            )}
          </NavLink>
        </li>

        {/* MEN Dropdown */}
        <li className="relative group">
          <NavLink to="/collection?category=Men" className="flex flex-col items-center gap-1">
            {({ isActive }) => (
              <>
                <p>MEN</p>
                <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? '' : 'hidden'}`} />
              </>
            )}
          </NavLink>
          <div className="absolute hidden group-hover:block bg-white shadow-md rounded w-[600px] p-6 z-50 left-[-100px] top-full">
            <div className="grid grid-cols-4 gap-4">
              {menSubCategories.map(sub => (
                <Link key={sub} to={`/collection?category=Men&subCategory=${encodeURIComponent(sub)}`} className="hover:text-black text-gray-500 hover:font-bold">
                  {sub}
                </Link>
              ))}
            </div>
          </div>
        </li>

        {/* WOMEN Dropdown */}
        <li className="relative group">
          <NavLink to="/collection?category=Women" className="flex flex-col items-center gap-1">
            {({ isActive }) => (
              <>
                <p>WOMEN</p>
                <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? '' : 'hidden'}`} />
              </>
            )}
          </NavLink>
          <div className="absolute hidden group-hover:block bg-white shadow-md rounded w-[600px] p-6 z-50 left-[-100px] top-full">
            <div className="grid grid-cols-4 gap-4">
              {womenSubCategories.map(sub => (
                <Link key={sub} to={`/collection?category=Women&subCategory=${encodeURIComponent(sub)}`} className="hover:text-black text-gray-500 hover:font-bold">
                  {sub}
                </Link>
              ))}
            </div>
          </div>
        </li>

        <li>
          <NavLink to="/collection?category=Kids" className="flex flex-col items-center gap-1">
            {({ isActive }) => (
              <>
                <p>KIDS</p>
                <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? '' : 'hidden'}`} />
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/collection" className="flex flex-col items-center gap-1">
            {({ isActive }) => (
              <>
                <p>COLLECTION</p>
                <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? '' : 'hidden'}`} />
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            {({ isActive }) => (
              <>
                <p>ABOUT</p>
                <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? '' : 'hidden'}`} />
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            {({ isActive }) => (
              <>
                <p>CONTACT</p>
                <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? '' : 'hidden'}`} />
              </>
            )}
          </NavLink>
        </li>
      </ul>

      {/* Profile, Search, Cart, Hamburger */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        <div className="group relative">
          <img
            onClick={() => token ? null : navigate('/login')}
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="Profile"
          />
          {token && (
            <div className="hidden group-hover:block absolute right-0 pt-4 bg-white shadow-md rounded">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-5 cursor-pointer sm:hidden'
          alt="Menu"
        />
      </div>

      {/* Sidebar Menu for Small Screens */}
      <div className={`fixed top-0 right-0 bottom-0 z-50 bg-white transition-all duration-300 overflow-hidden shadow-2xl ${visible ? 'w-full sm:w-[300px]' : 'w-0'}`}>
        <div className="flex flex-col h-full text-gray-600">

          {/* Header with Back Button */}
          <div className="flex items-center gap-4 p-4 border-b">
            <div onClick={() => setVisible(false)} className="flex items-center gap-2 cursor-pointer">
              <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="Back" />
              <p className="font-medium text-lg">Back</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto">
            <NavLink onClick={() => setVisible(false)} className='block py-3 pl-6 border-b hover:bg-gray-50' to="/">HOME</NavLink>

            {/* Mobile Women Menu */}
            <MobileDropdown title="WOMEN" category="Women" subCategories={womenSubCategories} setVisible={setVisible} assets={assets} />

            {/* Mobile Men Menu */}
            <MobileDropdown title="MEN" category="Men" subCategories={menSubCategories} setVisible={setVisible} assets={assets} />

            <NavLink onClick={() => setVisible(false)} className='block py-3 pl-6 border-b hover:bg-gray-50' to="/collection?category=Kids">KIDS</NavLink>
            <NavLink onClick={() => setVisible(false)} className='block py-3 pl-6 border-b hover:bg-gray-50' to="/collection?category=Accessories">ACCESSORIES</NavLink>
            <NavLink onClick={() => setVisible(false)} className='block py-3 pl-6 border-b hover:bg-gray-50' to="/about">ABOUT</NavLink>
            <NavLink onClick={() => setVisible(false)} className='block py-3 pl-6 border-b hover:bg-gray-50' to="/contact">CONTACT</NavLink>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ── Reusable mobile accordion dropdown ── */
const MobileDropdown = ({ title, category, subCategories, setVisible, assets }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='flex flex-col border-b'>
      <div
        className='flex justify-between items-center py-2 pl-6 pr-4 border bg-gray-50 cursor-pointer'
        onClick={() => setOpen(prev => !prev)}
      >
        <p>{title}</p>
        <img
          src={assets.dropdown_icon}
          className={`h-3 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
          alt=""
        />
      </div>
      {open && (
        <div className='flex flex-col bg-white border-b text-sm text-gray-500'>
          {subCategories.map(sub => (
            <Link
              key={sub}
              to={`/collection?category=${category}&subCategory=${encodeURIComponent(sub)}`}
              onClick={() => setVisible(false)}
              className='py-2 pl-10 pr-4 hover:bg-gray-50 border-b border-gray-100'
            >
              {sub}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const womenSubCategories = [
  'Topwear', 'Bottomwear', 'Winterwear', 'New In', 'Spring Summer',
  'Shirts', 'T-shirts', 'Polo', 'Blazers', 'Tank Tops', 'Boxers',
  'Bottoms', 'Sweaters & Cardigans', 'Jackets & Coats', 'Hoodies & Sweatshirts',
  'Bras', 'Briefs', 'True Body', 'Tops & Blouses', 'Dresses & Skirts',
];

const menSubCategories = [
  'Topwear', 'Bottomwear', 'Winterwear', 'New In', 'Spring Summer',
  'Shirts', 'T-shirts', 'Polo', 'Blazers', 'Tank Tops', 'Boxers',
  'Bottoms', 'Sweaters & Cardigans', 'Jackets & Coats', 'Hoodies & Sweatshirts',
];

export default NavBar;
