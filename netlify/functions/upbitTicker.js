exports.handler = async (event) => {
  try {
    const markets = event.queryStringParameters && event.queryStringParameters.markets;
    if (!markets) {
      return { statusCode: 400, body: JSON.stringify({ error: "missing markets" }) };
    }

    const url =
      "https://api.upbit.com/v1/ticker?markets=" + encodeURIComponent(markets);

    const r = await fetch(url, { headers: { Accept: "application/json" } });

    if (!r.ok) {
      return {
        statusCode: r.status,
        body: JSON.stringify({ error: "upbit ticker", status: r.status }),
      };
    }

    const data = await r.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=10",
      },
      body: JSON.stringify(data),
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
