const { default: mongoose } = require("mongoose");

const dbConnect = () => {
    mongoose
        .connect("mongodb+srv://quangtu150503:w6CI7lRxbMGWxQWP@cluster0.wrdsykk.mongodb.net/magicpost?retryWrites=true&w=majority", {
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
