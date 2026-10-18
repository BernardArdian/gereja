export const handleRequest = async (promise) => {
  try {
    const { data } = await promise;

    return [data, null];
  } catch (error) {
    const errorMsg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Kesalahan Server";
    return [null, errorMsg];
  }
};
