import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopContext'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/frontend_assets/assets';
import RelatedProduct from '../component/RelatedProduct';

const Product = () => {

  const {productId} = useParams();
  // console.log(productId)
  const {products, currency, addToCart} = useContext(ShopContext);  
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item)=>{
      if(item._id === productId){
        setProductData(item);  
        setImage(item.image[0]);
        // console.log(item);
        return null;
      }
    })
  } 

  useEffect(()=>{
    fetchProductData();
  }, [products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
        {/* Product Data */}
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

          {/* Product Images */}
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex-1 sm:flex-col overflow-x-auto   justify-between sm:justify-normal sm-w-[18.7%] w-full">
              {
                productData.image.map((item,index)=>(
                  <img onClick={()=>setImage(item)} src={item} alt=""key={index}  className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'/>
                ))
              }
          </div>
            <div className="w-full sm:w-[80%]">
              <img src={image} alt=""  className='w-full h-auto'/>
            </div>
          
          </div>
          {/* ---------------Product Info--------------- */}
              <div className="flex-1">
                <h1 className='font-medium text-2xl mt-2 '>{productData.name}</h1>
                <div className="flex items-center gap-1 mt-2">
                  <img src={assets.star_icon} alt="" className="w-3 5" />
                  <img src={assets.star_icon} alt="" className="w-3 5" />
                  <img src={assets.star_icon} alt="" className="w-3 5" />
                  <img src={assets.star_icon} alt="" className="w-3 5" />
                  <img src={assets.star_dull_icon} alt="" className="w-3 5" />
                  <p className='pl-2'>(122)</p>
                </div>
                <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
                <p className='mt-5 text-gray-500 w-4/5'>{productData.description}</p>
                <div className="flex flex-col gap-4 my-8">
                  <p>Select Size</p>
                  <div className="flex gap-2">
                    {productData.sizes.map((item,index)=>(
                      <button 
                        onClick={()=>setSize(item)} 
                        className={`border py-2 px-4 bg-gray-100 ${item===size? "border-orange-500":""}`} 
                        key={index}>{item}
                      </button>
                    ))}
                  </div>
                </div>
                    <button
                      className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
                      onClick={()=>addToCart(productData._id, size)}
                      >  
                      ADD TO CART
                    </button>
                    <hr  className='mt-8 sm:w-4/5'/>
                    <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                      <p>100% Original Product</p>
                      <p>Cash on delivery available on this product.</p>
                      <p>Easy return and exchange policy within 7 days.</p>
                    </div>
              </div>
        </div>

        {/* ---------Description & Review Section -----------------*/}
        <div className="mt-20">

            <div className="flex">
              <b className='border px-5 py-3 text-sm'>Description</b>
              <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
            </div>

            <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
              <p>Our easy-to-navigate website ensures a seamless shopping experience, with detailed product descriptions, customer reviews, and secure payment options. Whether you’re shopping from your desktop or on the go with our mobile-friendly site, finding what you need has never been easier.</p>

              <p>Enjoy fast shipping, hassle-free returns, and exceptional customer service with every purchase. Join our community today and experience the joy of shopping with [Your E-commerce Website Name]—where your satisfaction is our priority!</p>
            </div>
        </div>         

          {/*------------ Display Related Products ------------*/}
          <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ): <div className="opacity-0"></div>
}

export default Product