const { con } = require('./index.js');

var getPasien = async function (nik) {
    var sql = `SELECT
	reg_periksa.no_reg, 
	reg_periksa.no_rawat, 
	reg_periksa.tgl_registrasi, 
	reg_periksa.kd_dokter, 
	reg_periksa.jam_reg, 
	reg_periksa.no_rkm_medis, 
	reg_periksa.kd_poli, 
	reg_periksa.p_jawab, 
	reg_periksa.status_poli, 
	reg_periksa.status_bayar, 
	reg_periksa.umurdaftar, 
	dokter.nm_dokter, 
	poliklinik.nm_poli, 
	pasien.nm_pasien, 
	pasien.jk, 
	pasien.tgl_lahir AS tgl_lahir_pasien, 
	pasien.umur
FROM
	reg_periksa
	INNER JOIN
	dokter
	ON 
		reg_periksa.kd_dokter = dokter.kd_dokter
	INNER JOIN
	poliklinik
	ON 
		reg_periksa.kd_poli = poliklinik.kd_poli
	INNER JOIN
	pasien
	ON 
		reg_periksa.no_rkm_medis = pasien.no_rkm_medis
WHERE
	dokter.kd_dokter = ?`;
    return new Promise((resolve, reject) => {
        con.query(sql, [nik], (error, results) => {
            if (error) {
                return reject(error);
            }
            try {
                var resultArray = Object.values(JSON.parse(JSON.stringify(results)))
                // return resolve(results);
                return resolve(results);
            }
            catch (err) {
                return resolve();
            }

        });
    });
};
var getRiwayat = async function (no_rkm_medis) {
    var sql = `SELECT
	reg_periksa.no_rawat,
	reg_periksa.tgl_registrasi,
	reg_periksa.jam_reg,
	reg_periksa.status_lanjut,
	reg_periksa.kd_dokter,
	dokter.nm_dokter,
	reg_periksa.umurdaftar,
	reg_periksa.sttsumur,
	poliklinik.kd_poli,
	poliklinik.nm_poli,
	penjab.png_jawab,
	pasien.nm_pasien,
	pasien.tgl_lahir 
FROM
	reg_periksa
	INNER JOIN dokter ON reg_periksa.kd_dokter = dokter.kd_dokter
	INNER JOIN poliklinik ON reg_periksa.kd_poli = poliklinik.kd_poli
	INNER JOIN penjab ON reg_periksa.kd_pj = penjab.kd_pj
	INNER JOIN pasien ON penjab.kd_pj = pasien.kd_pj 
	AND reg_periksa.no_rkm_medis = pasien.no_rkm_medis
WHERE
 	reg_periksa.no_rkm_medis = ?	
ORDER BY
	reg_periksa.tgl_registrasi DESC`;
    return new Promise((resolve, reject) => {
        con.query(sql, [no_rkm_medis], (error, results) => {
            if (error) {
                return reject(error);
            }
            try {
                var resultArray = Object.values(JSON.parse(JSON.stringify(results)))
                // return resolve(results);
                return resolve(results);
            }
            catch (err) {
                return resolve();
            }

        });
    });
};
var getIdentitasPasien = async function (no_rkm_medis) {
    var sql = `SELECT
	pasien.no_rkm_medis, 
	pasien.nm_pasien, 
	pasien.tgl_lahir, 
	pasien.umur, 
	pasien.agama
FROM
	pasien
WHERE
	pasien.no_rkm_medis = ?`;
    return new Promise((resolve, reject) => {
        con.query(sql, [no_rkm_medis], (error, results) => {
            if (error) {
                return reject(error);
            }
            try {
                var resultArray = Object.values(JSON.parse(JSON.stringify(results)))
                // return resolve(results);
                return resolve(results);
            }
            catch (err) {
                return resolve();
            }

        });
    });
};



module.exports = {
    getPasien,
	getRiwayat,
	getIdentitasPasien
}