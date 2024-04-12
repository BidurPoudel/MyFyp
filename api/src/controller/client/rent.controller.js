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
                res.status(400).json({ error: "Onwer can't rent his/her own property" })
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
            if(!userId) console.log('not logged in!!');
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
                    rent:{
                        where:{
                            isAccepted:false
                        },
                        include:{
                            tenant:{
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

            res.json(acceptedRentRequest);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}
export const rentController = new RentController();