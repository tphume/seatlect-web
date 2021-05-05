import axios from 'axios';

// Mock data
const exampleReservation = {
	_id: '1',
	name: 'Brightio',
	start: '2021-06-03T18:00:00+0000',
	end: '2021-06-03T23:00:00+0000',
	placement: {
		width: 800,
		height: 800,
		seats: [
			{
				name: 'A1',
				floor: 1,
				type: 'TABLE',
				space: 4,
				user: '128',
				status: 'TAKEN',
				x: 100,
				y: 100,
				width: 80,
				height: 80,
				rotation: 0
			},
			{
				name: 'A2',
				floor: 1,
				type: 'TABLE',
				space: 4,
				user: null,
				status: 'AVAILABLE',
				x: 200,
				y: 100,
				width: 80,
				height: 80,
				rotation: 0
			},
			{
				name: 'B1',
				floor: 1,
				type: 'TABLE',
				space: 4,
				user: null,
				status: 'AVAILABLE',
				x: 100,
				y: 200,
				width: 80,
				height: 80,
				rotation: 0
			},
			{
				name: 'B2',
				floor: 1,
				type: 'TABLE',
				space: 4,
				user: '128',
				status: 'TAKEN',
				x: 200,
				y: 200,
				width: 80,
				height: 80,
				rotation: 0
			}
		]
	}
};

class ReservationRepo {
	constructor({ url, endpoint = 'reservation', id }) {
		// Must pass in url and id
		this.url = url;
		this.endpoint = endpoint;
		this.businessId = id;
	}

	async listReservation({ start, end }) {
		try {
			const response = await axios.get(`${url}/${endpoint}/${id}?start=${start}&end=${end}`);
			return response.data.reservations;
		} catch (e) {
			// TODO add better error handling
			throw 'Network error';
		}
	}

	async createReservation(args) {
		try {
			const response = await axios.post(`${url}/${endpoint}/${id}`, args);
			return response.data.reservation;
		} catch (e) {
			// TODO add better error handling
			throw 'Network error';
		}
	}

	async cancelReservation(id) {
		try {
			const response = await axios.patch(`${url}/${endpoint}/${id}/status`, { status: 0 });
		} catch (e) {
			// TODO add better error handling
			throw 'Network error';
		}
	}
}

class ReservationMockRepo {
	async listReservation() {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';

		return [exampleReservation, exampleReservation, exampleReservation];
	}

	async createReservation(args) {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';

		return exampleReservation;
	}

	async cancelReservation(args) {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';
	}
}

function getReservationRepo({ url, env, id }) {
	if (env === 'development') {
		return new ReservationMockRepo();
	}

	return new ReservationRepo({ url, id });
}

export { ReservationRepo, ReservationMockRepo, getReservationRepo };
