const { getUser,getPegawai } = require('../model/akun');
var jwt = require('jsonwebtoken');
module.exports = {
    login:async (req, res) => {
        const { user, password, privilege } = req.body;
        const isExist = await getUser(user, password);

        // console.log(isExist);
        // console.log(privilege);

        function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
        }

        if (isExist != undefined) {
            let priv = getKeyByValue(isExist, "true")
            if (priv != privilege) {
                console.log(priv);
                return res.status(401).json({
                    error: true,
                    message: 'privilege tidak sesuai'
                });
            }
            let data = {
                user: user,
                privilege: priv
            }
            var token = jwt.sign(data, process.env.JWT_SECRET_KEY);
            console.log(token);
            console.log(data);
            return res.status(200).json({
                error: false,
                message: 'Login Berhasil',
                token: token
            });
        }else{
            res.status(400).json({
                error: true,
                message: 'User/Password Salah',
                data : `user = ${user} dan Pw : ${password}`
            });
        }      
    },
    dokter:async (req, res) => {
        const { user, password } = req.body;
        const isExist = await getUser(user, password);
        console.log(isExist);
        if (isExist == undefined) {
           return res.status(400).json({
               error: true,
                message: 'username/password salah',
                data : null
            });
        }
        if (isExist.dokter = true) {
            const pegawai = await getPegawai(user);
            let data = {
                nama : pegawai.nama,
                nik : pegawai.nik,
                jabatan : pegawai.jbtn,
                jk : pegawai.jk
            }
            var token = jwt.sign(data,process.env.JWT_SECRET_KEY);
            console.log(token);
            console.log(pegawai.nama);
            return res.status(200).json({
                error: false,
                message: 'Login dokter Berhasil',
                token: token,
                data: data
            });
        }else{
        return    res.status(400).json({
            error: true,
                message: 'User/Password Salah',
                data : null
            });
        }      
    },
};