var jwt = require('jsonwebtoken');

module.exports = {
    regis: async (req, res) => {
        const secretKey = process.env.JWT_SECRET_KEY;
        const { from, until }

        res.status(200).json({
            status: false,
            message: 'Daftar rekam medis pasien',
            // record: data.length,
            data: req.body
        });
    },
}