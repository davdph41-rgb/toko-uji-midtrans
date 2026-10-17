export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({pesan: "Hanya izinkan permintaan POST"});
  }

  const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
  // Cek apakah Server Key sudah ada
  if (!SERVER_KEY) {
    return res.status(500).json({pesan: "Kunci server belum diset di Vercel"});
  }

  const data = req.body;
  const orderId = `ORDER_${Date.now()}`;

  const dataTransaksi = {
    transaction_details: {
      order_id: orderId,
      gross_amount: data.total
    },
    customer_details: {
      first_name: data.nama
    }
  };

  try {
    const resMidtrans = await fetch("https://api.sandbox.midtrans.com/v2/snap/create-transaction", {
      method: "POST",
      headers: {
        "Content‑Type": "application/json",
        "Authorization": "Basic " + Buffer.from(SERVER_KEY + ":").toString("base64")
      },
      body: JSON.stringify(dataTransaksi)
    });

    const jsonMid = await resMidtrans.json();
    if (!jsonMid.token) {
      return res.status(500).json({pesan: "Tidak dapat token dari Midtrans", jawabanMidtrans: jsonMid});
    }
    return res.status(200).json({token: jsonMid.token});
  } catch (e) {
    return res.status(500).json({pesan: "Gagal hubungi server Midtrans", error: e.message});
  }
}
