import prisma from "../../../prisma/index.js";



class AdminController{
    createPropertyType = async(req, res, next)=>{
        try {
            const createProperty = await prisma.propertyType.createMany({
                data:[
                    {propertyName: "Land"},
                    {propertyName: "Building"},
                    {propertyName: "Rooms"},
                    {propertyName: "Shutters"},
                    {propertyName: "Flats"},
                ]
            })
            console.log(createProperty)
            res.json({message:"PropertyTypeCreated"})
        } catch (error) {
            
        }
    }
    
    
    addNewPropertyType = async (req, res, next) => {
        const { propertyName } = req.body;
        try {
            const newPropertyType = await prisma.propertyType.create({
                data:{
                    propertyName
                }
            })
            res.status(201).json({ status: "sucess", messgae: "new property type created!" }, newPropertyType);
        } catch (error) {
            next(error)
        }
    }
    updatePropertyTypeById = async (req, res, next)=>{
        const {propertyTypeId} = req.params;
        const {propertyName} = req.body;
        const id = parseInt(propertyTypeId)

        try {
            const updateProperty = await prisma.propertyType.update({
                where:{
                    propertyTypeId: id
                },
                data:{
                    propertyName
                }
            })
        } catch (error) {
            
        }
    }
}

export const adminController = new AdminController();