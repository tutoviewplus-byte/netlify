exports.handler = async () => {
  try {
    const r = await fetch("https://api.upbit.com/v1/market/all", {
      headers: { Accept: "application/json" },
    });

    if (!r.ok) {
      return {
        statusCode: r.status,
        body: JSON.stringify({ error: "upbit market/all", status: r.status }),
      };
    }

    const data = await r.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=60",
      },
      body: JSON.stringify(data),
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
