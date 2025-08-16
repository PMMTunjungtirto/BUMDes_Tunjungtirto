const express = require("express");
const oracledb = require("oracledb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Konfigurasi koneksi Oracle
const dbConfig = {
    user: "TUNJUNGTIRTO",          // schema di APEX
    password: "tunjungtirto7557",  // password login
    connectString: "localhost:1521/XEPDB1" // service name Oracle XE
};

// Endpoint: cek semua data pelanggan berdasarkan ID
app.get("/check-points/:id", async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `SELECT
                 ID_PELANGGAN,
                 PRIORITAS,
                 PEMILIK,
                 RT,
                 RW,
                 STATUS,
                 TANGGAL_MULAI,
                 JANUARI_1, FEBRUARI_1, FEBRUARI_2,
                 MARET_1, MARET_2,
                 MEI_1, JUNI_1, JUNI_2,
                 JULI_1, JULI_2,
                 AGUSTUS_1, AGUSTUS_2,
                 SEPTEMBER_1, SEPTEMBER_2,
                 OKTOBER_1, OKTOBER_2,
                 NOVEMBER_1, NOVEMBER_2,
                 DESEMBER_1, DESEMBER_2,
                 BONUS_POIN,
                 POIN_PENCAPAIAN_BULAN_INI,
                 SISA_POIN_BULAN_SEBELUMNYA,
                 JUMLAH_POIN_AKHIR,
                 HASIL_AKHIR
             FROM SAMBER_PETIR_2025
             WHERE ID_PELANGGAN = :id`,
            [req.params.id],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "ID Pengguna tidak ditemukan" });
        }

        res.json(result.rows[0]);  // kirim semua kolom
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Kesalahan server" });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

app.listen(5000, () => console.log("✅ Server berjalan di http://localhost:5000"));
