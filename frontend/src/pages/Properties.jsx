import React, { useState, useEffect } from "react";
import PropertyCard from "../components/PropertyCard";
import SortButton from "../components/SortButton";
import axios from "axios";

const Properties = () => {
  const [allData, setData] = useState([]);
  const [images, setImages] = useState();
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
      <SortButton />
      <div className="card flex flex-wrap">
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
    </>
  );
};

export default Properties;
