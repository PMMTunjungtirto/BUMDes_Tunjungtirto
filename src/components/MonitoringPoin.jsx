import React, { useState } from 'react';
import { User, Trophy, AlertCircle, Loader2 } from 'lucide-react';

// Komponen ini adalah aplikasi mandiri untuk memeriksa poin pengguna.
// Tampilannya didesain mirip dengan komponen Chatbot yang Anda sediakan.
// CATATAN: Kode ini menggunakan fungsi tiruan untuk mensimulasikan
// pengambilan data dari database. Agar berfungsi, Anda perlu mengganti
// fungsi 'checkUserPoints' dengan panggilan API yang sebenarnya ke
// server backend Anda, yang akan terhubung ke database Oracle.

export default function App() {
    const [userId, setUserId] = useState('');
    const [points, setPoints] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Fungsi untuk mensimulasikan panggilan API ke server backend.
    // Dalam aplikasi nyata, ini adalah panggilan fetch() ke API Anda sendiri.
    const checkUserPoints = (id) => {
        // Simulasikan penundaan jaringan
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Contoh data tiruan. Di skenario nyata, ini akan
                // diganti dengan panggilan fetch ke API backend Anda.
                // API backend kemudian akan mengkueri database Oracle.
                const mockDatabase = {
                    '12345': 2500,
                    '67890': 150,
                    '98765': 750,
                };

                if (id in mockDatabase) {
                    resolve(mockDatabase[id]);
                } else {
                    reject('ID Pengguna tidak ditemukan.');
                }
            }, 1000); // Penundaan 1 detik untuk mensimulasikan loading
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId.trim()) {
            setError('Silakan masukkan ID pengguna.');
            setPoints(null);
            return;
        }

        setIsLoading(true);
        setError('');
        setPoints(null);

        try {
            const userPoints = await checkUserPoints(userId.trim());
            setPoints(userPoints);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFFDF6] flex items-center justify-center p-4 font-sans">
            <div
                className="max-w-7xl w-full bg-gradient-to-b from-white/10 to-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl"
            >
                {/* Bagian Header */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-indigo-500/20">
                            <Trophy className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                            Cek Poin Samber Petir
                        </h3>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Formulir Input Pengguna */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-black">
                                ID Pengguna <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    placeholder="Masukkan ID pengguna..."
                                    className="w-full p-4 pl-12 rounded-xl bg-black/5 border border-black/10 text-black placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="relative w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-medium text-white overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-12 group-hover:translate-y-0 transition-transform duration-300" />
                            <div className="relative flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Mengecek...</span>
                                    </>
                                ) : (
                                    <span>Cek Poin</span>
                                )}
                            </div>
                        </button>
                    </form>

                    {/* Area Tampilan Hasil */}
                    <div className="mt-6 min-h-[100px] flex items-center justify-center">
                        {error && (
                            <div className="flex items-center gap-2 p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl w-full">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        {points !== null && (
                            <div className="p-6 rounded-xl bg-indigo-500/10 border border-indigo-500/20 w-full text-center">
                                <Trophy className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                                <p className="text-black/60 text-lg font-medium">Poin Anda:</p>
                                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 mt-2">
                                    {points.toLocaleString()}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
