import axios from 'axios';

class RequestRepo {
	constructor({ url, endpoint = '/request', id }) {
		// Must pass in url and id
		this.url = url;
		this.endpoint = `${endpoint}/${id}`;
	}

	async createRequest(args) {
		const { businessName, type, tags, description, location, address } = args;
		// TODO: Check arguments

		try {
			const response = await axios.post(this.url + this.endpoint, args);
			return response;
		} catch (e) {
			// TODO add better error handling
			throw 'Network error';
		}
	}
}

class RequestMockRepo {
	async createRequest(args) {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';
	}
}

function getRequestRepo({ url, env, id }) {
	if (env === 'development') {
		return new RequestMockRepo();
	}

	return new RequestRepo({ url, id });
}

export { RequestRepo, RequestMockRepo, getRequestRepo };
