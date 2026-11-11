// Samakan hasil pemanggilan API menjadi pasangan [data, error].
export const handleRequest = async (promise) => {
  try {
    const { data } = await promise;

    return [data, null];
  } catch (error) {
    // Ambil pesan paling spesifik yang tersedia dari respons server/klien.
    const errorMsg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Kesalahan Server";
    return [null, errorMsg];
  }
};
