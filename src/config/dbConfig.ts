import { connect } from 'mongoose';


const connection = connect('mongodb://127.0.0.1:27017/sayburgh_solutions_db')
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => console.log(err));

    module.exports = connection