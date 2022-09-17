const { getUser,getPegawai } = require('../model/akun');
var jwt = require('jsonwebtoken');
module.exports = {
    login:async (req, res) => {
        const { user, password } = req.body;
        const isExist = await getUser(user, password);
        console.log(isExist);
        if (isExist != undefined) {

            return res.status(200).json({
                status: true,
                message: 'Login Berhasil',
                data: null
            });
        }else{
            res.status(400).json({
                status: false,
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
                status: false,
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
                status: true,
                message: 'Login dokter Berhasil',
                token: token,
                data: data
            });
        }else{
        return    res.status(400).json({
                status: false,
                message: 'User/Password Salah',
                data : null
            });
        }      
    },
};