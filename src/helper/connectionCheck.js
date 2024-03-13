require("dotenv").config();

function db_connection_check(db, name) {
    db.authenticate().then(
        () => {
            console.log(`${name} Db connected successfully.....................`);
        }
    ).catch((err) => {
        console.log(`Unable to connect ${name} db............................`,"err",err);
    });
}

module.exports = {
    db_connection_check
}