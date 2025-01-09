import axios from 'axios';

import { getPreferredLanguage } from './functions';
import { API_URL, CONTENT_TYPE } from './constant';

const axiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		'content-type': CONTENT_TYPE.JSON,
	},
});

axiosInstance?.interceptors?.request.use(config => {
	const timeZone = localStorage.getItem('timeZone');
	const language = getPreferredLanguage();
	if (timeZone) {
		config.headers['m-preferred-timezone'] = timeZone;
	}
	if(language){
		config.headers['m-preferred-language'] = language;
	}
	return config;
}, error => {
	return Promise.reject(error);
});

export default axiosInstance;
