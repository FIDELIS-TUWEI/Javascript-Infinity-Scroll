// Create a header
const header = document.createElement('h1');
header.innerText = `Unsplash API - Infinite Scroll`;
document.body.append(header);

// Container for images
const imageContainer = document.createElement('div');
imageContainer.setAttribute('class', 'image__container');
imageContainer.setAttribute('id', 'image__container');
document.body.append(imageContainer);


// SCRIPT
// DOM MANIPULATION

const imageDiv = document.getElementById('image__container');
const loader = document.getElementById('loader');


let ready = false;
let imageLoaded = 0;
let totalImages = 0;
let photoArray = [];

// UNSPLASH API
const count = 30;

// Never share your API key, but its free and public
const key = "dtkyZAV5zRvH10hIQ0tZ89CEuQeXWfFaQpLXEkEUYko";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${key}&count=${count}`;

// Function for images loaded

function imagesLoaded() {

    imageLoaded++;
    if (imageLoaded === totalImages) {
        ready = true;
    }

}

// setting arributes function to the DOM
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create and add Links for photos to the DOM
displayPhotos = () => {
    imageLoaded = 0;
    totalImages = photoArray.length;

    // Function to run each object in photoArray
    photoArray.forEach((photo) => {
        // create <a> to link to full photo
        const anchor = document.createElement('a');
        setAttributes(anchor, {
            href: photo.links.html,
            target: '_blank'
        });

        // create img
        const image = document.createElement('img');
        setAttributes(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event listener
        image.addEventListener('load', imagesLoaded);

        // Add img and <a> to imageContainer
        anchor.appendChild(image);
        imageDiv.appendChild(anchor);
    });
}

// Fetch photos from API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}


// Check if scrolling loads more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();