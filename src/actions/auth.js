import URLS from "../constants/urls";

// TODO : error handling
export async function login({ email, password }) {
  try {
    const payload = JSON.stringify({ email, password });
    const res = await fetch(`${URLS.BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
      credentials: "include", // Required to accept cookies from a different origin
    }).then((data) => data.json());

    if (res.status !== 200) {
      throw new Error({
        status: res.status,
        message: "User Login Successfully!",
        data: res.data || {},
      });
    }
    return {
      status: 200,
      message: res.message,
    };
  } catch (err) {
    return {
      status: 400,
      message: err.message,
    };
  }
}

export async function logout() {
  try {
    const res = await fetch(`${URLS.BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Required to accept cookies from a different origin
    });

    return {
      status: res.status,
      message: "User Logged-out Successfully!",
    };
  } catch (err) {
    throw new Error(err.message, { cause: err });
  }
}
