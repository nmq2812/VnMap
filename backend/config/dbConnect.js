const { default: mongoose } = require("mongoose");

const dbConnect = () => {
    mongoose
        .connect("mongodb://localhost:27017/", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((data) => {
            console.log(
                `mongodb connected with server: ${data.connection.host}`,
            );
        });
};
module.exports = dbConnect;
