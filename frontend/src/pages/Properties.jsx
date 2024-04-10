import React, { useState, useEffect } from "react";
import PropertyCard from "../components/PropertyCard";
import SortButton from "../components/SortButton";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
const Properties = () => {
  const [allData, setData] = useState([]);
  const [images, setImages] = useState();
  const [range, setRange] = useState('Sort By Price Range')
  const [open, setOpen] = useState(false)
  const priceRange = ["low to high", "high to low"]

  // urls
  const url = 'http://localhost:3001/api/properties/allProperties';
  const imageUrl = 'http://localhost:3001/uploads/'
  const getData = async (url) => {
    try {
      const response = await axios.get(url);
      console.log(response.data)
      setData(response.data);
      setImages(response.data.map(property => property.images))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(url);
  }, []);

  return (
    <>
      <div className="flex">
        <div className="sidebar flex flex-wrap px-2 w-80 mt-20 bg-gray-200 border border-gray-300">
          <span className="font-semibold text-xl">Sort By:</span><br /> 
          <p className=" text-lg font-medium mt-12 -ml-[4.5rem] pb-2">Category</p>
          <div className="w-full flex -my-[85%]">
            <div className="flex items-center justify-center -my-1 hover:bg-green-400 px-2 w-20 bg-green-300 mx-2 h-[30px] rounded-full cursor-pointer">Rooms</div>
            <div className="flex items-center justify-center -my-1 px-2 w-20 hover:bg-green-400 bg-green-300 mx-2 h-[30px] rounded-full cursor-pointer">Flats</div>
            <div className="flex items-center justify-center -my-1 px-2 w-20 hover:bg-green-400 bg-green-300 mx-2 h-[30px] rounded-full cursor-pointer">Shutters</div>
          </div>
          <div className="w-full -mt-[160%] flex">
            <div className="flex items-center justify-center my-1 px-2 w-20 hover:bg-green-400 bg-green-300 mx-2 h-[30px] rounded-full cursor-pointer">Building</div>
            <div className="flex items-center justify-center my-1 px-2 w-20 hover:bg-green-400 bg-green-300 mx-2 h-[30px] rounded-full cursor-pointer">Land</div>
          </div>
          <div className="bg-red-200 w-full">
          <div className="flex items-center justify-center my-1 px-2 w-20 hover:bg-green-400 bg-green-300 mx-2 h-[30px] rounded-full cursor-pointer">High to low</div>
            <div className="flex items-center justify-center my-1 px-2 w-20 hover:bg-green-400 bg-green-300 mx-2 h-[30px] rounded-full cursor-pointer">Land</div>
          </div>
        </div>
        <div className="main">
          <div className="search container pl-[20%]">
            <div className="search-bar mt-12 flex ">
              {/*  */}
              <div className="relative flex w-[35%] h-[2.5rem] bg-green-400 rounded-full"> {/*i can adjust this div now*/}
                <form action="search" className='w-full bg-red-300 h-full rounded-full  '>
                  <input type="text" className='w-full h-full border-[0.02rem]  border-black px-5 rounded-full outline-[0.1rem] outline-blue-300' />
                  <button className='absolute bg-gray-200 hover:bg-gray-300 right-[0.25rem] top-[0.29rem] px-2 py-[0.15rem] font-semibold border border-black rounded-full 
            '>Search</button>
                </form>
              </div>
            </div>
          </div>

          <div className="card flex flex-wrap w-[80%] px-[9px] mx-10 ">
            {
              allData.map((data) => (
                <PropertyCard
                  key={data.propertyId}
                  propertyId={data.propertyId}
                  images={data.images && data.images.length > 0 ? `${imageUrl}/${data.images[0].replace('public\\uploads\\', '')}` : ''}
                  propertyType={data.propertyType.propertyName}
                  address={data.address}
                  area={data.area}
                />
              ))}


          </div>
        </div>
      </div>
    </>
  );
};

export default Properties;
