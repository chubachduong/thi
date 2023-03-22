import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name :{
        type :String,
        require : true
    },
    price:{
        type :Number,
        require : true
    },
    desc:{
        type :String,
        require : true
    },
    status:{
        type :Boolean,
        require: true
    },
    quality:{
        type :Number,
        require : true
    }
})
export default mongoose.model("Product", productSchema);
