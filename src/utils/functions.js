export const getPreferredLanguage = () => {
	return 'en';
};

export const getAuthenticationToken = () => {
	const session = JSON.parse(localStorage.getItem('_mereos'));
	if (session?.jwtToken && session?.validity > new Date().getTime()) {
		return session.jwtToken;
	} else {
		alert('info', 'your_login_session_expired');
		localStorage.clear();
		return false;
	}
};