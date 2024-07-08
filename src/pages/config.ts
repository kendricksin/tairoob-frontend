export const API_URL = (() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) return 'http://8.213.193.124:8080';
    return apiUrl.startsWith('http') ? apiUrl : `http://${apiUrl}`;
  })();
export const DB_SERVER = (() => {
  const dbUrl = import.meta.env.DB_SERVER;
  if (!dbUrl) return 'http://8.213.210.6:5000';
  return dbUrl.startsWith('http') ? dbUrl : `http://${dbUrl}`;
})();