/* eslint-disable require-jsdoc */
class GiphyProxy {
  constructor({htmlClient}) {
    this.htmlClient = htmlClient;
    this.storage ={};
  }

  findImg(query) {
    debugger;
    return new Promise((resolve, reject) => {
      if (!query) {
        reject(new Error('no image for no query'));
      } else if (this.storage[query]) {
        console.log('Find in cache!');
        resolve(this.storage[query]);
      } else {
        resolve(this._getImgFromGiphy(query));
      }
    });
  };

  _getImgFromGiphy(query) {
    return this.htmlClient.call(query)
        .then((res) => this._createAndStoreImg(query, res))
        .catch((err) => new Error('no image from API'));
  }

  _createAndStoreImg(query, res) {
    const url = res.data[0].images.fixed_height_downsampled.url;
    const img = document.createElement('img');
    img.src = url;
    this.storage[query] =img;
    return img;
  };
}
