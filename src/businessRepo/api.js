import axios from 'axios';

class BusinessRepo {
	constructor({ url, endpoint = '/business', id }) {
		// Must pass in url and id
		this.url = url;
		this.endpoint = `${endpoint}/${id}`;
	}

	async getBusiness() {
		try {
			const response = await axios.get(this.url + this.endpoint);
			return response.data;
		} catch (e) {
			// TODO add better error handling
			throw 'Network error';
		}
	}
}

class BusinessMockRepo {
	async getBusiness() {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';

		return {
			businessName: 'JiaRoast',
			type: 'Bar',
			tags: ['Korean', 'Alcohol'],
			description:
				'Korean style bar with an emphasis on roast side dishes. Made by certified chef Jiaroach',
			location: { latitude: 13.745226384751511, longitude: 100.53793107547114 },
			address: '2FL. Groove Central World, Pathum Wan District, Bangkok 10330',
			displayImage: 'https://i.imgur.com/g17EY2i.jpg',
			images: ['https://i.imgur.com/g17EY2i.jpg', 'https://i.imgur.com/RjFgQSZ.jpeg']
		};
	}
}

function getBusinessRepo({ url, env, id }) {
	if (env === 'development') {
		return new BusinessMockRepo();
	}

	return new BusinessRepo({ url, id });
}

export { BusinessRepo, BusinessMockRepo, getBusinessRepo };
