import React, { useState } from "react";
import { Search, Loader2, AlertCircle, User } from "lucide-react";

const UserChecker = () => {
    const [userId, setUserId] = useState("");
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const checkUserData = async (id) => {
        const response = await fetch(`http://localhost:5000/api/pelanggan/${id}`);
        const data = await response.json();

        if (!response.ok) {
            throw data.error || "Gagal mengambil data.";
        }
        return data;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId.trim()) {
            setError("Silakan masukkan ID pelanggan.");
            setUserData(null);
            return;
        }

        setIsLoading(true);
        setError("");
        setUserData(null);

        try {
            const data = await checkUserData(userId.trim());
            setUserData(data);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-100 to-blue-50 p-6">
            <div className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-8 border border-indigo-100">
                {/* Judul */}
                <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
                    🔍 Cek Data Pelanggan
                </h2>

                {/* Form Input */}
                <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-6">
                    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 flex-grow bg-gray-50">
                        <User className="w-5 h-5 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Masukkan ID Pelanggan"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="outline-none flex-grow bg-transparent text-gray-700"
                        />
                    </div>
                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                        {isLoading ? "Mencari..." : "Cari"}
                    </button>
                </form>

                {/* Error Message */}
                {error && (
                    <div className="flex items-center gap-2 p-3 mb-6 text-red-700 bg-red-100 border border-red-300 rounded-lg">
                        <AlertCircle className="w-5 h-5" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Hasil Data */}
                {userData && (
                    <div className="p-6 rounded-xl bg-indigo-50 border border-indigo-200 w-full overflow-x-auto">
                        <h4 className="text-lg font-bold mb-3">📋 Detail Data Pelanggan</h4>
                        <table className="w-full text-sm border-collapse">
                            <tbody>
                            {Object.entries(userData).map(([key, value]) => (
                                <tr key={key} className="border-b border-gray-200">
                                    <td className="py-2 px-3 font-medium text-gray-700">{key}</td>
                                    <td className="py-2 px-3">{value !== null ? value.toString() : "-"}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserChecker;
