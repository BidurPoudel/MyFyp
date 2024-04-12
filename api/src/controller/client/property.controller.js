import prisma from "../../../prisma/index.js";

class PropertyController {


    createPost = async (req, res, next) => {
        try {
            // const user = req.user;
            const userId = req.user.userId
            const { address, area, description, price, flatNumber, roomNumber, shutterNumber, propertyName } = req.body;
            const amounts = parseInt(price, 10);
            const numberOfFlats = parseInt(flatNumber, 10);
            const numberOfRooms = parseInt(roomNumber, 10);
            const numberOfShutter = parseInt(shutterNumber, 10);
            const files = req.files;
            const propertyExisted = await prisma.propertyType.findUnique(
                {
                    where: {
                        propertyName
                    }
                }
            );
            if (!propertyExisted) {
                return res.status(404).json({ error: 'Property not found' });
            }

            const newProperty = await prisma.property.create({
                data: {
                    address,
                    area,
                    description,
                    price: amounts,
                    numberOfRooms,
                    numberOfFlats,
                    numberOfShutter,
                    isAvailable: true,
                    owner: { connect: { userId: userId } },
                    propertyType: {
                        connect: {
                            propertyTypeId: parseInt(propertyExisted.propertyTypeId)
                        }
                    }
                }
            });
            const newPropertyId = newProperty.propertyId;
            console.log(typeof (newPropertyId))
            const savedFiles = await Promise.all(
                files.map(async (file) => {
                    const savedFile = await prisma.propertyImage.create({
                        data: {
                            imageUrl: file.path,
                            property: {
                                connect: {
                                    propertyId: newPropertyId
                                }
                            }
                        },
                    });
                    return savedFile;
                })
            );
            res.json(savedFiles)

        } catch (error) {
            next(error)
        }
    }


    getAllroperty = async (req, res, next) => {
        try {
            const testproperty = await prisma.property.findMany();
            console.log(testproperty)
            const getAllProperties = await prisma.property.findMany({

                include: {
                    owner: {
                        select: {
                            userId: true,
                            username: true,
                            email: true,
                            phoneNumber: true,
                        },
                    },
                    images: true,
                    propertyType: true
                }
            });

            const propertiesWithDetails = getAllProperties.map((property) => {
                const {
                    propertyId,
                    address,
                    area,
                    description,
                    price,
                    isAvailable = true,
                    numberOfRooms,
                    numberOfFlats,
                    numberOfShutter,
                    owner,
                    propertyType,
                    images
                } = property;

                // const { owner, propertyType, images } = property;

                // Extract relevant details from owner, propertyType, and images
                const ownerDetails = {
                    userId: owner.userId,
                    username: owner.username,
                    email: owner.email,
                    phoneNumber: owner.phoneNumber,
                };

                const propertyTypeDetails = {
                    propertyTypeId: propertyType.propertyTypeId,
                    propertyName: propertyType.propertyName,
                };

                const propertyImages = images.map((image) => image.imageUrl);

                return {
                    propertyId,
                    address,
                    area,
                    description,
                    price,
                    isAvailable,
                    numberOfRooms,
                    numberOfFlats,
                    numberOfShutter,
                    owner: ownerDetails,
                    propertyType: propertyTypeDetails,
                    images: propertyImages,
                };
            });
            console.log(propertiesWithDetails)
            // res.status(200).json(propertiesWithDetails);
            res.send(propertiesWithDetails);
        } catch (error) {
            next(error)
        }
    }

    //fetching property details
    getPropertydetails = async (req, res, next) => {
        const { propertyId } = req.params;
        try {
            const getAllProperties = await prisma.property.findUnique({
                where: {
                    propertyId: parseInt(propertyId),
                },
                include: {
                    owner: {
                        select: {
                            userId: true,
                            username: true,
                            email: true,
                            phoneNumber: true,
                        },
                    },
                    images: true,
                    propertyType: true
                }
            });
            console.log(getAllProperties)
            console.log(typeof (propertyId))
            // res.status(200).json(propertiesWithDetails);
            res.send(getAllProperties);
        } catch (error) {
            next(error)
        }
    }

    
    getPropertyTypeById = async (req, res, next) => {
        const { typeId } = req.params;
        try {
            const getPropertyTypeId = await prisma.propertyType.findUnique(
                {
                    where: {
                        propertyTypeId: parseInt(typeId)
                    }
                }
            )
            if (!getPropertyTypeId) {
                return res.status(404).json({ error: 'Property type not found' });
            }
        } catch (error) {
            next(error)
        }
    }

