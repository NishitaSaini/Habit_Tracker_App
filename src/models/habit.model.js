import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        },

        records: [
        {
            date: {
            type: String,
            required: true,
            },

            status: {
            type: String,
            default: "none",
            },
        },
        ],
    },
    {
        timestamps: true,
    }
);

const Habit =  mongoose.model('Habit', habitSchema);
export default Habit;
