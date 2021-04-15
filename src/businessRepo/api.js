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

	async updateDI(args) {
		try {
			const res = await axios.put(this.url + this.endpoint + '/displayImage', args);
			return res.data.displayImage;
		} catch (e) {
			// TODO add better error handling
			console.log(e);
			throw 'Network error';
		}
	}

	async appendImage(args) {
		try {
			const res = await axios.post(this.url + this.endpoint + '/images', args);
			return res.data.image;
		} catch (e) {
			// TODO add better error handling
			console.log(e);
			throw 'Network error';
		}
	}

	async deleteImage(pos) {
		try {
			const res = await axios.delete(this.url + this.endpoint + '/images/' + pos);
		} catch (e) {
			// TODO add better error handling
			console.log(e);
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

	async updateDI(args) {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';
	}

	async appendImage(args) {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';

		return 'https://images.all-free-download.com/images/graphicthumb/food_picture_05_hd_picture_167519.jpg';
	}

	async deleteImage(pos) {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';
	}
}

function getBusinessRepo({ url, env, id }) {
	if (env === 'development') {
		return new BusinessMockRepo();
	}

	return new BusinessRepo({ url, id });
}

export { BusinessRepo, BusinessMockRepo, getBusinessRepo };
