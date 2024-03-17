import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"      
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uplodOnClodinary=async (localFilePath)=>
{
    try {
        if (!localFilePath)  
        {
            throw new Error('Please provide a local file path');  
        }else{
        var cloudLink=await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        }

        console.log("this link of cloudlink",cloudLink) ;
        return cloudLink.url

    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null
    }
}


export {uplodOnClodinary};