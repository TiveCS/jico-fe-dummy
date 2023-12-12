export default function useAuth() {
  const accessToken = localStorage.getItem("accessToken");

  return {
    isAuthenticated: !!accessToken,
    accessToken,
  };
}
