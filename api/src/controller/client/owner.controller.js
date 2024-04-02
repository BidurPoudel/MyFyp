import prisma from "../../../prisma/index.js";

class OwnerController{

    getOwnerProperties = async (req, res, next) => {
        try {
            const userId = req.user.userId;
            if(!userId) console.log('not logged in!!');
            const properties = await prisma.property.findMany({
                where: {
                    isAvailable: true,
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
    
}
export const ownerController = new OwnerController()