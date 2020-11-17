const pool = require('./pool');
const bcrypt = require('bcrypt');

// Api Funcrion Call ---------------------------------------------------
function User() {};

User.prototype = {
    // Get all users

    Getallusers : function(callback){
        pool.query("SELECT * FROM user", function(err, result) {
            if(err) throw err

            if(result.length) {
                callback(result);
            }else {
                callback(null);
            }
        });
    },

    //Get an user

    Getanuser : function(id,callback){
        pool.query('SELECT * FROM user WHERE id = ?', [id], function(err, result) {
            if(err) throw err

            if(result.length) {
                callback(result);
            }else {
                callback(null);
            }
        });
    },

    // Add User 

    Adduser : function(body, callback){

        // var pwd = body.password;
        // Hash the password before insert it into the database.
        // body.password = bcrypt.hashSync(pwd,10);
        // prepare the sql querys
        let sql = `INSERT INTO user(fullname, email, phone, password, reg_no, user_role, academic_from, academic_to, company, address, approved)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        // call the query give it the sql string and the values (bind array)
        pool.query(sql, [body.fullname,body.email,body.phone,body.password,body.reg_no,body.user_role,body.academic_from,body.academic_to,body.company,body.address,body.approved], function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no error
            callback(result);
        });
    },

    // Update User

    Updateuser : function(body, id, callback){

        // prepare the sql querys
        let sql = `UPDATE user SET fullname = ?,phone = ?, email = ?,password = ?,reg_no = ?,user_role = ?,academic_from = ?,
                  academic_to = ?, company = ?, address = ?, approved = ? WHERE id = ?`;
        let data = [body.fullname,body.phone,body.email,body.password,body.reg_no,body.user_role,body.academic_from,body.academic_to,body.company,body.address,body.approved, id];
        // call the query give it the sql string and the values (bind array)
        pool.query(sql, data, function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no error
            callback(result);
        });
    },

        // Approve User

        Approveuser : function(body, id, callback){

            // prepare the sql querys
            let sql = `UPDATE user SET approved = ? WHERE id = ?`;
            let data = [body.approved, id];
            // call the query give it the sql string and the values (bind array)
            pool.query(sql, data, function(err, result) {
                if(err) throw err;
                // return the last inserted id. if there is no error
                callback(result);
            });
        },

    // Delete User

        Deleteuser : function(id, callback){

            pool.query('DELETE FROM user WHERE id = ?', [id], function(err, result) {
                if(err) throw err
    
                if(result.length) {
                    console.log(result,'res')
                    callback(result);
                }else {
                    callback(null);
                }
            });
        },





// -------------------------------------------------------------------------------------------------------------


//  LOGIN - USER DETAILS FETCH ---------------------------------------------------


    // Find the user data by id or username.
    find : function(user = null, callback)
    {
        // if the user variable is defind
        // if(user) {
        //     // if user = number return field = id, if user = string return field = username.
        //     var field = Number.isInteger(user) ? 'id' : 'username';
        // }
        // prepare the sql query
        let sql = `SELECT * FROM user WHERE email = ?`;


        pool.query(sql, [user], function(err, result) {
            if(err) throw err

            if(result) {
                callback(result[0]);
            }else {
                callback(null);
            }
        });
    },

    login : function(user_role, email, password, callback)
    {
        // find the user data by his username.
        this.find(email, function(user) {
            // if there is a user by this username.
            if(user) {
                if(user_role == user.user_role){
                    if(password == user.password) {
                        // return his data.
                        var data = user
                        callback(data);
                        return;
                    }
                }
  
            }
            // if the username/password is wrong then return null.
            callback(null);
        });
        
    }

}

// -----------------------------End-----------------------------------------

module.exports = User;