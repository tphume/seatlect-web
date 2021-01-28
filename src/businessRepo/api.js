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
      location: { latitude: '', longitude: '' },
      address: '2FL. Groove Central World, Pathum Wan District, Bangkok 10330',
      displayImage: 'https://i.imgur.com/g17EY2i.jpg',
      images: ['https://i.imgur.com/g17EY2i.jpg', 'https://i.imgur.com/RjFgQSZ.jpeg'],
      policy: { minAge: 18 }
    };
  }
}

function getBusinessRepo() {}

export { BusinessRepo, BusinessMockRepo, getBusinessRepo };
