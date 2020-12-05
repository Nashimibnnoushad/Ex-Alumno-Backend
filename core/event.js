const pool = require('./pool');
// const bcrypt = require('bcrypt');

// Api Funcrion Call ---------------------------------------------------
function Events() {};

Events.prototype = {

// Get All Event

Getallevent : function(callback){
    pool.query("SELECT * FROM event", function(err, result) {
        if(err) throw err

        if(result.length) {
            callback(result);
        }else {
            callback(null);
        }
    });
},

// Add Event

    Addevent : function(body, callback){

        // var pwd = body.password;
        // Hash the password before insert it into the database.
        // body.password = bcrypt.hashSync(pwd,10);
        // prepare the sql querys
        let sql = `INSERT INTO event(name, description, date, time, venue)
                     VALUES (?, ?, ?, ?, ?)`;
        // call the query give it the sql string and the values (bind array)
        pool.query(sql, [body.name,body.description,body.date,body.time,body.venue], function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no error
            callback(result);
        });
    },

    // Update Event

    Updateevent : function(body, id, callback){

        // prepare the sql querys
        let sql = `UPDATE event SET name = ?,description = ?, date = ?,time = ?,venue = ? WHERE id = ?`;
        let data = [body.name,body.description,body.date,body.time,body.venue, id];
        // call the query give it the sql string and the values (bind array)
        pool.query(sql, data, function(err, result) {
            if(err) throw err;
            // return the last inserted id. if there is no error
            callback(result);
        });
    },

    // Delete Event

        Deleteevent : function(id, callback){

            pool.query('DELETE FROM event WHERE id = ?', [id], function(err, result) {
                if(err) throw err
    
                if(result.length) {
                    console.log(result,'res')
                    callback(result);
                }else {
                    callback(result);
                }
            });
        },


}

// -----------------------------End-----------------------------------------

module.exports = Events;