document.addEventListener('DOMContentLoaded', function() {
    // Nomor WhatsApp Arsitek / CEO
    const WHATSAPP_NUMBER = "6282312559796";
    
    // --- 1. LOGIKA MODAL KONSULTASI TRANSOARAN ---
    const modal = document.getElementById('order-modal');
    const modalText = document.getElementById('modal-text');
    const btnClose = document.getElementById('btn-modal-close');
    const btnConfirm = document.getElementById('btn-modal-confirm');
    let targetPaket = "";

    // Membuka modal saat tombol paket ditekan
    document.querySelectorAll('.btn-trigger-modal').forEach(function(button) {
        button.addEventListener('click', function() {
            targetPaket = button.getAttribute('data-paket');
            modalText.innerText = "Apakah Anda ingin melanjutkan koordinasi pendaftaran " + targetPaket + " untuk warung/kios Anda bersama Founder HaloMitra?";
            modal.classList.add('active');
        });
    });

    // Menutup modal
    btnClose.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // Konfirmasi dan lanjut ke WhatsApp
    btnConfirm.addEventListener('click', function() {
        const message = "Halo Founder HaloMitra,\n\nSaya ingin berkonsultasi mengenai pengaktifan *" + targetPaket + "* dengan skema jujur tanpa komisi untuk usaha saya. Mohon arahan jadwal tatap mukanya.";
        window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message), '_blank');
        modal.classList.remove('active');
    });

    // --- 2. LOGIKA KERANJANG DEMO (LIVE CALCULATOR) ---
    let cart = [];
    const countEl = document.getElementById('demo-count');
    const priceEl = document.getElementById('demo-price');

    document.querySelectorAll('.btn-tambah-demo').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const nama = btn.getAttribute('data-nama');
            const harga = parseInt(btn.getAttribute('data-harga'));
            
            // Masukkan item ke array keranjang
            cart.push({ nama: nama, harga: harga });
            
            // Efek visual tombol sukses ditekan
            const oldText = btn.innerText;
            btn.innerText = "✓ Masuk";
            btn.style.background = "#dcfce7";
            btn.style.color = "#16a34a";
            
            setTimeout(function() {
                btn.innerText = oldText;
                btn.style.background = "#eff6ff";
                btn.style.color = "var(--accent)";
            }, 600);

            // Hitung ulang total
            let totalHarga = 0;
            for (let i = 0; i < cart.length; i++) {
                totalHarga += cart[i].harga;
            }

            // Update teks di keranjang
            countEl.innerText = cart.length + " Menu";
            priceEl.innerText = "Rp " + totalHarga.toLocaleString('id-ID');
        });
    });

    // --- 3. LOGIKA KIRIM PESANAN DEMO KE WHATSAPP ---
    document.getElementById('btn-demo-wa').addEventListener('click', function() {
        if(cart.length === 0) {
            alert("Silakan klik '+ Tambah' pada menu terlebih dahulu untuk mencoba simulasi.");
            return;
        }
        
        let textOrder = "Halo Kios (Simulasi Demo Web),\nBerikut rincian pesanan saya:\n\n";
        let total = 0;
        
        for (let i = 0; i < cart.length; i++) {
            textOrder += "- " + cart[i].nama + " (Rp " + cart[i].harga.toLocaleString('id-ID') + ")\n";
            total += cart[i].harga;
        }
        
        textOrder += "\n*Total Tagihan: Rp " + total.toLocaleString('id-ID') + "*";
        textOrder += "\n\n_Catatan: Ini adalah simulasi pengiriman pesanan dari demo HaloMitra._";

        // Buka tab WhatsApp baru
        window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(textOrder), '_blank');
        
        // Reset keranjang setelah menekan kirim
        cart = [];
        countEl.innerText = "0 Menu";
        priceEl.innerText = "Rp 0";
    });
});