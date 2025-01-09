import axiosInstance from '../utils/axios';


export const authLogin = async (data) => {
	const myHeaders = new Headers();
	const formData = new FormData();

	formData.append('email', data.username);
	formData.append('password', data.password);

	const config = {
		headers: myHeaders,
	};

	return axiosInstance.post('/auth/token/', formData, config);
};
