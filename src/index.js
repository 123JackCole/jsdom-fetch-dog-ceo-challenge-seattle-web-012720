document.addEventListener("DOMContentLoaded", function () {
  fetchImages();
  fetchBreeds();

  const breedDropdown = document.querySelector("#breed-dropdown");
  breedDropdown.addEventListener("change", function(event) {
    selectCertainBreeds(event.target.value);
  });

});

function selectCertainBreeds(letter) {
  let breedList = document.querySelector("#dog-breeds");
  const certainBreeds = [];
  while (breedList.firstChild) {
    if (breedList.lastChild.textContent.startsWith(letter)) {
      certainBreeds.push(breedList.lastChild);
    }
    breedList.removeChild(breedList.lastChild);
  }

  showBreeds(certainBreeds);

}

function fetchImages() {
  const IMG_URL = "https://dog.ceo/api/breeds/image/random/4";

  fetch(IMG_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      showImages(data);
    });
}

function showImages(images) {
  images.message.forEach(function(image) {
    addImage(image);
  });
}

function addImage(url) {
  const imageList = document.querySelector("#dog-image-container");
  const imageElement = document.createElement('img');
  imageElement.src = url;
  imageList.appendChild(imageElement);
}

function fetchBreeds() {
  const BREED_URL = 'https://dog.ceo/api/breeds/list/all';

  fetch(BREED_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      showBreeds(data);
    });
}

function showBreeds(breeds) {
  if (breeds.message) {
    Object.keys(breeds.message).forEach(function(breed) {
      addBreed(breed);
    })
  } else {
    breeds.forEach(function(breed) {
      addBreed(breed.textContent);
    })
  }
}

function addBreed(breed) {
  const breedList = document.querySelector("#dog-breeds");
  const breedElement = document.createElement("p");
  breedElement.textContent = breed

  breedElement.addEventListener("click", function() {
    breedElement.style.color = "red"
  })

  breedList.appendChild(breedElement);
}