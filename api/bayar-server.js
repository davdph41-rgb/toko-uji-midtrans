export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({pesan:"Hanya izinkan POST"});
  const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
  const data = req.body;
  const orderId = `ORDER_${Date.now()}`;

  const dataTransaksi = {
    transaction_details: { order_id: orderId, gross_amount: data.total },
    customer_details: { first_name: data.nama }
  };

  try {
    const resMid = await fetch("https://api.sandbox.midtrans.com/v2/snap/create‑transaction", {
      method:"POST",
      headers:{
        "Content‑Type":"application/json",
        "Authorization":"Basic " + Buffer.from(SERVER_KEY + ":").toString("base64")
      },
      body:JSON.stringify(dataTransaksi)
    });
    const jsonMid = await resMid.json();
    return res.status(200).json({token:jsonMid.token});
  } catch (e) {
    return res.status(500).json({pesan:"Gagal hubungi Midtrans", error:e.message});
  }
}
