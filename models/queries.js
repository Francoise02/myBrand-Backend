const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const QueriesSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,

            required: true,
        },
        email: {
            type: String,

            required: true,
        },
        message: {
            type: String,

            required: true,
        },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// QueriesSchema.plugin(AutoIncrement);
const Queries = mongoose.model("Queries", QueriesSchema);

module.exports = Queries;
