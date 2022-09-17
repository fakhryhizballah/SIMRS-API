var jwt = require('jsonwebtoken');
const { getPasien, getRiwayat,getIdentitasPasien } = require('../model/paisen');
const { getDataObat } = require('../model/obat');
module.exports = {
    pasien: async (req, res) => {
        const secretKey = process.env.JWT_SECRET_KEY;
        const decoded = jwt.verify(req.headers['authorization'], secretKey);
        console.log(decoded.nik);
        const data = await getPasien(decoded.nik);
        console.log(data);

         res.status(200).json({
            status: false,
            message: 'Daftar rekam medis pasien',
            record : data.length,
            data: data
        });
    },
    rkm_medis: async (req, res) => {
        const data = await getRiwayat(req.body.no_rkm_medis);
        const pasein = await getIdentitasPasien(req.body.no_rkm_medis);
        console.log(data);
         res.status(200).json({
            status: false,
            message: 'Rekam medis pasien',
            record : data.length,
            pasien : pasein,
            data: data
        });
    },
    getObat: async (req, res) => {
    let nama_obat  = '%'+req.body.nama_obat+'%';
    let limit  = req.body.limit;
        const data = await getDataObat(nama_obat, limit);
        console.log(data);
         res.status(200).json({
            status: false,
            message: 'Daftar Obat',
            record : data.length,
            data: data
        });
    },
}