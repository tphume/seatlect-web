class UserRepo {
  constructor({ url, endpoint = '/users/login' }) {
    // Must pass in url and endpoint - will be used as default when calling api
    this.url = url;
    this.endpoint = endpoint;
  }

  async login({ username, password }) { }
}

class MockUserRepo {
  async login({ username, password }) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    document.cookie = 'token=fakeToken';
  }
}

function getUserRepo(env) {
  if (env === 'development') {
    return new MockUserRepo();
  }

  return new UserRepo({ url: process.env.URL });
}

export { UserRepo, MockUserRepo, getUserRepo };
