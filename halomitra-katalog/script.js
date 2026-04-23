// 1. Inisialisasi Keranjang (Array kosong) dan Total Harga
let keranjang = [];
let totalHarga = 0;

// 2. Menangkap Elemen dari HTML
const semuaTombolTambah = document.querySelectorAll('.btn-tambah');
const teksTotalItem = document.getElementById('total-item');
const teksTotalHarga = document.getElementById('total-harga');
const tombolPesanWA = document.getElementById('btn-pesan-wa');

// 3. Fungsi Bantuan: Mengubah angka jadi format Rupiah yang rapi (Rp 10.000)
const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { 
        style: 'currency', 
        currency: 'IDR', 
        minimumFractionDigits: 0 
    }).format(angka);
};

// 4. Logika saat tombol "+ Tambah" diklik
semuaTombolTambah.forEach(tombol => {
    tombol.addEventListener('click', function() {
        // Mengambil data rahasia dari atribut HTML (data-nama & data-harga)
        const namaBarang = this.getAttribute('data-nama');
        const hargaBarang = parseInt(this.getAttribute('data-harga'));

        // Memasukkan barang ke dalam otak JavaScript (Array)
        keranjang.push({ nama: namaBarang, harga: hargaBarang });
        totalHarga += hargaBarang; // Menjumlahkan harga

        // Update tampilan keranjang di layar HP
        teksTotalItem.innerText = `${keranjang.length} Item`;
        teksTotalHarga.innerText = formatRupiah(totalHarga);

        // Memberikan efek visual elegan saat tombol ditekan
        const teksAsli = this.innerText;
        this.innerText = "✓ Masuk";
        this.style.backgroundColor = "#25D366"; // Berubah hijau
        this.style.color = "white";
        
        // Kembali ke warna semula setelah 1 detik
        setTimeout(() => {
            this.innerText = teksAsli;
            this.style.backgroundColor = "#e8f0fe";
            this.style.color = "#0052cc";
        }, 1000);
    });
});

// 5. Jurus Pamungkas: Stateless URL Encoding ke WhatsApp
tombolPesanWA.addEventListener('click', function() {
    // Cek jika keranjang kosong
    if (keranjang.length === 0) {
        alert("Keranjang masih kosong. Silakan pilih layanan dulu ya.");
        return;
    }

    // Nomor WA Penjual (GANTI DENGAN NOMOR WA KAMU UNTUK TES)
    // Format wajib: Gunakan 62 di depan, tanpa angka 0 dan tanpa spasi/plus
    const nomorTujuan = "6281234567890"; 
    
    // Menyusun teks laporan pesanan
    let teksPesanan = "Halo, saya mau pesan:\n\n";
    
    keranjang.forEach((item, index) => {
        teksPesanan += `${index + 1}. ${item.nama} - ${formatRupiah(item.harga)}\n`;
    });

    teksPesanan += `\n*Total Tagihan: ${formatRupiah(totalHarga)}*`;
    teksPesanan += "\n\nTolong segera diproses ya, terima kasih!";

    // Menerjemahkan teks rapi ke dalam bahasa URL (URL Encoding)
    const urlWhatsApp = `https://wa.me/${nomorTujuan}?text=${encodeURIComponent(teksPesanan)}`;
    
    // Melempar pembeli ke aplikasi WhatsApp
    window.open(urlWhatsApp, '_blank');
});