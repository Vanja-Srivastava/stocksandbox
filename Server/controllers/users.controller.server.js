const userDao = require('../daos/users.dao.server');
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = (app) => {
    app.post('/api/users', (req, res) => {
        const newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password, saltRounds);
        userDao.createUser(newUser)
            .then(actualUser => {
                sendSuccessMail(actualUser.email);
                res.send(actualUser)
            })
    })
    app.post('/api/authenticate',(req,res) => {
        const username = req.body.username;
        const password = req.body.password;
        userDao.findUserByCredentials(username)
            .then(user => {
                if(user && bcrypt.compareSync(password, user.password)){
                    if(user.status==='active'){
                        user.password = '**************';
                        return res.send(user)
                    } else {
                        let message = '';
                        if (user.status === 'suspended') {
                            message = 'Your Account is Suspended! Please contact admin.'
                        }
                        return res.status(403).send({
                                                        message: message
                                                    })
                    }
                } else {
                    return res.status(403).send({
                                                    message: `Invalid Credentials!`
                                                })
                }
            })
    })

    app.get('/api/checkAvailability/:username',(req,res)=>{
        const username = req.params.username;
        userDao.findUserByCredentials(username)
            .then(user => {
                if (user) {
                    return res.json({message: "Not Available"})
                } else {
                    return res.json({message: "Available"})
                }
            })
    })

    app.post('/api/forgotPassword',(req,res) => {
        const username = req.body.username;
        userDao.findUserByCredentials(username)
            .then(user => {
                if(user){
                    sendForgotPasswordMail(user);
                    return res.send("Success")
                }
            })
    })

    app.delete('/api/users/:userId',(req,res) => {
        const userId = req.params.userId;
        userDao.deleteUser(userId)
            .then(status => res.send(status))

    })
    app.put('/api/users', (req, res) => {
        const newUser = req.body;
        userDao.updateUser(newUser)
            .then(actualUser => {
                userDao.findUserByCredentials(actualUser.username)
                    .then(user => {
                        if (user) {
                            user.password = '*******';
                            return res.send(user)
                        } else {
                            return res.json({message: "Fail"})
                        }
                    })


            })
    })

    app.delete('/api/users/email/:email',(req,res) => {
        const email = req.params.email;
        userDao.findUserByEmail(email).then(user => {
            if (user) {
                userDao.deleteUser(user._id)
                    .then(status => {
                        userDao.findUserByCredentials(user.username)
                            .then(user => {
                                if (user) {
                                    return res.json({message: "fail"})
                                } else {
                                    return res.json({message: "success"})
                                }
                            })
                    })
            } else{
                return res.json({message: "User Not found"})
            }

        });
    })


    app.get('/api/users',(req,res) => {
        userDao.findAllUsers().then(allUsers => res.json(allUsers))
    })
    app.get('/api/users/:userId',(req,res) => {
        userDao.findUserById(req.params.userId).then(user => res.send(user))
    })
}

sendSuccessMail = (emailId) => {
    const sendmail = require('sendmail')();
    sendmail({
                 from: 'no-reply@stocksandbox.com',
                 to: emailId,
                 subject: 'Welcome to StockSandBox',
                 html: 'You have been registered successfully. <br> Now you can login and start learning in an virtual environment.',
             }, function(err, reply) {
        console.log(err && err.stack);
        //console.dir(reply);
    });
};

sendForgotPasswordMail = (user) => {
    const sendmail = require('sendmail')();
    sendmail({
                 from: 'no-reply@stocksandbox.com',
                 to: user.email,
                 subject: 'StockSandBox Forgot Password',
                 html: `You have requested for password. Your Password is: ${user.password}\n`,
             }, function(err, reply) {
        console.log(err && err.stack);
        //console.dir(reply);
    });
};
