import prisma from "../../../prisma/index.js";

class RentController {
    rentProperty = async (req, res, next) => {
        const { propertyId } = req.params;
        const tenantId = req.user.userId;
        try {
            const existedProperty = await prisma.property.findUnique({
                where: {
                    propertyId: parseInt(propertyId)
                }

            });

            if (existedProperty.ownerId === tenantId) {
                return res.status(400).json({ error: "Owner can't rent their own property" });
            }

            const isPropertyRented = await prisma.rent.findFirst({
                where: {
                    propertyId: parseInt(propertyId),
                    isAccepted: true
                }
            });

            if (isPropertyRented) {
                return res.status(400).json({ error: "Property is already rented" });
            }

            const existingRequest = await prisma.rent.findFirst({
                where: {
                    propertyId: parseInt(propertyId),
                    tenantId: parseInt(tenantId),
                    isAccepted: false
                }
            });

            if (existingRequest) {
                return res.status(400).json({ error: "You already requested to rent this property" });
            }


            const propertyRent = await prisma.rent.create({
                data: {
                    property: { connect: { propertyId: parseInt(existedProperty.propertyId) } },
                    tenant: { connect: { userId: parseInt(tenantId) } }
                }
            })

            res.json(propertyRent);


        } catch (error) {
            next(error)
            console.log("Renting error: ", error)
        }
    }


    getAllRentRequests = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            if (!userId) console.log('not logged in!!');
            const properties = await prisma.property.findMany({
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
                    propertyType: true,
                    rent: {
                        where: {
                            isAccepted: false
                        },
                        include: {
                            tenant: {
                                select: {
                                    userId: true,
                                    username: true,
                                    email: true,
                                    phoneNumber: true
                                }
                            }
                        }
                    }
                }
            });
            if (properties.length === 0) {
                console.log('No properties found for the user with ID:', userId);
                return res.status(404).json({ error: 'No properties found for the user.' });
            }
            res.json(properties);
            console.log(properties)
        } catch (error) {
            next(error);
        }
    };



    acceptedRentProperty = async (req, res) => {
        const { rentId } = req.params
        try {
            const rentRequest = await prisma.rent.findUnique({
                where: {
                    rentId: parseInt(rentId)
                },
                include: {
                    property: true, // Include the property details in the query
                    tenant: true // Include the tenant details in the query
                }
            });

            if (!rentRequest) {
                return res.status(404).json({ error: "Rent request not found" });
            }
            const acceptedRentRequest = await prisma.rent.update({
                where: {
                    rentId: parseInt(rentId)
                },
                data: {
                    isAccepted: true // Mark the rent request as accepted
                }
            });
            const updatedProperty = await prisma.property.update({
                where: {
                    propertyId: rentRequest.property.propertyId
                },
                data: {
                    isAvailable: false
                }
            });
        
            // Construct the message including owner's name
            // const message = `Your rental request for property "${rentRequest.property.address}" has been accepted by ${ownerUsername}.`;
            res.json({ acceptedRentRequest });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    rejectRentProperty = async (req, res) => {
        const { rentId } = req.params
        try {
            const rentRequest = await prisma.rent.findUnique({
                where: {
                    rentId: parseInt(rentId)
                },
                include: {
                    property: true,
                    tenant: true
                }
            });

            if (!rentRequest) {
                return res.status(404).json({ error: "Rent request not found" });
            }
            await prisma.rent.delete({
                where: {
                    rentId: parseInt(rentId)
                }
            });

            res.json({ message: "You rejected he request" })
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    sendNotification = async (req, res) => {
        const tenantId = req.user.userId;
        try {
            const acceptedRentRequest = await prisma.rent.findMany({
                where: {
                    tenantId: parseInt(tenantId),
                    isAccepted: true,
                },
                include: {
                    property: {
                        include: {
                            owner: {
                                select: {
                                    username: true
                                }
                            },
                            propertyType:{
                                select:{
                                    propertyName:true
                                }
                            }
                        }
                    },
                    tenant: true
                }
            });
    
            if (!acceptedRentRequest) {
                return res.status(404).json({ error: "No accepted rent request found for the tenant" });
            }
    
            const messages = acceptedRentRequest.map(acceptedRentRequest => {
                const { property, tenant } = acceptedRentRequest;
                if (!property) {
                    return `No property found for this rent request`;
                }
                const { address } = property;
                const {propertyName}= property.propertyType;
                const { username: ownerUsername } = property.owner;
                const { username: tenantUsername } = tenant;
                return `Hi &nbsp;<strong>${tenantUsername}</strong>, your rental request for &nbsp; <strong>${propertyName}</strong> 
                &nbsp;at ${address} has been accepted by owner <strong>
                &nbsp; ${ownerUsername}</strong>`;
            });
    
            res.json( messages );
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}
export const rentController = new RentController();