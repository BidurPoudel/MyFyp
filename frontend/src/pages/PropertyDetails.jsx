import React, { useState, useEffect } from "react";
import axios, { AxiosError } from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarning, faTimes } from '@fortawesome/free-solid-svg-icons'
import Model from 'react-modal';
import PropertyCard from '../components/PropertyCard.jsx'
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import { Zoom, toast } from 'react-toastify';
import Footer from "../layouts/Footer/Footer.jsx";

const PropertyDetails = () => {
    const [propertyDetails, setPropertyDetails] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    const [isOwner, setIsOwner] = useState(false);
    const [rentProperty, setRentProperty] = useState([])
    const token = localStorage.getItem('token');

    const { propertyId } = useParams();
    const navigate = useNavigate()
    const apiUrl = `http://localhost:3001/api/properties/${propertyId}`;
    const rentUrl = `http://localhost:3001/api/properties/rent/${propertyId}`;
    const reportUrl = `http://localhost:3001/api/properties//report/${propertyId}`;
    const imagesUrl = 'http://localhost:3001/uploads/';

    const getApiURL = async (url) => {
        try {
            const response = await axios.get(url);
            console.log(response.data);
            setPropertyDetails(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleRentButton = async (url) => {
        try {
            const response = await axios.get(rentUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                },
                withCredentials: true
            });
            if (response.status === 200) {

                navigate('/properties')
            }
            toast.success('Requested for property', {
                position: "top-right",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Zoom,
            })
            if (response.data === 400) {
                toast.error(error.response.data.errors);
            }
        } catch (error) {
            console.log(error);
            if (error.response.data.error) {
                toast.error(error.response.data.error)
            }
        }
    }

    const handleReportButton = async () => {
        const token = localStorage.getItem('token')
        console.log(` clicked ${propertyId} \n ${token}`)
        try {
            const response = await axios.post(reportUrl, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                },
                withCredentials: true
            });
            if (response.status === 200) {

                navigate('/properties')
            }
            toast.success('Property Reported successfully', {
                position: "top-right",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Zoom,
            })
            if (response.data === 400) {
                toast.error(error.response.data.errors);
            }
            setIsVisible(false)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.authentication) {
                toast.error(error.response.data.errors.authentication); // Display error message to user
            } else {
                console.log(error); // Log other errors to console
            }
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error); // Display the error message sent from the server
            }

        }
    }
    async function ReportButton() {
        setIsVisible(true)
        console.log(propertyId)
    }

    useEffect(() => {
        getApiURL(apiUrl)

    }, [])


    return (
        <>
            <div className="container w-[75%] ml-10 ">
                <div className="container-img mx-[11.5rem] my-2 h-[75vh] w-[90%] ">
                    <img
                        src={propertyDetails.images && propertyDetails.images.length > 0 ?
                            `${imagesUrl}/${propertyDetails.images[0].imageUrl.replace('public\\uploads\\', '')}` : ``
                        }
                        alt="land"
                        className=' smoothing-antialiased w-[100vw] h-full mx-2 transition-transform duration-300 hover:scale-95' />
                </div>
                <div className="container mx-44 h-[55vh] mt-1 flex justify-between">
                    <div className="left-container">
                        <h1 className='text-xl w-1/2 pr-10 flex justify-center font-bold mx-[20rem] '>Property Details</h1>
                        <p className='pt-3 text-lg mb-5'><strong className="pr-3">Property type:</strong>{propertyDetails.propertyType?.propertyName}</p>
                        <div className="descriptions text-xl">
                            {propertyDetails.description}
                        </div>
                        <div className="other-details text-xl mt-3">
                            <p className='pt-3 text-lg '><strong className="pr-3 text-base  ">Owner name:</strong>: {propertyDetails.owner?.username}</p>
                            <p className='pt-3 text-base '><strong className="pr-3 text-base">Address:</strong>{propertyDetails.address}</p>
                            <p className='pt-3 text-base '><strong className="pr-3 text-base">Area:</strong>{propertyDetails.area}</p>
                            <p className='pt-3 text-base '><strong className="pr-3 text-base">Price:</strong>{propertyDetails.price}</p>
                            {
                                propertyDetails?.propertyType?.propertyName === "Rooms" ? (
                                    <p className='pt-3 text-base font-bold'><strong>Number of Rooms:</strong> {propertyDetails.numberOfRooms}</p>
                                ) : null
                            }
                            {
                                propertyDetails?.propertyType?.propertyName === "Flats" ? (
                                    <p className='pt-3 text-base font-bold'>Number of Flats: {propertyDetails.numberOfFlats}</p>
                                ) : null
                            }
                            {
                                propertyDetails?.propertyType?.propertyName === "Shutters" ? (
                                    <p className='pt-3 text-base font-bold'>Number of Rooms: {propertyDetails.numberOfShutter}</p>
                                ) : null
                            }
                        </div>
                        <div className="features-icons flex my-5">
                            <div className="message  flex items-center">
                                <FontAwesomeIcon icon={faWarning}
                                    size='lg'
                                    style={{ color: 'black', paddingTop: "10px", height: "1.5rem" }}
                                    className='-mt-1 cursor-pointer relative mb-2'
                                    onClick={ReportButton}
                                />
                                <span className="ml-8">Report Property</span>
                            </div>
                        </div>
                    </div>
                    <div className="right-container flex flex-wrap w-full h-3/4">
                        {
                            (() => {
                                if (propertyDetails && Array.isArray(propertyDetails.images)) {
                                    const modifiedImages = propertyDetails.images.map(image => ({
                                        ...image,
                                        imageUrl: image.imageUrl.replace("public\\uploads\\", "")
                                    }));
                                    // console.log(modifiedImages[0].imageUrl);
                                    for (let i = 1; i < modifiedImages.length; i++) {
                                        <img
                                            src={propertyDetails.images && propertyDetails.images.length > 0 ?
                                                `${imagesUrl}${modifiedImages[0].imageUrl}` : ``
                                            }
                                            alt="" className='px-2 py-1 object-center w-1/3  transition-transform duration-300 hover:scale-90' />
                                    }
                                    console.log(`${imagesUrl}${modifiedImages.imageUrl}`)
                                } else {
                                    console.log("propertyDetails or propertyDetails.images is not valid.");
                                }
                            })()
                        }
                    </div>
                </div>
                <div>
                    <button className='rentButton mb-3 bg-red-200' onClick={handleRentButton}>Rent the property</button>
                </div>
            </div>
            <Model
                isOpen={isVisible}
                onRequestClose={() => setIsVisible(false)}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        top: '50px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        height: '50%',
                        width: '50%',
                        borderRadius: '25px',
                        animation: 'fade-in 5s forwards',
                        transition: 'top 1s ease-out',
                    },
                }}
            >
                <div className='model'>
                    <div className='flex justify-around relative'>
                        <h1 className='text-red-500 text-5xl font-bold'>Do you want to Report???</h1>
                        <button onClick={() => setIsVisible(false)} className='text-3xl px-3 w-10 absolute right-1'>
                            <FontAwesomeIcon icon={faTimes} size='1x' style={{ color: 'black', paddingTop: '10px' }} />
                        </button>
                    </div>
                    <p className='text-lg font-bold my-10 mx-44 w-1/2 h-1/2 text-yello-500 '>This action cannot be undone. we won't let property owner who reported the property</p>
                    <div className='flex relative justify-between w-1/7 my-[4rem] ml-[45px] '>
                        <div className=' absolute right-6 top-6'>
                            <button
                                className='border border-black bg-yellow-300 mx-1 px-5 py-1 rounded-xl text-black hover:bg-yellow-500 hover:text-black hover:transition-all hover:border-black hover:border-1 delay-[50ms] font-semibold text-lg outline-[3.5px]'
                                onClick={() => handleReportButton()}
                            >Report</button>
                            <button className='mx-1 px-5 py-1 font-semibold rounded-xl border border-black bg-gray-300 ' onClick={() => setIsVisible(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </Model>
            <div className='w-full '>
                <Footer />
            </div>
        </>
    )
}

export default PropertyDetails
