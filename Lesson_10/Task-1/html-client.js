/* eslint-disable require-jsdoc */
class HtmlClient {
  constructor({apiUrl, apiKey}) {
    this.apiUrl = `${apiUrl}?api_key=${apiKey}&limit=1&q=`;
    this.xhr = new XMLHttpRequest();
  }

  call(query) {
    const xhr = this.xhr;
    xhr.abort();
    return new Promise((resolve, reject) => {
      xhr.open('GET', this.apiUrl + query);
      xhr.onload = () => {
        if (xhr.status !== 200) {
          reject(xhr.status);
          return;
        }
        resolve(JSON.parse(xhr.response));
      };
      xhr.send();
    });
  };
}
