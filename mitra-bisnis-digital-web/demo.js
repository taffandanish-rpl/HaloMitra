let cart = [];
const btnTambah = document.querySelectorAll('.btn-tambah-demo');
const totalItemEl = document.getElementById('demo-total-item');
const totalHargaEl = document.getElementById('demo-total-harga');
const btnWA = document.getElementById('btn-demo-wa');

btnTambah.forEach(button => {
    button.addEventListener('click', () => {
        const item = {
            nama: button.getAttribute('data-nama'),
            harga: parseInt(button.getAttribute('data-harga'))
        };
        cart.push(item);
        updateUI();
    });
});

function updateUI() {
    const totalHarga = cart.reduce((sum, item) => sum + item.harga, 0);
    totalItemEl.innerText = `${cart.length} Item`;
    totalHargaEl.innerText = `Rp ${totalHarga.toLocaleString('id-ID')}`;
}

btnWA.addEventListener('click', () => {
    if (cart.length === 0) return alert('Keranjang masih kosong!');
    
    // Gunakan \n biasa untuk baris baru
    let pesan = "Halo, saya ingin pesan:\n";
    cart.forEach(item => {
        pesan += `- ${item.nama} (Rp ${item.harga.toLocaleString('id-ID')})\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + item.harga, 0);
    pesan += `\n*Total: Rp ${total.toLocaleString('id-ID')}*`;
    
    // encodeURIComponent akan otomatis mengubah \n dan spasi menjadi format URL yang aman
    const urlAman = `https://wa.me/6282312559796?text=${encodeURIComponent(pesan)}`;
    window.open(urlAman, '_blank');
});