import axios from 'axios';

class UserRepo {
	constructor({ url, endpoint = '/user' }) {
		// Must pass in url
		this.url = url;
		this.endpoint = endpoint;
	}

	async login(args) {
		const { username, password } = args;

		try {
			await axios.post(this.url + this.endpoint + '/login', { username, password });
		} catch (e) {
			// TODO add better error handling
			throw 'Authentication error';
		}
	}

	async register(args) {
		try {
			await axios.post(this.url + this.endpoint + '/register', args);
		} catch (e) {
			// TODO add better error handling
			throw 'Network error';
		}
	}
}

class MockUserRepo {
	async login(args) {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';

		document.cookie = 'token=fakeToken';
		localStorage.setItem('_id', 'placeholder');
	}

	async register(args) {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';
	}
}

// Construct UserRepo
function getUserRepo({ env, url }) {
	if (env === 'development') {
		return new MockUserRepo();
	}

	return new UserRepo({ url });
}

export { UserRepo, MockUserRepo, getUserRepo };
