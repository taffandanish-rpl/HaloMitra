/* ============================================================
   HALOMITRA CORE LOGIC - V3 ENTERPRISE
   ============================================================ */

   document.addEventListener('DOMContentLoaded', () => {
    const WHATSAPP_NUMBER = "6282312559796";

    // 1. Fungsi Hubungi Arsitek Sistem
    const hubungiArsitek = () => {
        const msg = "Halo Arsitek Sistem HaloMitra, saya ingin berkonsultasi mengenai implementasi sistem otomatisasi untuk unit bisnis saya. Mohon informasi ketersediaan slot VIP.";
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    };

    // Pasang ke semua tombol dengan class 'btn-contact-architect'
    const btnArchitect = document.querySelectorAll('.btn-wa-direct, .btn-contact-architect');
    btnArchitect.forEach(btn => btn.addEventListener('click', hubungiArsitek));

    // 2. Sistem Login Admin Pro (Mockup Psikologis)
    const btnLogin = document.querySelector('.btn-login-admin');
    if (btnLogin) {
        btnLogin.addEventListener('click', (e) => {
            e.preventDefault();
            const email = prompt("📧 Email Otorisasi:");
            const pass = prompt("🔑 Password Enkripsi:");
            
            if (email && pass) {
                alert("🛡️ PROTOKOL KEAMANAN AKTIF\nSistem mendeteksi Anda mencoba login dari luar jaringan internal. Akses ditolak hingga verifikasi identitas manual oleh CEO.");
            }
        });
    }
});