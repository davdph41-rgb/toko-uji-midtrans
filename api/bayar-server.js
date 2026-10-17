export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({pesan: "Hanya izinkan permintaan POST"});
  }

  const SERVER_KEY = "Mid‑server‑KNdiKc1HPaivbw0Su‑WCzmAn";
  const data = req.body;
  const orderId = `ORDER‑${Date.now()}`;

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
    const resMidtrans = await fetch("https://api.sandbox.midtrans.com/v2/snap/create‑transaction", {
      method: "POST",
      headers: {
        "Content‑Type": "application/json",
        "Authorization": "Basic " + Buffer.from(SERVER_KEY + ":").toString("base64")
      },
      body: JSON.stringify(dataTransaksi)
    });
    const jsonMid = await resMidtrans.json();
    return res.status(200).json({token: jsonMid.token});
  } catch (e) {
    return res.status(500).json({pesan: "Gagal hubungi Midtrans", error: e.message});
  }
}
