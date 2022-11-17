const { con } = require('./index.js');
var getLaporan = async function (from, until) {
    var sql = `
	SELECT
	reg_periksa.no_rawat, 
	reg_periksa.no_rkm_medis, 
	pasien.no_ktp, 
	pasien.no_peserta, 
	pasien.nm_pasien, 
	pasien.agama, 
	pasien.suku_bangsa, 
	pasien.pekerjaan, 
	pasien.pnd, 
	date_format(pasien.tgl_lahir, %d-%m-%Y) AS tgl_lahir, 
	pasien.umur, 
	pasien.alamat, 
	pasien.no_tlp, 
	kelurahan.nm_kel, 
	kecamatan.nm_kec, 
	kabupaten.nm_kab, 
	propinsi.nm_prop, 
	date_format(reg_periksa.tgl_registrasi, %d-%m-%Y), 
	reg_periksa.kd_poli, 
	dokter.nm_dokter, 
	kamar_inap.tgl_masuk, 
	kamar_inap.jam_masuk, 
	kamar_inap.tgl_keluar, 
	kamar_inap.diagnosa_akhir, 
	kamar_inap.diagnosa_awal, 
	kamar_inap.jam_keluar, 
	kamar_inap.ttl_biaya, 
	kamar_inap.stts_pulang, 
	kamar_inap.kd_kamar, 
	bangsal.nm_bangsal, 
	kamar.kelas
FROM
	reg_periksa
	INNER JOIN
	pasien
	ON 
		reg_periksa.no_rkm_medis = pasien.no_rkm_medis
	INNER JOIN
	kelurahan
	ON 
		pasien.kd_kel = kelurahan.kd_kel
	INNER JOIN
	kecamatan
	ON 
		pasien.kd_kec = kecamatan.kd_kec
	INNER JOIN
	kabupaten
	ON 
		pasien.kd_kab = kabupaten.kd_kab
	INNER JOIN
	propinsi
	ON 
		pasien.kd_prop = propinsi.kd_prop
	INNER JOIN
	dokter
	ON 
		reg_periksa.kd_dokter = dokter.kd_dokter
	INNER JOIN
	kamar_inap
	ON 
		reg_periksa.no_rawat = kamar_inap.no_rawat
	INNER JOIN
	kamar
	ON 
		kamar_inap.kd_kamar = kamar.kd_kamar
	INNER JOIN
	bangsal
	ON 
		kamar.kd_bangsal = bangsal.kd_bangsal 
	WHERE
	reg_periksa.tgl_registrasi BETWEEN ? AND ?
		`;
    const result = await con.query(sql, [from, until]);
    return result;
};

module.exports = {
    getLaporan
}