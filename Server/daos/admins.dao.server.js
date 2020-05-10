const adminModel = require('../models/admins.model.server');

const createAdmin = (user) => {
    return adminModel.create(user)
};
const findAllAdmins = () => {
    return adminModel.find()
};
const findAdminById = (userId) => {
    return adminModel.findOne({_id: userId})
};
const findAdminByCredentials = (username,password) => {
    if(password)
        return adminModel.findOne({username:username, password:password})
    return adminModel.findOne({username:username})
};
const findAdminByEmail = (email) => {
    return adminModel.findOne({email:email})
};
const updateAdmin = (user)=> {

    return adminModel.findOneAndUpdate({username:user.username}, user,{new:true},(err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }

        console.log(doc);
    });
}
const deleteAdmin = (userId) => {
    return adminModel.deleteOne({
                                   _id: userId
                               })
}
module.exports = {
    createAdmin,
    findAllAdmins,
    findAdminById,
    findAdminByCredentials,
    deleteAdmin,
    updateAdmin,
    findAdminByEmail
}
