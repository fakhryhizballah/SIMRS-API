var jwt = require('jsonwebtoken');
const { getRegIGD } = require('../model/igd');
module.exports = {
    regis: async (req, res) => {
        const secretKey = process.env.JWT_SECRET_KEY;
        try {
            const { from, until } = req.body;
        let data = await getRegIGD(from, until);
       return res.status(200).json({
            error: false,
            message: 'Daftar rekam medis pasien',
            // record: data.length,
            data: data
        });
        } catch (error) {
            return res.status(404).json({
                error: true,
                message: 'Masukan tanggal awal dan akhir',
                // record: data.length,
                data: "from, until",
            });
        }
    },
}