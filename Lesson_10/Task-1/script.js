const API_KEY = 'bmIye8jRZQ0kVjwKvFYm3uxcrn4QKKMH';
const API_URL = `http://api.giphy.com/v1/gifs/search`;
const apiClient = new ApiClient({apiUrl: API_URL, apiKey: API_KEY});
const proxy = new GiphyProxy({apiClient: apiClient});

const searchString = document.querySelector('.search-input');
const loader = document.querySelector('.loader');
const resultContainer = document.querySelector('.search-result');

const handleInput = function(event) {
  const queryString = event.target.value;
  loader.style.display = 'block';
  resultContainer.innerHTML = '';
  proxy.findImage(queryString)
      .then((img) => renderGif(img))
      .catch((err) => stopRender());
};

const renderGif = function(img) {
  resultContainer.innerHTML = '';
  resultContainer.append(img);
  loader.style.display = 'none';
};

const stopRender = function() {
  resultContainer.innerHTML = 'No image for display!';
  loader.style.display = 'none';
};

searchString.addEventListener('input', _.debounce(_.throttle(handleInput, 500)));

