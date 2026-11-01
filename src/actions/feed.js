import URLS from "../constants/urls";

export async function getFeed({ page, limit }) {
  try {
    const res = await fetch(
      `${URLS.BASE_URL}/user/feed?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Required to accept cookies from a different origin
      },
    ).then((data) => data.json());

    /** unauthorized user */
    if (res.status !== 200) {
      return {
        status: res.status || 400,
        message: res.message || "Unable to fetch feed. Please try again later.",
        data: {},
      };
    }

    return {
      status: res.status,
      message: "Feed fetched successfully!",
      data: res.data || {},
    };
  } catch (err) {
    return {
      status: 400,
      message: err.message || "Unable to fetch feed. Please try again later.",
      data: {},
    };
  }
}
