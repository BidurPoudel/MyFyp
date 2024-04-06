import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Model from 'react-modal';

const Create = () => {

  const [data, setData] = useState({
    // address: '',
    // area: '',
    // description: '',
    // price: '',
    // flatNumber: '',
    // roomNumber: '',
    // shutterNumber: '',
    // propertyName: '',
  })

  const [isVisible, setIsVisible] = useState(false)
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const [files, setFiles] = useState([]);
  const handleImageSubmit = () => {
    setIsVisible(true)

    if (files && files.length > 0 && files.length < 7) {
      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = function (e) {
          const image = document.createElement("img");
          const imageDiv = document.getElementsByClassName('image-div')
          image.src = e.target.result;
          image.style.marginX = "-2px";
          image.style.width = "15vw";
          image.style.height = "10vh";
          image.style.objectFit = "contain";
          image.style.marginTop = "15px";
          // document.body.appendChild(image);
          document.getElementsByClassName("uploadImage");
        };
        reader.readAsDataURL(file);
      });
      // setIsVisible(false)
      
    } else {
      console.log("No files selected or too many files.");
    }
  };


  const handleFileChange = (e) => {
    console.log("Selected files:", e.target.files);
    setFiles([...e.target.files]);
    setImages([...e.target.files])
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
        console.log("Files" + file);
        formDataToAppend.append('images', file);
      });
      console.log(data)
      const token = localStorage.getItem('token');

      // Display the key/value pairs
      for (var pair of formDataToAppend.entries()) {
        console.group(pair[0] + ', ' + pair[1]);
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
        navigate('/properties')

      }
    } catch (error) {
      console.error('Error creating property:', error);

      toast.error('Failed to create property. Please try again later.');
    }
  };


  return (
    <div>
      <div className="flex justify-center mt-2">
        <p className="font-mono font-bold text-3xl text-cente  shadow-2xl drop-shadow-2xl ml-[5vh] flex">
          List your Property !!
        </p>
      </div>
      <div className="addLists flex mt-[6vh] justify-center mr-16">
        <div className="property-listing flex px-2 shadow-2xl drop-shadow-3xl bg-slate-200 h-auto w-[60%] -mt-1  ml-[60px] border-2  float-left pt-5 pl-5 pr-5">
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
                <div className=" ml-[9rem]">
                  <div className="radios flex justify-evenly mb-3 ">
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
                    className="form-control mb-6 w-full border-[ border-black"
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
      <Model
        isOpen={isVisible}
        onRequestClose={() => setIsVisible(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: '8rem',
            left: '50%',
            transform: 'translateX(-50%)',
            height: "75%",
            width: "80%",
            borderRadius: "25px",
            animation: "fade-in 5s forwards",
            transition: "top 1s ease-out",
            display: "flex",
            flexDirection: "column" // Ensure the content inside the modal is in a column layout
          }
        }}
      >
        <div className="image-div flex sticky relative">
          <button onClick={() => setIsVisible(false)} className='text-3xl px-3 w-10 absolute right-5 top-1'>
            <FontAwesomeIcon icon={faXmark}
              style={{ color: 'black', paddingTop: "10px" }}
              className='-mt-1 cursor-pointer relative'
              onClick={() => setIsVisible(false)}
            />
          </button>
        </div>
        <div className="text-2xl font-semibold flex justify-center">Selected Images</div>
        <div className="top-div overflow-auto flex flex-wrap justify-around mt-8 h-[70%] bg-slate-100">
          {/* Make the container scrollable */}
          {images.map((file, index) => (
            <img key={index} src={URL.createObjectURL(file)} alt={`Image ${index}`} className="h-[24rem] px-10 py-10" />
          ))}
        </div>
        <div className="lowest-bottom flex justify-center">
          <button className="action-btn upload-here mt-12 w-[20%] h-10 bg-red-400 border  mx-1 px-5 py-1 rounded-xl text-white hover:bg-red-600 hover:text-white hover:transition-all delay-[50ms] hover:outline outline-blue-100  text-lg outline-[3.5px]"
            type="button"
            onClick={()=>setIsVisible(false)}>
            Upload
          </button>
        </div>
      </Model>

    </div>
  );
};

export default Create;
