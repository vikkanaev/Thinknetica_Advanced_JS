const API_KEY = 'bmIye8jRZQ0kVjwKvFYm3uxcrn4QKKMH';
const API_URL = `http://api.giphy.com/v1/gifs/search`;
const htmlClient = new HtmlClient({apiUrl: API_URL, apiKey: API_KEY});
const proxy = new GiphyProxy({htmlClient: htmlClient});

const SEARCH_STRING = document.querySelector('.search-input');
const LOADER = document.querySelector('.loader');
const RESULT_CONTAINER = document.querySelector('.search-result');

const handleInput = function(event) {
  const queryString = event.target.value;
  LOADER.style.display = 'block';
  RESULT_CONTAINER.innerHTML = '';
  proxy.findImg(queryString)
      .then((img) => renderGif(img))
      .catch((err) => stopRender());
};

const renderGif = function(img) {
  RESULT_CONTAINER.innerHTML = '';
  RESULT_CONTAINER.append(img);
  LOADER.style.display = 'none';
};

const stopRender = function() {
  RESULT_CONTAINER.innerHTML = 'No image for display!';
  LOADER.style.display = 'none';
};

SEARCH_STRING.addEventListener('input', _.debounce(_.throttle(handleInput, 500)));

