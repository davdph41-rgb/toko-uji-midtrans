let totalHarga = 0;
let dataPesanan = {};

// Ambil elemen
const tombolTambah = document.querySelectorAll('.tambah');
const tampilanTotal = document.getElementById('total');
const tombolBayar = document.getElementById('bayar');
const areaBayar = document.getElementById('areaBayar');
const totalBayar = document.getElementById('totalBayar');
const tombolSukses = document.getElementById('sukses');
const tombolKembali = document.getElementById('kembali');
const pesanSukses = document.getElementById('pesanSukses');
const inputNama = document.getElementById('nama');

// Fungsi tambah barang
tombolTambah.forEach(tombol => {
  tombol.addEventListener('click', function() {
    const harga = Number(this.dataset.harga);
    totalHarga = totalHarga + harga;
    tampilanTotal.textContent = `Rp ${totalHarga.toLocaleString('id-ID')}`;
  });
});

// Buka halaman bayar
tombolBayar.addEventListener('click', function() {
  const nama = inputNama.value.trim();
  if (!nama) {
    alert('Silakan isi nama terlebih dahulu!');
    return;
  }
  if (totalHarga === 0) {
    alert('Silakan pilih barang terlebih dahulu!');
    return;
  }

  dataPesanan = {
    nama: nama,
    total: totalHarga,
    waktu: new Date().toLocaleString('id-ID')
  };

  totalBayar.textContent = `Rp ${totalHarga.toLocaleString('id-ID')}`;
  areaBayar.classList.remove('sembunyi');
});

// Simulasi bayar berhasil
tombolSukses.addEventListener('click', function() {
  const daftarPesanan = JSON.parse(localStorage.getItem('pesananKasir')) || [];
  daftarPesanan.push(dataPesanan);
  localStorage.setItem('pesananKasir', JSON.stringify(daftarPesanan));

  areaBayar.classList.add('sembunyi');
  pesanSukses.classList.remove('sembunyi');
});

// Tombol kembali
tombolKembali.addEventListener('click', function() {
  areaBayar.classList.add('sembunyi');
});
