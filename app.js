const CLIENT_KEY = "Mid‑client‑It0EFIBOdQG2v3hv";
const totalBayar = 10000;

// Muat library Midtrans
const scriptSnap = document.createElement("script");
scriptSnap.src = "https://app.sandbox.midtrans.com/snap/snap.js";
scriptSnap.dataset.clientKey = CLIENT_KEY;
document.body.appendChild(scriptSnap);

document.getElementById("tombolBayar").addEventListener("click", async () => {
  const nama = document.getElementById("nama").value.trim();
  if (!nama) {
    alert("Isi nama terlebih dahulu");
    return;
  }

  const dataKirim = {
    nama: nama,
    total: totalBayar
  };

  try {
    // Alamat API harus persis /api/bayar-server
    const res = await fetch("/api/bayar-server", {
      method: "POST",
      headers: {"Content‑Type":"application/json"},
      body: JSON.stringify(dataKirim)
    });
    const hasil = await res.json();
    if (hasil.token) {
      window.snap.pay(hasil.token, {
        onSuccess: () => alert("Pembayaran berhasil (uji‑coba)"),
        onPending: () => alert("Menunggu bayar"),
        onError: () => alert("Gagal buat pembayaran")
      });
    } else {
      alert("Tidak dapat token pembayaran");
    }
  } catch (err) {
    alert("❌ Tidak bisa hubungi server: kemungkinan build masih gagal");
  }
});
