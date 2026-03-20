import {v2 as cloudinary} from 'cloudinary';
import supabase from '../config/supabase.js';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY
  });
  

// function for add product
const addProduct = async (req, res) => {
    try {
        console.log("Received product add request");
        console.log("Body:", req.body);
        console.log("Files:", req.files ? Object.keys(req.files) : "No files");

        const { name, description, price, category, subCategory, sizes, bestseller, discount } = req.body;

        // ✅ Ensure req.files exists
        if (!req.files || Object.keys(req.files).length === 0) {
            console.log("Error: No images uploaded");
            return res.status(400).json({ success: false, message: "No images uploaded" });
        }

        // ✅ Extract images safely
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        // ✅ Upload images to Cloudinary
        console.log("Uploading images to Cloudinary...");
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'});
                return result.secure_url;
            })
        );
        console.log("Images uploaded:", imagesUrl);

        // ✅ Create product data object
        const productData = {
            name,
            description,
            price: Number(price),
            category,
            // Use lowercase 'subcategory' to match standard Postgres behavior
            subcategory: subCategory, 
            sizes: JSON.parse(sizes),
            bestseller: bestseller === "true" ? true:false,
            discount: Number(discount) || 0,
            images: imagesUrl,
            date: new Date().toISOString(),
        };

        // ✅ Save product in DB
        const { data, error } = await supabase
            .from('products')
            .insert([productData]);

        if (error) throw error;

        console.log("Product saved successfully!");
        res.json({ success: true, message: "Product Added" });

    } 
    catch (error){
        console.error("Add Product Controller Error:", error);
        res.status(500).json({success:false, message: error.message})
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        if (!supabase) {
            return res.status(500).json({ success: false, message: "Supabase client not initialized. Check your environment variables." });
        }

        const { data: products, error } = await supabase
            .from('products')
            .select('*'); // Supabase returns columns as is

        if (error) throw error;
        res.json({ success: true, products })
    }
    catch (error) {
        console.error("List Products Error:", error);
        res.status(500).json({ success: false, message: error.message })
    }
}

// function for remove product
const removeProduct = async (req, res) => {
    try {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', req.body.id);

        if (error) throw error;
        res.json({ success: true, message: "Product removed"})
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        const { id } = req.body;
        const { data: product, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        res.json({success: true, product})
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// function to update product
const updateProduct = async (req, res) => {
    try {
        const { id, discount } = req.body;
        const { error } = await supabase
            .from('products')
            .update({ discount })
            .eq('id', id);

        if (error) throw error;
        res.json({ success: true, message: "Product Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { listProducts, addProduct, removeProduct, singleProduct, updateProduct }