/* eslint-disable require-jsdoc */
class GiphyProxy {
  constructor({apiClient}) {
    this.apiClient = apiClient;
    this.storage ={};
  }

  async findImage(query) {
    if (!query) {
      return new Error('no image for no query');
    };

    if (this.storage[query]) {
      console.log('Find in cache!');
      return this.storage[query];
    };

    return await(this._getImageFromGiphy(query));
  };

  _getImageFromGiphy(query) {
    return this.apiClient.get(query)
        .then((res) => this._createAndStoreImage(query, res))
        .catch((err) => new Error('no image from API'));
  }

  _createAndStoreImage(query, res) {
    const url = res.data[0].images.fixed_height_downsampled.url;
    const img = document.createElement('img');
    img.src = url;
    this.storage[query] =img;
    return img;
  };
}
