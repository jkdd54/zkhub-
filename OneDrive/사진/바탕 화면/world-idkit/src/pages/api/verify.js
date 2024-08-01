export default async function handler(req, res) {
  try {
    const { proof, action } = req.body;
    const verifyResponse = await fetch('https://developer.worldcoin.org/api/v1/verify/app_6c3821fa0dbede374338de59f453db3b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...proof, action }),
    });

    const verifyData = await verifyResponse.json();

    if (verifyResponse.ok) {
      res.status(200).json({ verified: verifyData.verified });
    } else {
      res.status(400).json({ error: `Error Code ${verifyData.code}: ${verifyData.detail}` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
