const express = require("express");
const oracledb = require("oracledb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Konfigurasi koneksi Oracle
const dbConfig = {
    user: "TUNJUNGTIRTO",
    password: "tunjungtirto7557",
    connectString: "localhost:1521/XEPDB1"
    // atau "localhost:1521/xe" kalau servicename kamu "xe"
};

// Endpoint cek data pelanggan
app.get("/api/pelanggan/:id", async (req, res) => {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `SELECT * FROM SAMBER_PETIR_2025 WHERE ID_PELANGGAN = :id`,
            [req.params.id],
            { outFormat: oracledb.OUT_FORMAT_OBJECT }
        );

        if (result.rows.length > 0) {
            res.json(result.rows[0]); // kirim semua data kolom
        } else {
            res.status(404).json({ error: "ID Pelanggan tidak ditemukan." });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Terjadi kesalahan server." });
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

// Jalankan server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
