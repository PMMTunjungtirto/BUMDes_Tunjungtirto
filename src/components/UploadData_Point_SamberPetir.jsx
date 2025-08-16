import React, { useState, useEffect } from 'react';
import { FileUp, FileCheck, AlertCircle, Loader2 } from 'lucide-react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Fungsi untuk memuat skrip secara dinamis
const loadScript = (url) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
};

// === Inisialisasi Firebase di luar komponen ===
// Inisialisasi Firebase di sini, sehingga hanya berjalan sekali
const firebaseConfig = {
    apiKey: "AIzaSyCDVoatikhMZYsC8Ek4YZ54SB2w-ZW_Nmc",
    authDomain: "desa-tunjungtirto-99cc7.firebaseapp.com",
    databaseURL: "https://desa-tunjungtirto-99cc7-default-rtdb.firebaseio.com",
    projectId: "desa-tunjungtirto-99cc7",
    storageBucket: "desa-tunjungtirto-99cc7.firebasestorage.app",
    messagingSenderId: "835214097591",
    appId: "1:835214097591:web:a7f847f610f514d647a132",
    measurementId: "G-4HKYYJXS8M"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// === Komponen Utama ===
export default function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [dataPreview, setDataPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
        // Muat pustaka xlsx saat komponen dimuat
        loadScript("https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js")
            .then(() => setIsScriptLoaded(true))
            .catch(() => setStatusMessage("Gagal memuat pustaka XLSX."));
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setStatusMessage('');
            setIsSuccess(false);
            setDataPreview(null);
            readExcelFile(file);
        }
    };

    const readExcelFile = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                if (!window.XLSX) {
                    setStatusMessage('Pustaka XLSX tidak tersedia. Coba muat ulang halaman.');
                    setSelectedFile(null);
                    setDataPreview(null);
                    return;
                }
                const data = new Uint8Array(event.target.result);
                const workbook = window.XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = window.XLSX.utils.sheet_to_json(worksheet);

                if (json.length > 0) {
                    const requiredKeys = ['id', 'nama', 'alamat', 'poin', 'jenis kelamin'];
                    const firstRowKeys = Object.keys(json[0]);
                    const hasAllKeys = requiredKeys.every(key => firstRowKeys.includes(key));

                    if (hasAllKeys) {
                        setDataPreview(json.slice(0, 5));
                        setStatusMessage('File berhasil dimuat. Silakan periksa pratinjau data.');
                    } else {
                        setStatusMessage('Format file tidak valid. Pastikan ada kolom "id", "nama", "alamat", "poin", dan "jenis kelamin".');
                        setSelectedFile(null);
                        setDataPreview(null);
                    }
                } else {
                    setStatusMessage('File Excel kosong.');
                    setSelectedFile(null);
                    setDataPreview(null);
                }

            } catch (error) {
                setStatusMessage(`Gagal membaca file: ${error.message}`);
                setSelectedFile(null);
                setDataPreview(null);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    const uploadDataToFirestore = async (data) => {
        const pointsCollection = collection(db, 'samber-petir-points');
        const uploadPromises = data.map(row => {
            return addDoc(pointsCollection, row);
        });

        await Promise.all(uploadPromises);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!isScriptLoaded) {
            setStatusMessage('Pustaka XLSX belum selesai dimuat. Silakan tunggu.');
            return;
        }
        if (!selectedFile || !dataPreview) {
            setStatusMessage('Silakan pilih file Excel terlebih dahulu.');
            return;
        }

        setIsLoading(true);
        setStatusMessage('');

        try {
            await uploadDataToFirestore(dataPreview);
            setIsSuccess(true);
            setStatusMessage(`Berhasil mengunggah ${dataPreview.length} baris data ke Firestore.`);
            setSelectedFile(null);
            setDataPreview(null);
        } catch (error) {
            setIsSuccess(false);
            console.error("Error uploading to Firestore: ", error);
            setStatusMessage(`Gagal mengunggah: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFFDF6] flex items-center justify-center p-4 font-sans">
            <div
                className="max-w-4xl w-full bg-gradient-to-b from-white/10 to-white/5 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl"
            >
                {/* Header Section */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-indigo-500/20">
                            <FileUp className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                            Admin Data Uploader
                        </h3>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* File Input Form */}
                    <form onSubmit={handleUpload} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-black">
                                Pilih File Excel (.xlsx) <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept=".xlsx, .xls"
                                    onChange={handleFileChange}
                                    className="w-full text-black/60 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-indigo-500/10 file:text-indigo-600 hover:file:bg-indigo-500/20"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !selectedFile || !isScriptLoaded}
                            className="relative w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-medium text-white overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-12 group-hover:translate-y-0 transition-transform duration-300" />
                            <div className="relative flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Mengunggah...</span>
                                    </>
                                ) : (
                                    <>
                                        <FileUp className="w-4 h-4" />
                                        <span>Unggah Data</span>
                                    </>
                                )}
                            </div>
                        </button>
                    </form>

                    {/* Status and Data Preview Area */}
                    <div className="mt-6 space-y-4">
                        {statusMessage && (
                            <div className={`flex items-center gap-2 p-4 rounded-xl w-full ${isSuccess ? 'text-green-400 bg-green-500/10 border border-green-500/20' : 'text-red-400 bg-red-500/10 border border-red-500/20'}`}>
                                {isSuccess ? <FileCheck className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                                <p className="text-sm">{statusMessage}</p>
                            </div>
                        )}

                        {dataPreview && dataPreview.length > 0 && (
                            <div className="p-6 rounded-xl bg-indigo-500/10 border border-indigo-500/20 w-full">
                                <h4 className="text-lg font-bold text-indigo-400 mb-4">Pratinjau Data (5 Baris Pertama)</h4>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm text-left text-black/60">
                                        <thead>
                                        <tr className="bg-indigo-500/20 text-indigo-400">
                                            <th scope="col" className="px-4 py-2">ID</th>
                                            <th scope="col" className="px-4 py-2">NAMA</th>
                                            <th scope="col" className="px-4 py-2">ALAMAT</th>
                                            <th scope="col" className="px-4 py-2">POINT</th>
                                            <th scope="col" className="px-4 py-2">JENIS KELAMIN</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {dataPreview.map((row, index) => (
                                            <tr key={index} className="border-t border-indigo-500/10 hover:bg-indigo-500/5">
                                                <td className="px-4 py-2">{row.id}</td>
                                                <td className="px-4 py-2">{row.nama}</td>
                                                <td className="px-4 py-2">{row.alamat}</td>
                                                <td className="px-4 py-2">{row.poin}</td>
                                                <td className="px-4 py-2">{row['jenis kelamin']}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
