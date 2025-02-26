import mongoose from "mongoose";

const { Schema, model } = mongoose;

const SellerSchema = new Schema({
    AccountType: {
        type: String,
        enum: ["Personal", "Business"],
        required: [true, "Account type is required"],
    },
    Store_name: {
        type: String,
        unique: [true, "store name must be unique"],
        trim: true,
        required: [true, "Store name is required"],
    },
    email: {
        type: String,
        unique: [true, "email must be unique"],
        trim: true,
        required: [true, "email is required"],
    },
    address:{
        type:String,
        trim: true,
        required: [true, "address is required"],
    },
    Bank_details:{
        type :[
            {
                BankNumber:{
                    type:String,
                    required:[true,"BankNumber must be reqiured "],
                    trim:true
                },
                PinNumber: {
                    type:String,
                    required:[true,"PinNumber must be required"],
                    trim:true
                }
            }
        ]
        ,default:[],
    }
});

const SelleModel = model("Seller",SellerSchema);

export default SelleModel;
