const { con } = require('./index.js');
var getLaporan = async function (from, until) {
    var sql = `
	SELECT
	reg_periksa.no_rawat AS no_rawat, 
	date_format(tgl_registrasi, %d-%m-%Y) AS tgl_registrasi, 
	reg_periksa.jam_reg AS jam_reg, 
	reg_periksa.no_rkm_medis AS no_rkm_medis, 
	pasien.no_ktp AS no_ktp, 
	pasien.no_peserta AS no_peserta, 
	pasien.nm_pasien AS nm_pasien, 
	pasien.jk AS jk, 
	pasien.agama AS agama, 
	pasien.suku_bangsa AS suku_bangsa, 
	pasien.pekerjaan AS pekerjaan, 
	pasien.pnd AS pnd, 
	date_format(pasien.tgl_lahir, %d-%m-%Y) AS tgl_lahir, 
	pasien.umur AS umur, 
	pasien.alamat AS alamat, 
	kelurahan.nm_kel AS nm_kel, 
	kecamatan.nm_kec AS nm_kec, 
	kabupaten.nm_kab AS nm_kab, 
	propinsi.nm_prop AS nm_prop, 
	pasien.no_tlp AS no_tlp, 
	poliklinik.nm_poli AS nm_poli, 
	dokter.nm_dokter AS nm_dokter, 
	penjab.png_jawab AS png_jawab, 
	penyakit.nm_penyakit AS nm_penyakit, 
	diagnosa_pasien.kd_penyakit AS kd_penyakit
FROM
	(
		(
			(
				(
					(
						(
							(
								(
									(
										(
											reg_periksa
											join
											pasien
											ON 
												(
													reg_periksa.no_rkm_medis = pasien.no_rkm_medis
												)
										)
										join
										penjab
										ON 
											(
												reg_periksa.kd_pj = penjab.kd_pj
											)
									)
									join
									dokter
									ON 
										(
											reg_periksa.kd_dokter = dokter.kd_dokter
										)
								)
								join
								diagnosa_pasien
								ON 
									(
										reg_periksa.no_rawat = diagnosa_pasien.no_rawat
									)
							)
							join
							penyakit
							ON 
								(
									diagnosa_pasien.kd_penyakit = penyakit.kd_penyakit
								)
						)
						join
						poliklinik
						ON 
							(
								reg_periksa.kd_poli = poliklinik.kd_poli
							)
					)
					join
					kelurahan
					ON 
						(
							pasien.kd_kel = kelurahan.kd_kel
						)
				)
				join
				kecamatan
				ON 
					(
						pasien.kd_kec = kecamatan.kd_kec
					)
			)
			join
			propinsi
			ON 
				(
					pasien.kd_prop = propinsi.kd_prop
				)
		)
		join
		kabupaten
		ON 
			(
				pasien.kd_kab = kabupaten.kd_kab
			)
	)
WHERE
	reg_periksa.tgl_registrasi BETWEEN ? AND ? AND
	reg_periksa.status_lanjut = 'Ralan'
	`;
    const result = await con.query(sql, [from, until]);
    return result;
};

module.exports = {
    getLaporan
}