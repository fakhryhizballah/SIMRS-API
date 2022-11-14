const { con } = require('./index.js');
var getRegIGD = async function (from, until) {
    var sql = `
    SELECT
	reg_periksa.no_rawat, 
	reg_periksa.tgl_registrasi, 
	dokter.nm_dokter, 
	pasien.nm_pasien, 
	reg_periksa.jam_reg, 
	reg_periksa.umurdaftar, 
	reg_periksa.sttsumur, 
	reg_periksa.status_bayar, 
	pasien.tgl_lahir, 
	pasien.agama, 
	pasien.pekerjaan
FROM
	reg_periksa
	INNER JOIN
	dokter
	ON 
		reg_periksa.kd_dokter = dokter.kd_dokter
	INNER JOIN
	pasien
	ON 
		reg_periksa.no_rkm_medis = pasien.no_rkm_medis
	INNER JOIN
	poliklinik
	ON 
		reg_periksa.kd_poli = poliklinik.kd_poli
WHERE
 poliklinik.kd_poli='IGDK' AND
	reg_periksa.tgl_registrasi BETWEEN ? AND ?
    `;
    const result = await con.query(sql, [from, until]);
    return result;
};

module.exports = {
    getRegIGD
}

