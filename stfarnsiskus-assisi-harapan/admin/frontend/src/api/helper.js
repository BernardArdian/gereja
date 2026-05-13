export const handleRequest = async (promise) => {
  try {
    const { data } = await promise;

    return [data, null];
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Kesalahan Server";
    return [null, errorMsg];
  }
};
