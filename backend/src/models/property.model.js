import mongoose, {Schema} from "mongoose";

const propertySchema = new Schema({
    name : {
        type: String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    bathrooms : {
        type : Number, required : true,
    },
    bedrooms : {
        type : Number,
        required : true,
    },
    furnished : {
        type : Boolean,
        required : true,
        default : false,
    },
    parking : {
        type : Boolean,
        required : true,
        default : false,
    },
    imageUrls : {
        type : Array,
        required : true,
    },
    schoolDistance : {
        type: Number,
        required : true,
    },
    hospitalDistance: {
        type : Number, 
        required : true,
    },
    railwayDistance : {
        type : Number,
        required : true,
    },
    busstopDistance : {
        type : Number,
        required : true,
    },
    userRef : {
        type : String,
        required : true,
    },
}, {timestamps: true});

const Property = mongoose.model('Property', propertySchema);

export default Property;