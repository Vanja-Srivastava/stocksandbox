const userModel = require('../models/users.model.server');

const createUser = (user) => {
    return userModel.create(user)
};
const findAllUsers = () => {
    return userModel.find()
};
const findUserById = (userId) => {
    return userModel.findOne({_id: userId})
};
const findUserByCredentials = (username,password) => {
    if(password)
    return userModel.findOne({username:username, password:password})
    return userModel.findOne({username:username})
};
const findUserByEmail = (email) => {
    return userModel.findOne({email:email})
};
const updateUser = (user)=> {

    return userModel.findOneAndUpdate({username:user.username}, user,{new:true},(err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }

        console.log(doc);
    });
}
const deleteUser = (userId) => {
    return userModel.deleteOne({
                                   _id: userId
                               })
}
module.exports = {
    createUser,
    findAllUsers,
    findUserById,
    findUserByCredentials,
    deleteUser,
    updateUser,
    findUserByEmail
}
