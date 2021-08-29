const mongoose = require("mongoose");
const Data = mongoose.model("Data", {
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
    },
    dueDate: {
        type: Date,
        validate(value) {
            if (Date.parse(value) < new Date()) {
                throw new Error("invalid date");
            }
        },
    },
});

module.exports = Data;
