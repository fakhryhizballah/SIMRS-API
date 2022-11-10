const { con } = require('./index.js');
var sql = `SELECT * FROM user WHERE user.id_user = (AES_ENCRYPT(?,'nur')) and user.password=(AES_ENCRYPT(?,'windi'))`;
const result = await con.query(sql, [id_user, password]);
return result[0];
