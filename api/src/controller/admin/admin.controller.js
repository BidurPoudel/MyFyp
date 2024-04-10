import prisma from "../../../prisma/index.js";

class AdminController {
    getAllUsers = async (req, res) => {
        try {
            const users = await prisma.user.findMany({
                select: {
                    userId: true,
                    username: true,
                    email: true,
                    phoneNumber: true,
                    password:false
                }
            });
            res.json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Error fetching users' });
        }
    };

    deleteUserById = async (req, res) => {
        const { userId } = req.params;
        try {
            // Retrieve properties rented by the user
            const rentedProperties = await prisma.property.findMany({
                where: {
                    ownerId: parseInt(userId),
                    rent: {
                        some: {},
                    },
                },
            });
    
            // Delete associated rents and property images for each rented property
            await Promise.all(
                rentedProperties.map(async (property) => {
                    await prisma.rent.deleteMany({
                        where: {
                            propertyId: property.propertyId,
                        },
                    });
                    await prisma.propertyImage.deleteMany({
                        where: {
                            propertyId: property.propertyId,
                        },
                    });
                })
            );
    
            // Delete all properties of the user
            await prisma.property.deleteMany({
                where: {
                    ownerId: parseInt(userId),
                },
            });
    
            // Delete the user
            await prisma.user.delete({
                where: {
                    userId: parseInt(userId),
                },
            });
    
            res.json({ success: true, message: 'User and associated data deleted successfully' });
        } catch (error) {
            console.error('Error deleting user and associated data:', error);
            res.status(500).json({ success: false, error: 'Error deleting user and associated data' });
        }
    }
    
    getAllProperties = async (req, res) => {
        try {
            const properties = await prisma.property.findMany({
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
            res.json(properties);
        } catch (error) {
            console.error('Error fetching properties:', error);
            res.status(500).json({ error: 'Error fetching properties' });
        }
    };

    deletePropertyById = async (req, res) => {
        const { propertyId } = req.params;
    
        try {
            // Find the property
            const property = await prisma.property.findUnique({
                where: { propertyId: parseInt(propertyId) },
                include: { rent: true }
            });
    
            // Check if the property exists
            if (!property) {
                return res.status(404).json({ error: 'Property not found' });
            }
    
            
            await prisma.propertyImage.deleteMany({
                where: { propertyId: parseInt(propertyId) },
            });
    
            // If the property is rented, delete the associated rent
            if (property.rent.length > 0) {
                await prisma.rent.deleteMany({
                    where: { propertyId: parseInt(propertyId) },
                });
            }
    
            // Delete the property
            await prisma.property.delete({
                where: { propertyId: parseInt(propertyId) },
            });
    
            res.json({message: 'sucessfully deleted property'}); // Respond with success
        } catch (error) {
            console.error('Error deleting property:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    
    getAllRentedProperties= async (resq, res)=>{
        try {


            const rentedProperties = await prisma.rent.findMany({
                include:{
                    property: {
                        include:{
                            owner: true,
                            propertyType:true
                        }
                    },
                    tenant: true,
                }
            })
            console.log(rentedProperties)
            res.json(rentedProperties)
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    

    deleteRentedPropertyById = async (req, res) => {
        const { propertyId } = req.params;
    
        try {
            const property = await prisma.property.findUnique({
                where: { propertyId: parseInt(propertyId) },
                include: { rent: true }
            });
    
            if (!property) {
                return res.status(404).json({ error: 'Property not found' });
            }
    
            if (property.rent.length === 0) {
                return res.status(400).json({ error: 'Property is not currently rented' });
            }
    
            await prisma.rent.deleteMany({
                where: { propertyId: parseInt(propertyId) },
            });
    
            res.json({ message: 'Successfully deleted rented property' }); 
        } catch (error) {
            console.error('Error deleting rented property:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    getAllPaymentDetails = async (req, res)=>{
        try {
            const payments = await prisma.payment.findMany({
                include:{
                    owner: true
                }
            })
            res.json(payments)
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    getAllReportedProperties = async (req,res)=>{
        try {
            const allReportedProperties = await prisma.report.findMany({
                include:{
                    reporter: {
                        select:{
                            userId:true,
                            username: true,
                            email:true,
                            phoneNumber: true,
                            password:false
                        }
                    },
                    property: {
                        include:{
                            owner:{
                                select:{
                                    userId:true,
                                    username: true,
                                    email:true,
                                    phoneNumber: true,
                                    password:false
                                }
                            },
                            propertyType:true
                        }
                    }
                }
            })
            res.json(allReportedProperties)
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    deleteReportedProperties = async (req, res)=>{
        try {
            const {propertyId} = req.params;
            const property = await prisma.property.findUnique({
                where: { propertyId: parseInt(propertyId) },
                include: { rent: true }
            });
    
            if (!property) {
                return res.status(404).json({ error: 'Property not found' });
            }
            await prisma.report.deleteMany({
                where: { propertyId: parseInt(propertyId) },
              });
              
            await prisma.rent.deleteMany({
              where: { propertyId: parseInt(propertyId) },
            });
            await prisma.propertyImage.deleteMany({
                where: { propertyId: parseInt(propertyId) },
              });
          
              await prisma.property.delete({
                where: { propertyId: parseInt(propertyId) },
              });
          
              
              console.lo
              res.json('Deleted all the details of property')
          } catch (error) {
            console.error('Error deleting reported property:', error);
            res.status(500).json({ error: 'Internal server error.' });
          }
    }
    
    
}
export const adminController = new AdminController();