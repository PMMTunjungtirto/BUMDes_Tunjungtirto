import React, { useEffect, memo, useMemo } from "react";
import { FileText, Code, ArrowUpRight, Sparkles, Eye, Target } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import PHOTO from "/public/Photo.png";

// Memoized Components
const Header = memo(() => (
    <div className="py-5 text-center lg:mb-8 mb-2 px-[5%]">
      <div className="inline-block relative group">
        <h2
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
            data-aos="zoom-in-up"
            data-aos-duration="600"
        >
          About Me
        </h2>
      </div>
      <p
          className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
          data-aos="zoom-in-up"
          data-aos-duration="800"
      >
        <Sparkles className="w-5 h-5 text-purple-400" />
        Transforming ideas into digital experiences
        <Sparkles className="w-5 h-5 text-purple-400" />
      </p>
    </div>
));

const ProfileImage = memo(() => (
    <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
      <div
          className="relative group"
          data-aos="fade-up"
          data-aos-duration="1000"
      >
        {/* Optimized gradient backgrounds with reduced complexity for mobile */}
        <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
          <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
        </div>

        <div className="relative">
          <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
            <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />

            {/* Optimized overlay effects - disabled on mobile */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />

            <img
                src={PHOTO}
                alt="Profile"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                loading="lazy"
            />

            {/* Advanced hover effects - desktop only */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
              <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
            </div>
          </div>
        </div>
      </div>
    </div>
));

const StatCard = memo(({ icon: Icon, color, value, label, description, animation }) => (
    <div data-aos={animation} data-aos-duration={1300} className="relative group">
      <div className="relative z-10 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-black/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
        <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>

        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-black/10 transition-transform group-hover:rotate-6">
            <Icon className="w-8 h-8 text-black" />
          </div>
          <span
              className="text-4xl font-bold text-black"
              data-aos="fade-up-left"
              data-aos-duration="1500"
              data-aos-anchor-placement="top-bottom"
          >
            {value}
          </span>
        </div>

        <div>
          <p
              className="text-sm uppercase tracking-wider text-black mb-2"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-anchor-placement="top-bottom"
          >
            {label}
          </p>
          <div className="flex items-center justify-between">
            <p
                className="text-xs text-black/55"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-anchor-placement="top-bottom"
            >
              {description}
            </p>
            <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
));

const VisionMission = memo(() => (
    <div className="mt-12 lg:mt-16" data-aos="fade-up" data-aos-duration="1000">
      <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7] mb-6 text-center lg:text-left relative">
        VISI DAN MISI DESA TUNJUNGTIRTO
        <span className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full"></span>
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visi */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-black/10 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 rounded-full blur-md opacity-50 animate-pulse-slow"></div>
          <div className="relative z-10">
            <h4 className="text-lg sm:text-xl font-semibold text-black mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#6366f1]" /> Visi Desa Tunjungtirto
            </h4>
            <p className="text-black/70 text-sm sm:text-base leading-relaxed text-justify transition-all duration-300 group-hover:text-black/90 group-hover:bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10 group-hover:shadow-lg group-hover:scale-105">
              Masyarakat Desa Tunjungtirto yang <strong>Berdaya</strong>, <strong>Sejahtera</strong>, <strong>Agamis</strong>, dan <strong>Mandiri</strong>, dengan memanfaatkan potensi lokal untuk meningkatkan kualitas sumber daya manusia, mengurangi kemiskinan, memperbaiki infrastruktur, memajukan ekonomi, serta menjaga toleransi antar umat beragama untuk kehidupan sosial yang rukun dan harmonis.
            </p>
          </div>
        </div>
        {/* Misi */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-black/10 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
          <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-gradient-to-br from-[#a855f7]/20 to-[#6366f1]/20 rounded-full blur-md opacity-50 animate-pulse-slow"></div>
          <div className="relative z-10">
            <h4 className="text-lg sm:text-xl font-semibold text-black mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#a855f7]" /> Misi Desa Tunjungtirto
            </h4>
            <ul className="text-black/70 text-sm sm:text-base list-disc list-inside space-y-4">
              <li className="text-justify transition-all duration-300 group-hover:text-black/90 group-hover:bg-gradient-to-br from-[#a855f7]/10 to-[#6366f1]/10 group-hover:shadow-lg group-hover:scale-105">
                <strong>Tunjungtirto Berahlaq</strong>: Membangun kehidupan beragama yang toleran, didukung sarana keagamaan untuk masyarakat yang beriman dan bertaqwa.
              </li>
              <li className="text-justify transition-all duration-300 group-hover:text-black/90 group-hover:bg-gradient-to-br from-[#a855f7]/10 to-[#6366f1]/10 group-hover:shadow-lg group-hover:scale-105">
                <strong>Tunjungtirto Awet</strong>: Mengembangkan infrastruktur jalan, drainase, dan TPT yang terarah, berkualitas, dan bermanfaat bagi masyarakat.
              </li>
              <li className="text-justify transition-all duration-300 group-hover:text-black/90 group-hover:bg-gradient-to-br from-[#a855f7]/10 to-[#6366f1]/10 group-hover:shadow-lg group-hover:scale-105">
                <strong>Tunjungtirto Rame</strong>: Mewujudkan desa wisata melalui Taman Tirto, Taman Dolan, dan kampung tematik untuk meningkatkan PAD.
              </li>
              <li className="text-justify transition-all duration-300 group-hover:text-black/90 group-hover:bg-gradient-to-br from-[#a855f7]/10 to-[#6366f1]/10 group-hover:shadow-lg group-hover:scale-105">
                <strong>Tunjungtirto Berseri</strong>: Menciptakan lingkungan bersih dan indah melalui pengelolaan sampah 3R (Reduce, Reuse, Recycle) berbasis masyarakat.
              </li>
              <li className="text-justify transition-all duration-300 group-hover:text-black/90 group-hover:bg-gradient-to-br from-[#a855f7]/10 to-[#6366f1]/10 group-hover:shadow-lg group-hover:scale-105">
                <strong>Tunjungtirto Sehat</strong>: Menyediakan layanan kesehatan dasar melalui Klinik Tirto Husada dan ambulance gratis.
              </li>
              <li className="text-justify transition-all duration-300 group-hover:text-black/90 group-hover:bg-gradient-to-br from-[#a855f7]/10 to-[#6366f1]/10 group-hover:shadow-lg group-hover:scale-105">
                <strong>Tunjungtirto Cerdas</strong>: Memberikan pendidikan gratis melalui program kelompok belajar (Paket A, B, C) untuk mencegah putus sekolah.
              </li>
              <li className="text-justify transition-all duration-300 group-hover:text-black/90 group-hover:bg-gradient-to-br from-[#a855f7]/10 to-[#6366f1]/10 group-hover:shadow-lg group-hover:scale-105">
                <strong>Tunjungtirto Makmur</strong>: Mendukung wirausaha melalui pinjaman modal lunak dari BUMDes Maju Bersama.
              </li>
              <li className="text-justify transition-all duration-300 group-hover:text-black/90 group-hover:bg-gradient-to-br from-[#a855f7]/10 to-[#6366f1]/10 group-hover:shadow-lg group-hover:scale-105">
                <strong>Tunjungtirto Merona</strong>: Menyediakan sertifikasi tanah murah melalui proses penyuluhan, pengukuran, dan penerbitan sertifikat.
              </li>
              <li className="text-justify transition-all duration-300 group-hover:text-black/90 group-hover:bg-gradient-to-br from-[#a855f7]/10 to-[#6366f1]/10 group-hover:shadow-lg group-hover:scale-105">
                <strong>Tunjungtirto Perduli</strong>: Membantu anak yatim, kaum dhuafa, dan penyandang disabilitas melalui Yayasan Tunjungtirto Amanah Maslahah.
              </li>
              <li className="text-justify transition-all duration-300 group-hover:text-black/90 group-hover:bg-gradient-to-br from-[#a855f7]/10 to-[#6366f1]/10 group-hover:shadow-lg group-hover:scale-105">
                <strong>Tunjungtirto Canggih</strong>: Memodernisasi pelayanan surat-menyurat berbasis aplikasi untuk efisiensi.
              </li>
              <li className="text-justify transition-all duration-300 group-hover:text-black/90 group-hover:bg-gradient-to-br from-[#a855f7]/10 to-[#6366f1]/10 group-hover:shadow-lg group-hover:scale-105">
                <strong>Tunjungtirto Aman</strong>: Meningkatkan keamanan lingkungan melalui sosialisasi dan pembangunan pos jaga berbasis masyarakat.
              </li>
              <li className="text-justify transition-all duration-300 group-hover:text-black/90 group-hover:bg-gradient-to-br from-[#a855f7]/10 to-[#6366f1]/10 group-hover:shadow-lg group-hover:scale-105">
                <strong>Tunjungtirto Mewah</strong>: Membangun kantor terpadu LKD dan gedung serbaguna untuk kegiatan kemasyarakatan.
              </li>
              <li className="text-justify transition-all duration-300 group-hover:text-black/90 group-hover:bg-gradient-to-br from-[#a855f7]/10 to-[#6366f1]/10 group-hover:shadow-lg group-hover:scale-105">
                <strong>Tunjungtirto Mili</strong>: Menyediakan air bersih di empat dusun dan mengatur pipanisasi antar desa.
              </li>
              <li className="text-justify transition-all duration-300 group-hover:text-black/90 group-hover:bg-gradient-to-br from-[#a855f7]/10 to-[#6366f1]/10 group-hover:shadow-lg group-hover:scale-105">
                <strong>Tunjungtirto Nyeni</strong>: Memberikan wadah bagi seniman lokal melalui pembangunan gedung kesenian “Djatu”.
              </li>
              <li className="text-justify transition-all duration-300 group-hover:text-black/90 group-hover:bg-gradient-to-br from-[#a855f7]/10 to-[#6366f1]/10 group-hover:shadow-lg group-hover:scale-105">
                <strong>Tunjungtirto Adil</strong>: Memverifikasi data KPM untuk memastikan bantuan pemerintah tepat sasaran.
              </li>
              <li className="text-justify transition-all duration-300 group-hover:text-black/90 group-hover:bg-gradient-to-br from-[#a855f7]/10 to-[#6366f1]/10 group-hover:shadow-lg group-hover:scale-105">
                <strong>Tunjungtirto Makaryo</strong>: Menyediakan lapangan kerja melalui pengembangan pujasera, taman, dan kampung tematik.
              </li>
              <li className="text-justify transition-all duration-300 group-hover:text-black/90 group-hover:bg-gradient-to-br from-[#a855f7]/10 to-[#6366f1]/10 group-hover:shadow-lg group-hover:scale-105">
                <strong>Tunjungtirto Bertani</strong>: Melindungi sektor pertanian melalui Perdes Tata Ruang Desa untuk menjaga lumbung desa.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
));

const AboutPage = () => {
  // Memoized calculations
  const { totalProjects, totalPendidikan, totalCertificates, YearExperience } = useMemo(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const storedPendidikan = JSON.parse(localStorage.getItem("pendidikan") || "[]");
    const storedCertificates = JSON.parse(localStorage.getItem("certificates") || "[]");

    const startDate = new Date("2021-11-06");
    const today = new Date();
    const experience = today.getFullYear() - startDate.getFullYear() -
        (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);

    return {
      totalProjects: storedProjects.length,
      totalPendidikan: storedPendidikan.length,
      totalCertificates: storedCertificates.length,
      YearExperience: experience
    };
  }, []);

  // Optimized AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false,
      });
    };

    initAOS();

    // Debounced resize handler
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Memoized stats data (tombol UMKM, Pendidikan, Gallery, Samberpetir dihapus)
  const statsData = useMemo(() => [
    // Kosongkan data stats karena tombol dihapus
  ], [totalProjects, totalPendidikan, totalCertificates, YearExperience]);

  return (
      <div
          className="h-auto pb-[10%] bg-[#FFFDF6] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%]"
          id="About"
      >
        <Header />

        <div className="w-full mx-auto pt-8 sm:pt-12 relative">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold"
                  data-aos="fade-right"
                  data-aos-duration="1000"
              >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                BUMDes Maju Bersama
              </span>
                <span
                    className="block mt-2 text-black"
                    data-aos="fade-right"
                    data-aos-duration="1300"
                >
                Desa Tunjungtirto
              </span>
              </h2>

              <p
                  className="text-base sm:text-lg lg:text-xl text-black/55 leading-relaxed text-justify pb-4 sm:pb-0"
                  data-aos="fade-right"
                  data-aos-duration="1500"
              >
                BUMDes <strong>Maju Bersama</strong> adalah badan usaha milik Desa Tunjungtirto yang berperan sebagai motor penggerak ekonomi dan pembangunan desa.
                Melalui berbagai unit usaha seperti pengelolaan UMKM, jasa pelayanan, pengembangan desa wisata, hingga program pemberdayaan masyarakat,
                BUMDes ini hadir untuk meningkatkan kesejahteraan warga dan mendorong kemandirian ekonomi desa.
                Dengan prinsip transparansi, inovasi, dan keberlanjutan, BUMDes Maju Bersama menjadi mitra strategis bagi masyarakat, pemerintah, dan pihak swasta
                dalam mewujudkan desa yang maju, produktif, dan berdaya saing.
              </p>

              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
                <a href="nframz" className="w-full lg:w-auto">
                  <button
                      data-aos="fade-up"
                      data-aos-duration="800"
                      className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl animate-bounce-slow"
                  >
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
                  </button>
                </a>
                <a href="#Portofolio" className="w-full lg:w-auto">
                  <button
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-[#a855f7]/10 animate-bounce-slow delay-200"
                  >
                    <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Projects
                  </button>
                </a>
              </div>
            </div>

            <ProfileImage />
          </div>

          <a href="#Portofolio">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 cursor-pointer">
              {statsData.map((stat) => (
                  <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </a>

          <VisionMission />
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes spin-slower {
            to { transform: rotate(360deg); }
          }
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 1; }
          }
          .animate-bounce-slow {
            animation: bounce 3s infinite;
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s infinite;
          }
          .animate-spin-slower {
            animation: spin-slower 8s linear infinite;
          }
        `}</style>
      </div>
  );
};

export default memo(AboutPage);