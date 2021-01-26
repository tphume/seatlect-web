import axios from 'axios';

class BusinessRepo {
  constructor({ url, endpoint = '/business', id }) {
    // Must pass in url and id
    this.url = url;
    this.endpoint = `${endpoint}/${id}`;
  }

  async getBusiness() {}
}

class BusinessMockRepo {}

function getBusinessRepo() {}

export { BusinessRepo, BusinessMockRepo, getBusinessRepo };
