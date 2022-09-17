const { con } = require('./index.js');
let getDataObat = async function (nama_brng,limit) {
    var sql = `SELECT
	databarang.kode_brng, 
	databarang.nama_brng, 
	databarang.kode_satbesar, 
	satuanbesar.satuan AS satuanbesar, 
	databarang.isi, 
	databarang.kode_sat, 
	kodesatuan.satuan, 
	databarang.letak_barang, 
	databarang.dasar, 
	databarang.h_beli, 
	databarang.ralan, 
	databarang.kelas1, 
	databarang.kelas2, 
	databarang.kelas3, 
	databarang.utama, 
	databarang.vip, 
	databarang.vvip, 
	databarang.beliluar, 
	databarang.jualbebas, 
	databarang.karyawan, 
	databarang.stokminimal, 
	databarang.kdjns, 
	jenis.nama as jenis, 
	kapasitas, 
	databarang.expire, 
	databarang.kode_industri, 
	industrifarmasi.nama_industri, 
	databarang.kode_kategori, 
	kategori_barang.nama AS kategori, 
	databarang.kode_golongan, 
	golongan_barang.nama AS golongan
FROM
	databarang
	INNER JOIN
	kodesatuan
	ON 
		databarang.kode_sat = kodesatuan.kode_sat
	INNER JOIN
	kodesatuan AS satuanbesar
	ON 
		databarang.kode_satbesar = satuanbesar.kode_sat
	INNER JOIN
	jenis
	ON 
		databarang.kdjns = jenis.kdjns
	INNER JOIN
	industrifarmasi
	ON 
		databarang.kode_industri = industrifarmasi.kode_industri
	INNER JOIN
	golongan_barang
	ON 
		databarang.kode_golongan = golongan_barang.kode
	INNER JOIN
	kategori_barang
	ON 
		databarang.kode_kategori = kategori_barang.kode
WHERE
	databarang.nama_brng LIKE ? 
ORDER BY
	databarang.nama_brng ASC
    LIMIT ?`;
    return new Promise((resolve, reject) => {
        con.query(sql, [nama_brng, parseInt(limit)], (error, results) => {
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
    getDataObat,
}
