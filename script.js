document.addEventListener('DOMContentLoaded', () => {
    // Nomor WhatsApp Arsitek (Pastikan nomor ini aktif besok)
    const WHATSAPP_NUMBER = "6282312559796";

    // --- 0. CUSTOM MODAL ENGINE (PENGHANCUR ALERT BROWSER) ---
    const modalOverlay = document.getElementById('halomitra-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalIcon = document.getElementById('modal-icon');
    const btnCancel = document.getElementById('modal-btn-cancel');
    const btnConfirm = document.getElementById('modal-btn-confirm');
    let confirmCallback = null;

    function showModal(title, message, icon, isAlert = false, onConfirm = null) {
        modalTitle.innerText = title;
        modalMessage.innerText = message;
        modalIcon.innerText = icon;
        
        if (isAlert) {
            btnCancel.style.display = 'none';
            btnConfirm.innerText = 'Mengerti';
            btnConfirm.style.width = '100%';
        } else {
            btnCancel.style.display = 'block';
            btnConfirm.innerText = 'Lanjutkan';
            btnConfirm.style.width = 'auto';
        }

        confirmCallback = onConfirm;
        modalOverlay.classList.add('active');
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        confirmCallback = null;
    }

    btnCancel.addEventListener('click', closeModal);
    btnConfirm.addEventListener('click', () => {
        if (confirmCallback) confirmCallback();
        closeModal();
    });

    // --- 1. LOGIKA TOMBOL HARGA (EKSEKUSI FOMO VIP) ---
    const btnPaket = document.querySelectorAll('.btn-wa-direct');
    btnPaket.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const paket = btn.getAttribute('data-paket');
            const originalText = btn.innerText;
            
            btn.innerText = "⏳ Sinkronisasi Server...";
            btn.style.opacity = "0.8";
            btn.disabled = true;

            // Simulasi loading 0.8 detik untuk efek psikologis "sistem sedang bekerja"
            setTimeout(() => {
                showModal(
                    "Verifikasi Antrean Server",
                    `Slot VIP untuk Paket ${paket} di wilayah Anda masih tersedia. Lanjutkan reservasi ke WhatsApp Arsitek Sistem?`,
                    "🔐",
                    false, // isAlert = false (butuh konfirmasi)
                    () => {
                        let msg = `Halo Arsitek Sistem HaloMitra,\n\nSaya tertarik mengamankan *Slot VIP Paket ${paket}* di wilayah saya.\nMohon info prosedur tahapan integrasi sistemnya.`;
                        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
                    }
                );
                btn.innerText = originalText;
                btn.style.opacity = "1";
                btn.disabled = false;
            }, 800);
        });
    });

    // --- 2. LOGIKA FAQ ACCORDION ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // --- 3. LOGIKA LIVE DEMO KERANJANG (INTERAKSI HALUS) ---
    let cart = [];
    const btnTambah = document.querySelectorAll('.btn-tambah-demo');
    const totalItemEl = document.getElementById('demo-total-item');
    const totalHargaEl = document.getElementById('demo-total-harga');
    const btnWA = document.getElementById('btn-demo-wa');

    function updateUI() {
        const totalHarga = cart.reduce((sum, item) => sum + item.harga, 0);
        totalItemEl.innerText = `${cart.length} Item`;
        totalHargaEl.innerText = `Rp ${totalHarga.toLocaleString('id-ID')}`;
        
        // Animasi denyut halus pada angka
        totalHargaEl.style.transform = "scale(1.15)";
        totalHargaEl.style.color = "#4338ca";
        setTimeout(() => {
            totalHargaEl.style.transform = "scale(1)";
            totalHargaEl.style.color = "#0f172a";
        }, 200);
    }

    btnTambah.forEach(button => {
        button.addEventListener('click', () => {
            const item = {
                nama: button.getAttribute('data-nama'),
                harga: parseInt(button.getAttribute('data-harga'))
            };
            cart.push(item);
            
            button.innerText = "✓ Masuk Keranjang";
            button.style.background = "#22c55e"; // Hijau Premium
            button.style.color = "white";
            
            setTimeout(() => {
                button.innerText = "+ Tambah";
                button.style.background = "#e0e7ff";
                button.style.color = "#4338ca";
            }, 800);

            updateUI();
        });
    });

    btnWA.addEventListener('click', () => {
        if (cart.length === 0) {
            showModal(
                "Keranjang Kosong",
                "Anda belum memilih menu. Silakan uji coba tombol '+ Tambah' di katalog terlebih dahulu.",
                "🛒",
                true // isAlert = true (hanya tombol Mengerti)
            );
            return;
        }
        
        let pesan = "Halo Kios Cisitu (Demo), saya pesanan otomatis dari web:\n\n";
        cart.forEach(item => {
            pesan += `- ${item.nama} (Rp ${item.harga.toLocaleString('id-ID')})\n`;
        });
        
        const total = cart.reduce((sum, item) => sum + item.harga, 0);
        pesan += `\n*Total Tagihan: Rp ${total.toLocaleString('id-ID')}*`;
        pesan += `\n\n*Catatan: Ini adalah pesanan uji coba dari Live Demo HaloMitra.*`;
        
        const urlAman = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(pesan)}`;
        window.open(urlAman, '_blank');
        
        // Kosongkan keranjang setelah demo berhasil
        cart = [];
        updateUI();
    });

    // --- 4. MOBILE MENU TOGGLE ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(255, 255, 255, 0.95)';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
            } else {
                navLinks.style.display = 'none';
            }
        });
    }
});
