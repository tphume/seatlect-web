import axios from 'axios';

class EmployeeRepo {
	constructor({ url, endpoint = '/employee', id }) {
		// Must pass in url and id
		this.url = url;
		this.endpoint = `${endpoint}/${id}`;
	}
}

class EmployeeMockRepo {
}

function getEmployeeRepo({ url, env, id }) {
	if (env === 'development') {
		return new EmployeeMockRepo();
	}

	return new EmployeeRepo({ url, id });
}

export { EmployeeRepo, EmployeeMockRepo, getEmployeeRepo };
