import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKENDURL
});
//axiosClient.defaults.headers.common["Content-Type"] = `application/x-www-form-urlencoded`;
//axiosClient.defaults.headers.common["Cookie"] = `__Host-device_id=AQB2cMuU1I8bI6hDZPKWQX4CjxWvfV90j_pvZCFJxl5Mkfug78h3HYYLokAodw6NBHEFvazHJrvmVKkV18MFDf80d7siatP0o20; sp_tr=false`;
export default axiosClient;