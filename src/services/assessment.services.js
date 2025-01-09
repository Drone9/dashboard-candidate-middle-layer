import { getAuthenticationToken } from '../utils/functions';
import axiosInstance from '../utils/axios';

export const getAllAssessment = async () => {
	const token = await getAuthenticationToken();
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	return axiosInstance.get(`/assessment/assessment/`, config);
};