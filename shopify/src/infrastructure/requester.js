const appKey = 'kid_ByOOy3A8X';
const appSecret = 'd08a1cbe41064249bce3459cd3556924';
const hostUrl = 'https://baas.kinvey.com';

const reqHandler = {
  login: payload => {
    return fetch(`${hostUrl}/user/${appKey}/login`, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => {
      return res.json();
    });
  },
  register: payload => {
    return fetch(`${hostUrl}/user/${appKey}`, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => {
      return res.json();
    });
  },
  logout: () => {
    return fetch(`${hostUrl}/user/${appKey}/_logout`, {
      method: 'POST',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    }).then(res => {});
  },
  listProducts: token => {
    return fetch(`${hostUrl}/appdata/${appKey}/products?query={}&sort={"_kmd.ect": -1}`, {
      method: 'GET',
      headers: {
        Authorization: 'Kinvey ' + token
      }
    }).then(res => {
      return res.json();
    });
  },
  addProduct: payload => {
    return fetch(`${hostUrl}/appdata/${appKey}/products`, {
      method: 'POST',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => {
      return res.json();
    });
  },
  editProduct: (id, payload) => {
    console.log(payload);
    return fetch(`${hostUrl}/appdata/${appKey}/products/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => {
      return res.json();
    });
  },
  deleteProduct: id => {
    return fetch(`${hostUrl}/appdata/${appKey}/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    }).then(res => {
      return res.json();
    });
  },
  productDetails: id => {
    console.log('dsdsadasdsad');
    return fetch(`${hostUrl}/appdata/${appKey}/products/${id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    }).then(res => {
      console.log(res);
      return res.json();
    });
  },
  addOrder: payload => {
    return fetch(`${hostUrl}/appdata/${appKey}/orders`, {
      method: 'POST',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => {
      return res.json();
    });
  },
  listOrders: () => {
    return fetch(`${hostUrl}/appdata/${appKey}/orders?query={}&sort={"_kmd.ect": -1}`, {
      method: 'GET',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    }).then(res => {
      return res.json();
    });
  },
  deleteOrder: id => {
    return fetch(`${hostUrl}/appdata/${appKey}/orders/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    }).then(res => {
      return res.json();
    });
  },
  addCategory: payload => {
    return fetch(`${hostUrl}/appdata/${appKey}/categories`, {
      method: 'POST',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => {
      return res.json();
    });
  },
  listCategories: () => {
    return fetch(`${hostUrl}/appdata/${appKey}/categories?query={}&sort={"_kmd.ect": -1}`, {
      method: 'GET',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    }).then(res => {
      return res.json();
    });
  },
  deleteCategory: id => {
    return fetch(`${hostUrl}/appdata/${appKey}/categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    }).then(res => {
      return res.json();
    });
  },
  getCategory: id => {
    return fetch(`${hostUrl}/appdata/${appKey}/categories/${id}`, {
      method: 'GET',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token')
      }
    }).then(res => {
      return res.json();
    });
  },
  editCategory: (id, payload) => {
    return fetch(`${hostUrl}/appdata/${appKey}/categories/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: 'Kinvey ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(res => {
      return res.json();
    });
  },
  similarProducts: category => {
    return fetch(
      `${hostUrl}/appdata/${appKey}/products?query={"category":"${category}"}&sort={"_kmd.ect": -1}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
      }
    ).then(res => {
      return res.json();
    });
  },
  favsProducts: username => {
    return fetch(
      `${hostUrl}/appdata/${appKey}/products?query={"fav":"${username}"}&sort={"_kmd.ect": -1}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Kinvey ' + localStorage.getItem('token')
        }
      }
    ).then(res => {
      return res.json();
    });
  }
};

export default reqHandler;
