import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../features/authentication/authSlice";
import { toast } from "react-toastify";

const Create = () => {

  const [data, setData]= useState({
    // address: '',
    // area: '',
    // description: '',
    // price: '',
    // flatNumber: '',
    // roomNumber: '',
    // shutterNumber: '',
    // propertyName: '',
  })

  const [userData, setUserData] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const [files, setFiles] = useState([]);
  const handleImageSubmit = () => {
    if (files && files.length > 0 && files.length < 7) {
      files.forEach((file) => {
        const reader = new FileReader();
  
        reader.onload = function (e) {
          const image = document.createElement("img");
          image.src = e.target.result;
          image.style.marginX = "-2px";
          image.style.width = "15vw";
          image.style.height = "10vh";
          image.style.objectFit = "contain";
          image.style.marginTop = "15px";
          document.body.appendChild(image);
          document.getElementsByClassName("uploadImage");
        };
        reader.readAsDataURL(file);
      });
    } else {
      console.log("No files selected or too many files.");
    }
  };
  
  
  const handleFileChange = (e) => {
    console.log("Selected files:", e.target.files);
    setFiles([...e.target.files]);
  };



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUserData(decodedToken);
    } else {
      toast.error('Please log in first!');
    }
  }, []);


 const onSubmit = async (data) => {
    try {
      if (!userData) {
        toast.error('Please log in first!');
        return;
      }

      data.userId = userData.userId;
      const formDataToAppend = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          formDataToAppend.append(key, data[key]);
        }
      }
      files.forEach((file) => {
        console.log("Files"+file);
        formDataToAppend.append('images', file);
      });
      console.log(data)
      const token = localStorage.getItem('token');

      // Display the key/value pairs
    for (var pair of formDataToAppend.entries()) {
      console.group(pair[0]+ ', ' + pair[1]); 
    }


      const response = await axios.post(
        'http://localhost:3001/api/properties/create',
        formDataToAppend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `${token}`
          },
          withCredentials: true
        }
      ); 

      if (response.status === 200) {
        toast.success('Property created successfully!');
      }
    } catch (error) {
      console.error('Error creating property:', error);
      
      toast.error('Failed to create property. Please try again later.');
    }
  };


  return (
    <div>
      <p className="font-mono font-bold text-5xl text-center ml-[5vh] flex">
        List your Property !!
      </p>
      <div className="addLists flex mt-[6vh]">
        <div className="property-listing flex bg-red-50 h-auto w-[55%] -mt-1  ml-[60px] border-2 border-red-300 float-left pt-5 pl-5 pr-5">
          <div className="first pl-10 mt-1">
            <form action="/create" method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex">
                <div className="left">
                  <label htmlFor="Location">
                    Location <br />
                  </label>
                  <input
                    id="location"
                    {...register("address", { required: true })}
                    placeholder="property location"
                    className="input-listings"
                  />{errors.address && (
                    <p className="text-red-600 font-xs font-thin -mt-3 -mb-2 ">Cannot be empty</p>
                  )}
                  <br />
                  <label htmlFor="Price">
                    Price
                    <br />
                  </label>
                  <input
                    id="Price"
                    type="number"
                    {...register("price", { required: true })}
                    placeholder="Price of Property"
                    className="input-listings"
                    onInput={(e) => {
                      if (e.target.value < 0) {
                        e.target.value = 0;
                      }
                    }}
                  />{errors.price && (
                    <p className="text-red-600 font-xs font-thin -mt-3 -mb-2 ">Cannot be empty</p>
                  )}
                  <br />
                  <label htmlFor="area">
                    Area <br />
                  </label>
                  <input
                    id="area"
                    {...register("area", { required: true })}
                    placeholder="in sq km"
                    className="input-listings"
                  />
                  <br />
                  <label htmlFor="flatNumber">
                    Numbers of flats
                    <br />
                  </label>
                  <input
                    id="flatNumber"
                    type="number"
                    min="0"
                    {...register("flatNumber", { required: true })}
                    placeholder="Number of flats for rent"
                    className="input-listings"
                    onInput={(e) => {
                      if (e.target.value < 0) {
                        e.target.value = 0;
                      }
                    }}
                  />
                  <br />
                  <label htmlFor="roomNumber">
                    Numbers of rooms
                    <br />
                  </label>
                  <input
                    id="roomNumber"
                    type="number"
                    {...register("roomNumber", { required: true })}
                    placeholder="Number of rooms for rent"
                    className="input-listings"
                    onInput={(e) => {
                      if (e.target.value < 0) {
                        e.target.value = 0;
                      }
                    }}
                  />
                  <br />
                  <label htmlFor="shutterNumber">
                    Numbers of shutters
                    <br />
                  </label>
                  <input
                    id="shutterNumber"
                    type="number"
                    min="0"
                    {...register("shutterNumber", { required: true })}
                    placeholder="Number of shutters for rent"
                    className="input-listings"
                    onInput={(e) => {
                      if (e.target.value < 0) {
                        e.target.value = 0;
                      }
                    }}
                  />
                  <br />
                </div>
                <div className="right ml-[9rem]">
                  <div className="radios flex justify-around mb-3">
                    <input
                      type="radio"
                      id="Land"
                      value='Land'
                      {...register("propertyName", { required: true })
                      }
                    />
                    <label htmlFor="Land">Land</label>
                    <input
                      type="radio"
                      id="Rooms"
                      value='Rooms'
                      {...register("propertyName", { required: true })}
                    />
                    <label htmlFor="Rooms">Rooms</label>
                    <input
                      type="radio"
                      id="Flats"
                      value="Flats"
                      {...register("propertyName", { required: true })}
                    />
                    <label htmlFor="Flats">Flats</label>
                    <input
                      type="radio"
                      id="Shutters"
                      value='Shutters'
                      {...register("propertyName", { required: true })}
                    />
                    <label htmlFor="Shutters">Shutters</label>
                    <input
                      type="radio"
                      id="Building"
                      value='Building'
                      {...register("propertyName", { required: true })}
                    />
                    <label htmlFor="Building">Building</label>
                  </div>
                  <label htmlFor="description">Description</label>
                  <br />
                  <textarea
                    className="form-control mb-6"
                    id="description"
                    {...register("description", { required: true })}
                    cols="50"
                    rows="5"
                    placeholder="Describe your property here"
                  ></textarea>{errors.description && (
                    <p className="text-red-600 font-xs font-thin -mt-3 -mb-2 ">Cannot be empty</p>
                  )}
                  <br />
                  <div className="uploadingImage flex">
                    <label htmlFor="image">Image</label>
                    <br />
                    <input
                      id="File"
                      {...register("images", { required: true })}
                      accept=".webp,.jpeg,.png"
                      className="block w-[13vh]"
                      type="file"
                      multiple="multiple"
                      onChange={handleFileChange}
                    />{errors.imagenpm && (
                      <p className="text-red-600 font-xs font-thin -mt-3 -mb-2 ">Cannot be empty</p>
                    )}
                    <br />
                    <button
                      className="upload"
                      type="button"
                      onClick={handleImageSubmit}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            
            <div className="flex">
              <button className="rent-button" type="submit">
                Post
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
