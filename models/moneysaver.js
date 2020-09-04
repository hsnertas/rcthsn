const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moneysaverSchema = new Schema({

    userId: {
        type:String,
        unique:true
    },
    inc_exp: [
        {
            amount: {
                type: Number
            },
            description: {
                type: String,
            },
            timeStamp: {
                type: Date,
                default: () => new Date()
            }
        }
    ],
    savings: {
        goal: {
            type: Number
        },
        saved: {
            type: Number
        },
        description: {
            type: String,
        },
        timeStamp: {
            type: Date,
            default: () => new Date()
        }
    }
})

const MoneySaver = mongoose.model("moneysaver", moneysaverSchema);

module.exports = MoneySaver;