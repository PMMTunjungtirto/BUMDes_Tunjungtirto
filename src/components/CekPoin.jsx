import React, { useState } from "react";

function CekPoin() {
    const [id, setId] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setData(null);

        try {
            const res = await fetch(`http://localhost:5000/api/pelanggan/${id}`);
            if (!res.ok) {
                throw new Error("ID tidak ditemukan");
            }
            const result = await res.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Cek Poin Samber Petir</h2>

            {/* Form Input */}
            <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Masukkan ID Pelanggan..."
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="border p-2 flex-1 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                    Cek Poin
                </button>
            </form>

            {/* Error */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Hasil Query */}
            {data && (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 text-sm">
                        <thead className="bg-gray-100">
                        <tr>
                            {Object.keys(data).map((col) => (
                                <th key={col} className="border px-3 py-1 text-left">
                                    {col}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {Object.values(data).map((val, i) => (
                                <td key={i} className="border px-3 py-1">
                                    {val !== null ? val.toString() : "-"}
                                </td>
                            ))}
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default CekPoin;
