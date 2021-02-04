import axios from 'axios';

class UserRepo {
	constructor({ url, endpoint = '/users/login' }) {
		// Must pass in url
		this.url = url;
		this.endpoint = endpoint;
	}

	async login({ username, password }) {
		try {
			await axios.post(this.url + this.endpoint, { username, password });
		} catch (e) {
			// TODO add better error handling
			throw 'Authentication error';
		}
	}
}

class MockUserRepo {
	async login({ username, password }) {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';

		document.cookie = 'token=fakeToken';
		localStorage.setItem('_id', 'placeholder');
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