    // deletePropertyById = async (req, res, next) => {
    //     const { propertyId } = req.params;
    //     try {
    //         //checking the property existed or not
    //         const propertyExisted = await prisma.propertyType.findUnique(
    //             {
    //                 where: {
    //                     propertyId: parseInt(propertyId)
    //                 }
    //             }
    //         )
    //         if (!propertyExisted) {
    //             return res.status(404).json({ error: 'Property not found' });
    //         }

    //         //deleting the property
    //         const deleteProperty = await prisma.property.delete({
    //             where: {
    //                 propertyId: parseInt(propertyId)
    //             }
    //         })
    //         console.log(`using ${deleteProperty}, property is deleted successfully!!`)

    //     } catch (error) {
    //         next(error)
    //     }
    // }

    updateProperty = async (req, res, next) => {
        try {
            const { propertyId } = req.params;
            const { address, area, description, price, flatNumber, roomNumber, shutterNumber, propertyName } = req.body;
            const amounts = parseInt(price, 10);
            const numberOfFlats = parseInt(flatNumber, 10);
            const numberOfRooms = parseInt(roomNumber, 10);
            const numberOfShutter = parseInt(shutterNumber, 10);
            const files = req.files;
            console.log("Request Body:", req.body);

            if (!req.user.userId) {
                console.log("not logged in")
            }

            const propertyType = await prisma.propertyType.findFirst({
                where: {
                    propertyName: propertyName
                }
            });

            const updatedProperty = await prisma.property.updateMany({
                where: {
                    propertyId: parseInt(propertyId)
                },
                data: {
                    address,
                    area,
                    description,
                    price: amounts,
                    numberOfRooms,
                    numberOfFlats,
                    numberOfShutter,
                    propertyTypeId: propertyType.propertyTypeId,
                    isAvailable: true
                }
            });

            if (files && Array.isArray(files)) {
                const savedFiles = await Promise.all(
                    files.map(async (file) => {
                        const savedFile = await prisma.propertyImage.create({
                            data: {
                                imageUrl: file.path,
                                property: {
                                    connect: {
                                        propertyId: parseInt(propertyId)
                                    }
                                }
                            }
                        });
                        return savedFile;
                    })
                );
            }
            console.log(updatedProperty)
            return res.json(updatedProperty);
        } catch (error) {
            next(error);
        }
    };


    deletePropertyById = async (req, res, next) => {
        try {
            const { propertyId } = req.params;
            const userId = req.user.userId;
            if (!userId) {
                return res.status(401).json({ message: "Please log in first" });
            }

            await prisma.propertyImage.deleteMany({
                where: {
                    propertyId: parseInt(propertyId)
                }
            });
            await prisma.rent.deleteMany({
                where: {
                    propertyId: parseInt(propertyId)
                },
            });
            await prisma.payment.deleteMany({
                where: {
                    propertyId: parseInt(propertyId)
                }
            });

            const deletedProperty = await prisma.property.delete({
                where: {
                    propertyId: parseInt(propertyId)
                }
            });

            console.log(`Property with ID ${propertyId} deleted successfully`);

            res.json({
                message: `Property with ID ${propertyId} deleted successfully`,
                deletedPropertyId: deletedProperty.propertyId // Return the deleted property ID
            });
        } catch (error) {
            next(error);
        }
    };


    getOwnerProperties = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            if (!userId) console.log('not logged in!!');
            const properties = await prisma.property.findUniqueOrThrow({
                where: {
                    ownerId: userId, 
                },
                include: {
                    owner: {
                        select: {
                            userId: true,
                            username: true,
                            email: true,
                            phoneNumber: true
                        }
                    },
                    images: true,
                    propertyType: true
                }
            });
            res.json(properties);
            console.log(properties.propertyId)
        } catch (error) {
            next(error);
        }
    };

    reportProperties = async (req, res) => {
        try {
            const { propertyId } = req.params;
            const user = req.user.userId;
            if (!user) {
                res.json({ error: 'not logged in' })
            }
            const existingReport = await prisma.report.findFirst({
                where: {
                    propertyId: parseInt(propertyId),
                    userId: parseInt(user)
                }
            });
    
            if (existingReport) {
                return res.json({ message: 'You have already reported this property' });
            }
            const reportedProperties = await prisma.report.create({
                data: {
                    propertyId: parseInt(propertyId),
                    userId: parseInt(user)
                }
            })
            res.json(reportedProperties)
        } catch (error) {
            return res.status(404).json({ error: 'Something went wrong' });
        }
    }

}

export const propertyController = new PropertyController();