export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const logoutAdmin = () => {
  localStorage.removeItem("adminToken");
  window.location.href = "/admin/login";
};

export const clearToken = () => {
  localStorage.removeItem("token");
};
