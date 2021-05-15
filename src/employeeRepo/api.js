import axios from 'axios';

class EmployeeRepo {
	constructor({ url, endpoint = '/employee', id }) {
		// Must pass in url and id
		this.url = url;
		this.endpoint = `${endpoint}/${id}`;
	}

	async getEmployee() {
		try {
			const response = await axios.get(this.url + this.endpoint);
			return response.data.employees;
		} catch (e) {
			// TODO add better error handling
			throw 'Network error';
		}
	}

	async createEmployee(args) {
		try {
			const response = await axios.post(this.url + this.endpoint, args)
			return response.data
		} catch (e) {
			// TODO add better error handling
			throw 'Network error';
		}
	}

	async deleteEmployee({ username }) {
		try {
			await axios.delete(`${this.url + this.endpoint}/${username}`)
		} catch (e) {
			// TODO add better error handling
			throw 'Network error';
		}
	}
}

class EmployeeMockRepo {
	async getEmployee() {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';

		return [
			{ username: "Wintur", password: "ExamplePassword" },
			{ username: "Summur", password: "ExamplePassword" },
			{ username: "Chodata", password: "WeakPassword" }
		];
	}

	async getEmployee(args) {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';

		return { username: "Jiaroach", password: "ExamplePassword" }
	}

	async deleteEmployee(args) {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Uncomment the following if you want to test error
		// throw 'Fake error';
	}
}

function getEmployeeRepo({ url, env, id }) {
	if (env === 'development') {
		return new EmployeeMockRepo();
	}

	return new EmployeeRepo({ url, id });
}

export { EmployeeRepo, EmployeeMockRepo, getEmployeeRepo };
