import prisma from "../../../prisma/index.js";

class RentController{
    rentProperty = async(req, res, next)=>{
        const {propertyId} = req.params;
        const user= req.user;
        const tenantId = user.userId;
        try {
            const existedProperty = await prisma.property.findUnique({
                where: {
                    propertyId: parseInt(propertyId)
                }
            })
            if(!existedProperty){
                res.status(404).json({error: "Property not found"})
            }

            if (!existedProperty.isAvailable) {
                return res.status(403).json({status:"failed", error: 'Property is already rented' });
            }

            if(existedProperty.ownerId === tenantId){
                res.status(400).json({error: "Onwer can't rent his/her own property"})
            }

            const propertyRent = await prisma.rent.create({
                data:{
                    property:{connect: {propertyId: parseInt(existedProperty.propertyId)}},
                    tenant:{connect:{userId: parseInt(tenantId)}}
                }
            })
            console.log("property is rented")
            res.status(200).json(propertyRent);

            const availability = await prisma.property.update({
                where:{propertyId: parseInt(propertyId)},
                data: {isAvailable: false}
            })
        } catch (error) {
            next(error)
            console.log("Renting error: ", error)
        }
    }
}
export const rentController = new RentController();