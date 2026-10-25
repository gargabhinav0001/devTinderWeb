import URLS from "../constants/urls";

export async function getProfile() {
  try {
    const res = await fetch(`${URLS.BASE_URL}/profile/view`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Required to accept cookies from a different origin
    }).then((data) => data.json());

    /** unauthorized user */
    if (res.status === 401) {
      return {
        status: 401,
        message: "User is not authorized",
      };
    }

    return {
      status: res.status,
      message: "Profile fetched successfully!",
      data: res.data || {},
    };
  } catch (err) {
    throw new Error(err, { cause: err });
  }
}
