class UserRepo {
  constructor({ url, endpoint = '/users/login' }) {
    // Must pass in url and endpoint - will be used as default when calling api
    this.url = url;
    this.endpoint = endpoint;
  }

  async login({ username, password }) {}
}

class MockUserRepo {
  async login({ username, password }) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      token: 'fakeToken'
    };
  }
}

export { UserRepo, MockUserRepo };
