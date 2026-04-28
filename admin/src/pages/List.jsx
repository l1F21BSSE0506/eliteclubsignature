import axios from 'axios'
import React from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'

const List = () => {
  const [list, setList] = useState([])
  const subCategoryOptions = [
    'Topwear',
    'Bottomwear',
    'Winterwear',
    'New In',
    'Spring Summer',
    'Shirts',
    'T-shirts',
    'Polo',
    'Blazers',
    'Tank Tops',
    'Boxers',
    'Bottoms',
    'Sweaters & Cardigans',
    'Jackets & Coats',
    'Hoodies & Sweatshirts',
    'Bras',
    'Briefs',
    'True Body',
    'Tops & Blouses',
    'Dresses & Skirts',
    'Caps',
    'Belts',
    'Socks',
    'Boxer',
  ];

  const fetchList = async()=>{
    try{
      const response = await axios.get(backendUrl + '/api/product/list')
      if(response.data.success){
        setList(response.data.products)
      }
      else{
        toast.error(response.data.message)
      }
    }
    catch (error){
      console.error(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchList()
  }, [])

  console.log("Fetched Products:", list) 

  const updateProductField = async (id, payload, successMessage) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token not found');
        return;
      }

      const response = await axios.post(
        backendUrl + '/api/product/update',
        { id, ...payload },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(successMessage);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');  // ✅ Fetch token
      if (!token) {
        toast.error('Authentication token not found');
        return;
      }
  
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }  // ✅ Pass token properly
      );


  
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };
  
  const updateDiscount = async (id, discount) => {
      updateProductField(id, { discount }, "Discount Updated");
  }

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/*List Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Discount</b>
          <b>Flags</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product List */}
        {
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              <img className='w-12' src={item.images?.[0] || 'default-image-url'} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <input 
                  type="number" 
                  className="w-16 border px-1" 
                  defaultValue={item.discount || 0} 
                  onBlur={(e) => updateDiscount(item.id, e.target.value)}
              />
              <div className="flex items-center gap-2 flex-wrap">
                <label className="flex items-center gap-1 text-[12px]">
                  <input
                    type="checkbox"
                    defaultChecked={item.bestseller}
                    onChange={(e) => updateProductField(item.id, { bestseller: e.target.checked }, "Bestseller Updated")}
                  />
                  <span>Bestseller</span>
                </label>
                <label className="flex items-center gap-1 text-[12px]">
                  <input
                    type="checkbox"
                    defaultChecked={item.discountedOffer}
                    onChange={(e) => updateProductField(item.id, { discountedOffer: e.target.checked }, "Discounted Offer Updated")}
                  />
                  <span>Discounted Offer</span>
                </label>
                <select
                  className="border px-2 py-1 text-[12px] min-w-[130px]"
                  value={item.subcategory ?? item.subCategory ?? 'Topwear'}
                  onChange={(e) => updateProductField(item.id, { subcategory: e.target.value }, "Subcategory Updated")}
                >
                  {subCategoryOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <p onClick={()=> removeProduct(item.id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List;
