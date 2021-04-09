import axios from 'axios';

class PlacementRepo {
	constructor({ url, endpoint = '/placement', id }) {
		// Must pass in url and id
		this.url = url;
		this.endpoint = `${endpoint}/${id}`;
	}

	async getPlacement() {
		try {
			const response = await axios.get(this.url + this.endpoint);
			return response.data;
		} catch (e) {
			// TODO add better error handling
			throw 'Network error';
		}
	}

	async updatePlacement(args) {
		try {
			const response = await axios.put(this.url + this.endpoint, args);
			return response.data;
		} catch (e) {
			// TODO add better error handling
			throw 'Network error';
		}
	}
}

class PlacementMockRepo {
	async getPlacement() {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';

		return [];
	}

	async updatePlacement(args) {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';
	}
}

function getPlacementRepo({ url, env, id }) {
	if (env === 'development') {
		return new PlacementMockRepo();
	}

	return new PlacementRepo({ url, id });
}

export { PlacementRepo, PlacementMockRepo, getPlacementRepo };
