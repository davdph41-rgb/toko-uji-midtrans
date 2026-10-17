const CLIENT_KEY = "Mid‑client‑It0EFIBOdQG2v3hv";
const TOTAL_BAYAR = 8000;

// Muat library Midtrans Snap
const scriptSnap = document.createElement("script");
scriptSnap.src = "https://app.sandbox.midtrans.com/snap/snap.js";
scriptSnap.dataset.clientKey = CLIENT_KEY;
document.body.appendChild(scriptSnap);

document.getElementById("tombolBayar").addEventListener("click", async () => {
  const nama = document.getElementById("nama").value.trim();
  if (!nama) {
    alert("Silakan isi nama terlebih dahulu!");
    return;
  }

  const dataKirim = { nama, total: TOTAL_BAYAR };

  try {
    const res = await fetch("/api/buatTransaksi", {
      method: "POST",
      headers: {"Content‑Type":"application/json"},
      body: JSON.stringify(dataKirim)
    });
    const hasil = await res.json();
    if (hasil.token) {
      window.snap.pay(hasil.token, {
        onSuccess: () => alert("✅ Pembayaran berhasil (uji‑coba)"),
        onPending: () => alert("⏳ Menunggu pembayaran"),
        onError: () => alert("❌ Gagal memproses pembayaran")
      });
    } else {
      alert("⚠️ Tidak dapat kode pembayaran");
    }
  } catch (err) {
    alert("❌ Tidak bisa terhubung ke server");
  }
});
