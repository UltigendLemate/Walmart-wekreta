const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: false},
    pincode: {type: Number, required: false},
    phone: {type:Number, required: true, unique:true},
    password: { type: String, required: true },
    isuser: {type:Boolean, default:false},
    credit: {type: Number, default:0},
    cart: {type: Array,default:null}
  },{timestamps: true});

  mongoose.models = {};
  export default mongoose.model("Vendor", VendorSchema);
