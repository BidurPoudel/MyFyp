import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
const UpdateProperty = () => {

    const [userData, setUserData] = useState(null);
    const [pastData, setPastData] = useState([]);
    const navigate = useNavigate();

    const { propertyId } = useParams();

    //useForm
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const handleFileChange = (e) => {
        console.log("Selected files:", e.target.files);
        setFiles([...e.target.files]);
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
                    // document.body.appendChild(image);
                    // document.getElementsByClassName("uploadImage");
                };
                reader.readAsDataURL(file);
            });
        } else {
            console.log("No files selected or too many files.");
        }
    };
    const [initialData, setInitialData] = useState({
        address: '',
        area: '',
        description: '',
        price: '',
        numberOfRooms: '',
        numberOfFlats: '',
        numberOfShutter: '',
    })

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            setUserData(decodedToken);
        } else {
            toast.error('Please log in first!');
        }
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/properties/ownerProperty/user', {
                    headers: {
                        Authorization: `${token}`
                    },
                    withCredentials: true
                })
                const allData = response.data;
                console.log(allData)
                setInitialData({
                    address: allData.address || '',
                    description: allData.description || '',
                    price: allData.price || '',
                    flatNumber: allData.numberOfFlats || '',
                    roomNumber: allData.numberOfRooms || '',
                    shutterName: allData.numberOfShutter || ''
                });

            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
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

            const response = await axios.put(
                `http://localhost:3001/api/properties/${propertyId}`,
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
                toast.success('Property Updated successfully!');
                navigate('/owner')

            }
        } catch (error) {
            console.error('Error creating property:', error);

            toast.error('Failed to create property. Please try again later.');
        }
    };

    return (
        <>
            <div className>
                <p className="flex justify-center pt-2 ml-52 text-2xl font-semibold">
                Update Property
                </p>
                <div className='mx-24 my-10 p-10 bg-slate-200 w-full'>
                    <form action="/dashboard/update-property/74" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex">
                            <div className="left">
                                <label htmlFor="Location">
                                    Location <br />
                                </label>
                                <input
                                    id="location"
                                    value={initialData.address}
                                    {...register("address", { required: true })}
                                    placeholder="property location"
                                    className="input-listings"
                                    onChange={e => setInitialData({ ...initialData, address: e.target.value })}
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
                                    onChange={e => setInitialData({ ...initialData, price: e.target.value })}
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
                                    value={initialData.area}
                                    className="input-listings"
                                    onChange={e => setInitialData({ ...initialData, area: e.target.value })}
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
                                    onChange={e => setInitialData({ ...initialData, flatNumber: e.target.value })}
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
                                    className="input-listings py-2"
                                    onInput={(e) => {
                                        if (e.target.value < 0) {
                                            e.target.value = 0;
                                        }
                                    }}
                                    onChange={e => setInitialData({ ...initialData, roomNumber: e.target.value })}
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
                                    onChange={e => setInitialData({ ...initialData, shutterNumber: e.target.value })}
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
                                        value={initialData.shutterNumber}
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
                                    className="form-control mb-6 w-full border-black"
                                    id="description"
                                    {...register("description", { required: true })}
                                    cols="50"
                                    rows="5"
                                    placeholder="Describe your property here"
                                    onChange={e => setInitialData({ ...initialData, description: e.target.value })}
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
                                        accept=".webp,.jpg, .jfif, .jpeg,.png"
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
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default UpdateProperty
