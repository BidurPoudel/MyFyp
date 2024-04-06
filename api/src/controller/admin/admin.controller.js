import prisma from "../../../prisma/index.js";

class AdminController {
    getAllUsers = async (req, res) => {
        try {
            const users = await prisma.user.findMany();
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
                where: { propertyId: parseInt(propertyId)},
                include: { propertyImage: true, rent: true, owner: true }
            });
    
            // Check if the property exists
            if (!property) {
                return res.status(404).json({ error: 'Property not found' });
            }
    
            // Check if the property belongs to the authenticated user
            if (property.owner.userId !== parseInt(userId)) {
                return res.status(403).json({ error: 'Forbidden' });
            }
    
            // Delete associated property images
            await prisma.propertyImage.deleteMany({
                where: { propertyId: parseInt(propertyId) },
            });
    
            // If the property is rented, delete the associated rent
            if (property.rent.length > 0) {
                await prisma.rent.delete({
                    where: { propertyId: parseInt(propertyId) },
                });
            }
    
            // Delete the property
            await prisma.property.delete({
                where: { propertyId: parseInt(propertyId) },
            });
    
            res.status(204).end(); // Respond with success
        } catch (error) {
            console.error('Error deleting property:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    
}
export const adminController = new AdminController();