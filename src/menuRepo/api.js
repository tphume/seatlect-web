import axios from 'axios';

class MenuRepo {
	constructor({ url, endpoint = '/business', id }) {
		// Must pass in url and id
		this.url = url;
		this.endpoint = `${endpoint}/${id}`;
	}

	async getMenu() {
		try {
			const response = await axios.get(this.url + this.endpoint + '/menu');
			return response.data.menu;
		} catch (e) {
			// TODO add better error handling
			throw 'Network error';
		}
	}

	async appendItem(args) {
		try {
			const res = await axios.post(this.url + this.endpoint + '/menuitems', args);
			return res.data.image;
		} catch (e) {
			// TODO add better error handling
			console.log(e);
			throw 'Network error';
		}
	}

	async deleteItem(name) {
		try {
			await axios.delete(this.url + this.endpoint + '/menuitems/' + name);
		} catch (e) {
			// TODO add better error handling
			throw 'Network error';
		}
	}
}

class MenuMockRepo {
	async getMenu() {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';

		return [
			{
				image:
					'https://images.all-free-download.com/images/graphicthumb/food_picture_05_hd_picture_167519.jpg',
				name: 'main 1',
				price: '350.00',
				description: 'main dish'
			},
			{
				image:
					'https://images.all-free-download.com/images/graphicthumb/food_picture_05_hd_picture_167519.jpg',
				name: 'main 2',
				price: '320.00',
				description: 'Main dish'
			},
			{
				image:
					'https://images.all-free-download.com/images/graphicthumb/food_picture_05_hd_picture_167519.jpg',
				name: 'main 3',
				price: '295.00',
				description: 'Main dish'
			},
			{
				image:
					'https://images.all-free-download.com/images/graphicthumb/food_picture_05_hd_picture_167519.jpg',
				name: 'side 1',
				price: '120.00',
				description: 'Side dish'
			},
			{
				image:
					'https://images.all-free-download.com/images/graphicthumb/food_picture_05_hd_picture_167519.jpg',
				name: 'side 2',
				price: '170.00',
				description: 'Side dish'
			},
			{
				image:
					'https://images.all-free-download.com/images/graphicthumb/food_picture_05_hd_picture_167519.jpg',
				name: 'side 3',
				price: '85.00',
				description: 'Side dish'
			}
		];
	}

	async appendItem(args) {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';
	}

	async deleteItem(name) {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';
	}
}

function getMenuRepo({ url, env, id }) {
	if (env === 'development') {
		return new MenuMockRepo();
	}

	return new MenuRepo({ url, id });
}

export { MenuRepo, MenuMockRepo, getMenuRepo };
