export default async function request(method, endpoint, body) {
  const headers = {
    Accept: "application/json",
  };

  if (window.localStorage.getItem("login_token"))
    headers.authorization = `Bearer ${window.localStorage.getItem(
      "login_token"
    )}`;

  if (!(body instanceof FormData)) headers["Content-Type"] = "application/json";

  const requestOptions = {
    method: method,
    headers: headers,
  };

  if (method !== "GET")
    requestOptions.body =
      body instanceof FormData ? body : JSON.stringify(body);

  try {
    const request = await fetch(
      "https://profilesite-professional.onrender.com" + endpoint,
      requestOptions
    );

    if (request.ok) {
      const contentType = request.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1)
        return await request.json();
    } else {
      const contentType = request.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const response = await request.json();
        console.log(response);
        // return {
        //   error: { status: request.status, details: response },
        // };
        return response;
      }

      return { error: { status: request.status } };
    }
  } catch (err) {
    console.log(err);
    return { error: err };
  }
}
