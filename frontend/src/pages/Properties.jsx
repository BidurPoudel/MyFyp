import React, { useState, useEffect,  Suspense } from "react";
import PropertyCard from "../components/PropertyCard";
import SortButton from "../components/SortButton";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import Skeleton from "react-loading-skeleton";
import Footer from "../layouts/Footer/Footer";
const Properties = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [allData, setData] = useState([]);
  const [images, setImages] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [sort, setSort] = useState('');
  const [range, setRange] = useState('Sort By Price Range')
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearch] = useState('')
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
    } finally {
      // Set isLoading to false after data fetching is complete
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(url, searchQuery);
    console.log(isLoading)
    setIsLoading(true)
  }, []);


  const filterProperties = (query) => {
    if (query === '') {
      setFilteredData(allData);
    } else {
      const filtered = allData.filter(data =>
        data.propertyType.propertyName.toLowerCase().includes(query) ||
        data.address.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    }
  };


  const handleSearchInput = (e) => {
    setSearch(e.target.value.toLowerCase())
    filterProperties(e.target.value.toLowerCase());
    console.log(e.target.value)
  }
  const handleFilter = (filters) => {
    if (filters === 'Rooms' || filters === 'Flats' || filters === 'Shutters' || filters === 'Building' || filters === 'Land') {
      const filtered = allData.filter(data =>
        data.propertyType.propertyName.toLowerCase().includes(filters.toLowerCase())
      );
      setFilteredData(filtered);
    }else if(filters ===''){
      setFilteredData(allData);
    }
  };
  const handleSortedPropertiesWithPrice = (sortOrder) => {
    let sortedData = [...filteredData];
  
    if (sortOrder === 'high-to-low') {
      sortedData.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'low-to-high') {
      sortedData.sort((a, b) => a.price - b.price);
    }
  
    setFilteredData(sortedData);
  };
  return (
    <>
      <div className="relative flex justify-center mx-[35%] mt-10 h-[2.5rem] rounded-full w-[25%]"> {/*i can adjust this div now*/}
        <form action="search" className='w-full bg-red-300 h-full rounded-full'>
          <input type="text"
          placeholder="Search by address or property type"
          className='w-full h-full border-[0.02rem]  border-black px-5 rounded-full outline-[0.1rem] outline-blue-300'
            onChange={handleSearchInput} />
          
        </form>
      </div>
      <div className="flex">
        <div className="sidebar w-[20rem] h-[120vh] bg-gray-100 border border-gray-100 drop-shadow-xl shadow-xl">
          <div className="flex justify-center mt-2 border-b border-black text-xl font-semibold pl-4">Sort by:</div>
          <div className="text-lg pl-2 mt-2">Category:</div>
          <div className="flex flex-wrap categories border-b pb-4 mt-2">
            <div
              className="flex items-center justify-center my-1 px-2 w-20 hover:bg-green-400 bg-green-300 mx-2 h-[30px] rounded-full cursor-pointer"
              onClick={() => handleFilter('')}
            >
              All</div>
              <div
              className="flex items-center justify-center my-1 px-2 w-20 hover:bg-green-400 bg-green-300 mx-2 h-[30px] rounded-full cursor-pointer"
              onClick={() => handleFilter('Rooms')}
            >
              Rooms</div>
            <div
              className="flex items-center justify-center my-1 px-2 w-20 hover:bg-green-400 bg-green-300 mx-2 h-[30px] rounded-full cursor-pointer"
              onClick={() => handleFilter('Flats')}
            >
              Flats</div>
            <div
              className="flex items-center justify-center my-1 px-2 w-20 hover:bg-green-400 bg-green-300 mx-2 h-[30px] rounded-full cursor-pointer"
              onClick={() => handleFilter('Shutters')}
            >
              Shutters</div>
            <div
              className="flex items-center justify-center my-1 px-2 w-20 hover:bg-green-400 bg-green-300 mx-2 h-[30px] rounded-full cursor-pointer"
              onClick={() => handleFilter('Building')}
            >
              Building</div>
            <div
              className="flex items-center justify-center my-1 px-2 w-20 hover:bg-green-400 bg-green-300 mx-2 h-[30px] rounded-full cursor-pointer"
              onClick={() => handleFilter('Land')}
            >
              Land</div>
          </div>
          <div className="text-lg pl-2 mt-4">Price</div>
          <div className="flex flex-wrap categories border-b pb-4 mt-2">
            <div className="high-to-low flex items-center justify-center my-1 hover:bg-green-400 px-4 py-[1rem] w-auto bg-green-300 mx-2 h-[30px] rounded-full cursor-pointer"
              onClick={() => handleSortedPropertiesWithPrice('high-to-low')}
            >High to low</div>
            <div className="low to high flex items-center justify-center my-1 hover:bg-green-400 px-4 py-[1rem] w-auto bg-green-300 mx-2 h-[30px] rounded-full cursor-pointer"
              onClick={() => handleSortedPropertiesWithPrice('low-to-high')}
            >Low to high</div>

          </div>
        </div>
        <div className="main ml-10 ">
          {isLoading ? (<div className="w-1/2">
            <Skeleton count={15}  width='full'baseColor="green" />
          </div>) :
            (<div
              className={`card flex ${(searchQuery === allData.address || searchQuery === allData.propertyType?.propertyName) ? 'flex-wrap' : 'flex-wrap'} flex-wrap min-w-[50vw] px-[9px] mx-10 `}>
              {(searchQuery === '' && filteredData.length === 0) ?
                allData.map(data => (
                  <PropertyCard
                    key={data.propertyId}
                    propertyId={data.propertyId}
                    images={data.images && data.images.length > 0 ? `${imageUrl}/${data.images[0].replace('public\\uploads\\', '')}` : ''}
                    propertyType={data.propertyType.propertyName}
                    address={data.address}
                    area={data.area}
                  />
                )) :
                filteredData.map(data => (
                  <PropertyCard
                    key={data.propertyId}
                    propertyId={data.propertyId}
                    images={data.images && data.images.length > 0 ? `${imageUrl}/${data.images[0].replace('public\\uploads\\', '')}` : ''}
                    propertyType={data.propertyType.propertyName}
                    address={data.address}
                    area={data.area}
                  />
                ))
              }
            </div>)
          }
        </div>
      </div>
      <div className='w-full bg-red-100 '>
      <Footer />
      </div>
    </>
  );
};

export default Properties;
