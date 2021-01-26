import axios from 'axios';

class BusinessRepo {
  constructor({ url, endpoint = '/business', id }) {
    // Must pass in url and id
    this.url = url;
    this.endpoint = `${endpoint}/${id}`;
  }

  async getBusiness() {
    try {
      const response = await axios.get(this.url + endpoint);
      return response;
    } catch (e) {
      // TODO add better error handling
      throw 'Network error';
    }
  }
}

class BusinessMockRepo { }

function getBusinessRepo() { }

export { BusinessRepo, BusinessMockRepo, getBusinessRepo };
