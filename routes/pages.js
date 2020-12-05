const express = require('express');
const User = require('../core/user');
const Event = require('../core/event');
const router = express.Router();

// create an object from the class User in the file core/user.js
const user = new User();
const event = new Event();

// Get All user list

router.get('/users', (req, res, next) => {
    user.Getallusers(function(result){
        if(result) {
            res.send({"data": result, "status": 200});
        }else {
            res.send({"message": "something went wrong", "status": 400});
        }
    })
})

// Get a user 

router.get('/users/:id', (req, res, next) => {
    user.Getanuser(req.params.id,function(result){
        if(result) {
            res.send(result);
        }else {
            res.send({"message": "something went wrong", "status": 404});
        }
    })
})

// Add User

router.post('/users/add', (req, res, next) => {
    // prepare an object containing all user inputs.
    let userInput = {
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        reg_no: req.body.reg_no,
        user_role: req.body.user_role,
        academic_from: req.body.academic_from,
        academic_to: req.body.academic_to,
        company: req.body.company,
        designation: req.body.designation,
        address: req.body.address,
        approved: req.body.approved
    };
    // call create function. to create a new user. if there is no error this function will return it's id.
    user.Adduser(userInput, function(result) {

        if(result) {
            res.send({"message": result.affectedRows+" row added", "status":200});
        }else {
            res.send({"message": "something went wrong", "status": 404});
        }
    });

});

// Update User

router.put('/users/update/:id', (req, res) => {
    let data = {
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        reg_no: req.body.reg_no,
        user_role: req.body.user_role,
        academic_from: req.body.academic_from,
        academic_to: req.body.academic_to,
        company: req.body.company,
        designation: req.body.designation,
        address: req.body.address,
        approved: req.body.approved
    };

    user.Updateuser(data, req.params.id, function(result) {

        if(result) {
            res.send({"message": "User Updated Successfully", "status":200});
        }else {
            res.send({"message": "something went wrong", "status": 400});
        }
    });
})

// Add Image

router.put('/users/update/image/:id', (req, res) => {
    let data = {
        img_url: req.body.img_url
    };

    user.AddImage(data, req.params.id, function(result) {

        if(result) {
            res.send({"message": "Image Updated Successfully", "status":200});
        }else {
            res.send({"message": "something went wrong", "status": 400});
        }
    });
})

// Update Password

router.put('/users/update/password/:id', (req, res) => {
    let data = {
        password: req.body.password
    };

    user.Updatepassword(data, req.params.id, function(result) {

        if(result) {
            res.send({"message": "Password Updated Successfully", "status":200});
        }else {
            res.send({"message": "something went wrong", "status": 400});
        }
    });
})

// Approve User

router.put('/users/appove/:id', (req, res) => {
    let data = {
        approved: req.body.approved
    };

    user.Approveuser(data, req.params.id, function(result) {

        if(result) {
            res.send({"message": "User Approved Successfully", "status":200});
        }else {
            res.send({"message": "something went wrong", "status": 400});
        }
    });
})


// Delete User 

router.delete('/users/delete/:id', (req, res, next) => {
    user.Deleteuser(req.params.id,function(result){
        if(result) {
            res.send({"message": "User Deleted Successfully", "status":200});
        }else {
            res.send({"message": "something went wrong", "status": 404});
        }
    })
})




// -------------------------------------------------------------------------------------------------------------


//  LOGIN 


// Post login data
router.post('/login', (req, res, next) => {
    // The data sent from the user are stored in the req.body object.
    // call our login function and it will return the result(the user data).
    user.login(req.body.user_role, req.body.email, req.body.password, function(result) {
        if(result) {
            res.send({"user": result,"message": "User Successfully Loggedin", "status":200});
        }else {
            // if the login function returns null send this error message back to the user.
            res.send({"message": "Incorrect Email/Password", "status":400});
        }
    })

});


// ----------------------------------------------------------------------------------------------------------------

// EVENTS

// Get all events

router.get('/events', (req, res, next) => {
    event.Getallevent(function(result){
        if(result) {
            res.send({"data": result, "status": 200});
        }else {
            res.send({"message": "something went wrong", "status": 400});
        }
    })
})

// Add Event

router.post('/events/add', (req, res, next) => {
    // prepare an object containing all user inputs.
    let eventInput = {
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        venue: req.body.venue,
    };
    // call create function. to create a new user. if there is no error this function will return it's id.
    event.Addevent(eventInput, function(result) {

        if(result) {
            res.send({"message": result.affectedRows+" event added","id": result.insertId, "status":200});
        }else {
            res.send({"message": "something went wrong", "status": 404});
        }
    });

});

// Update Event

router.put('/events/update/:id', (req, res) => {
    let data = {
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        venue: req.body.venue,
    };

    event.Updateevent(data, req.params.id, function(result) {

        if(result) {
            res.send({"message": "Event Updated Successfully", "status":200});
        }else {
            res.send({"message": "something went wrong", "status": 400});
        }
    });
})


// Delete Event 

router.delete('/events/delete/:id', (req, res, next) => {
    event.Deleteevent(req.params.id,function(result){
        if(result) {
            res.send({"message": "User Deleted Successfully", "status":200});
        }else {
            res.send({"message": "something went wrong", "status": 404});
        }
    })
})



module.exports = router;