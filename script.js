document.addEventListener('DOMContentLoaded', () => {
    const WHATSAPP_NUMBER = "6282312559796";

    // 1. LOGIKA TOMBOL HARGA (FOMO)
    const btnPaket = document.querySelectorAll('.btn-wa-direct');
    btnPaket.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const paket = btn.getAttribute('data-paket');
            const originalText = btn.innerText;
            
            btn.innerText = "⏳ Mengecek Server...";
            btn.style.opacity = "0.8";
            btn.disabled = true;

            setTimeout(() => {
                const confirmMsg = confirm(`[SISTEM HALOMITRA]\n\nSlot VIP untuk Paket ${paket} di wilayah Anda masih tersedia.\n\nApakah Anda ingin melanjutkan reservasi ke WhatsApp Arsitek Sistem?`);
                if (confirmMsg) {
                    let msg = `Halo Arsitek Sistem HaloMitra,\n\nSaya tertarik mengamankan *Slot VIP Paket ${paket}* di wilayah saya.\nMohon info prosedur DP 35% dan tahapan integrasi sistemnya.`;
                    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
                }
                btn.innerText = originalText;
                btn.style.opacity = "1";
                btn.disabled = false;
            }, 1200);
        });
    });

    // 2. LOGIKA FAQ ACCORDION
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

    // 3. LOGIKA LIVE DEMO KERANJANG
    let cart = [];
    const btnTambah = document.querySelectorAll('.btn-tambah-demo');
    const totalItemEl = document.getElementById('demo-total-item');
    const totalHargaEl = document.getElementById('demo-total-harga');
    const btnWA = document.getElementById('btn-demo-wa');

    function updateUI() {
        const totalHarga = cart.reduce((sum, item) => sum + item.harga, 0);
        totalItemEl.innerText = `${cart.length} Item`;
        totalHargaEl.innerText = `Rp ${totalHarga.toLocaleString('id-ID')}`;
        
        // Animasi pop saat item bertambah
        totalHargaEl.style.transform = "scale(1.2)";
        setTimeout(() => totalHargaEl.style.transform = "scale(1)", 200);
    }

    btnTambah.forEach(button => {
        button.addEventListener('click', () => {
            const item = {
                nama: button.getAttribute('data-nama'),
                harga: parseInt(button.getAttribute('data-harga'))
            };
            cart.push(item);
            
            // Ubah teks tombol sejenak
            button.innerText = "✓ Ditambah";
            button.style.background = "#25d366";
            button.style.color = "white";
            setTimeout(() => {
                button.innerText = "+ Tambah";
                button.style.background = "#e0e7ff";
                button.style.color = "#4338ca";
            }, 1000);

            updateUI();
        });
    });

    btnWA.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Keranjang masih kosong! Silakan tambah menu dulu.');
            return;
        }
        
        let pesan = "Halo Kios Cisitu, saya ingin pesan:\n\n";
        cart.forEach(item => {
            pesan += `- ${item.nama} (Rp ${item.harga.toLocaleString('id-ID')})\n`;
        });
        
        const total = cart.reduce((sum, item) => sum + item.harga, 0);
        pesan += `\n*Total Tagihan: Rp ${total.toLocaleString('id-ID')}*`;
        pesan += `\n\n*Catatan: Ini adalah pesanan uji coba dari Live Demo HaloMitra.*`;
        
        const urlAman = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(pesan)}`;
        window.open(urlAman, '_blank');
        
        // Kosongkan keranjang setelah demo
        cart = [];
        updateUI();
    });
});