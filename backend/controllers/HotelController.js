import Hotel from "../models/Hotel.js";
import { upload_thumbnail, upload_gallery, delete_images} from "../config/image_handler/hotel_image_handler.js";

const HotelController = {
  
  get: async (req, res) => {
    console.log(req.query)
    if(req.query._id){
      res.status(200).json(await Hotel.findById(req.query));
    }
    else{
      res.status(200).json(await Hotel.find(req.query).limit(10).skip(0));
    }
    
  },
  add: async (req, res) => {
   
    const hotel = await Hotel.create({name:req.body.name});
    const thumbnail = req.files.thumbnail
    const gallery = req.files.gallery
    
    if(thumbnail){await upload_thumbnail(hotel, thumbnail)}
    if(gallery){await upload_gallery(hotel, gallery)}
    await hotel.save()
    res.status(200).json({hotel: "Abc"})
  },
  edit: async (req, res) => {
    const hotel = await Hotel.create({name:req.body.name});
    const thumbnail = req.files.thumbnail
    const gallery = req.files.gallery
    
    if(thumbnail){await upload_thumbnail(hotel, thumbnail)}
    if(gallery){await upload_gallery(hotel, gallery)}
    await hotel.save()
    res.status(200).json(await Hotel.findOneAndUpdate(req.query, req.body));
  
  },
  delete: async (req, res) => {
    delete_images(req.query._id)
    res.status(200).json(await Hotel.findByIdAndDelete(req.query._id));

  },
};
export default HotelController;
