const { con } = require('./index.js');
const jwt = require('jsonwebtoken');

var getUser = async function (id_user, password) {
    var sql = `SELECT * FROM user WHERE user.id_user = (AES_ENCRYPT(?,'nur')) and user.password=(AES_ENCRYPT(?,'windi'))`;
    return new Promise((resolve, reject) => {
        con.query(sql, [id_user,password], (error, results) => {
            if (error) {
                return reject(error);
            }
            try {
                var resultArray = Object.values(JSON.parse(JSON.stringify(results)))
                // return resolve(results);
                return resolve(resultArray[0]);
            }
            catch (err) {
                return resolve();
            }

        });
    });
};

var getPegawai = async function (id_user) {
    var sql = `SELECT * FROM pegawai WHERE pegawai.nik = ?`;
    return new Promise((resolve, reject) => {
        con.query(sql, [id_user], (error, results) => {
            if (error) {
                return reject(error);
            }
            try {
                var resultArray = Object.values(JSON.parse(JSON.stringify(results)))
                // return resolve(results);
                return resolve(resultArray[0]);
            }
            catch (err) {
                return resolve();
            }
        });
    });

};

module.exports = {
    getUser,
    getPegawai
}
