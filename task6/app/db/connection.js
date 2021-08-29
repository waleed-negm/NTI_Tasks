const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/tasks", {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
