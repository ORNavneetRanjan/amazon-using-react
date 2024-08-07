import axios from "axios";

export function getProductData(id) {
  return axios
    .get(`https://dummyjson.com/product/${id}`)
    .then(function (response) {
      return response.data;
    });
}

export function getProductList({ sortBy, query, page, sortType }) {
  let params = {};

  if (sortBy) {
    params.sortBy = sortBy;
  }
  if (query) {
    params.search = query;
  }
  if (page) {
    params.page = page;
  }
  if (sortType) {
    params.sortType = sortType;
  }

  return axios
    .get("https://myeasykart.codeyogi.io/products", {
      params,
    })
    .then(function (response) {
      console.log(response);
      return response.data;
    });
}
