import URLS from "../constants/urls";

export async function signupUser(payload) {
  try {
    const res = await fetch(`${URLS.BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Required to accept cookies from a different origin
      body: JSON.stringify(payload),
    }).then((data) => data.json());

    /** unauthorized user */
    if (!res.status || res?.error) {
      return {
        status: 401,
        message: res.message || "Signup failed!",
        data: {},
      };
    }

    return {
      status: res.status || 200,
      message: res.message || "Signup Successful!",
      data: res.data || {},
    };
  } catch (err) {
    return {
      status: 400,
      message: err.message || "Signup failed!",
      data: {},
    };
  }
}
