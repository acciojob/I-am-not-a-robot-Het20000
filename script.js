// script.js
let selectedImages = [];
let imagePairs = [];
const numImages = 6;

// Function to randomly shuffle images
function shuffleImages() {
    const images = ['img1', 'img2', 'img3', 'img4', 'img5'];
    const randomIndex = Math.floor(Math.random() * images.length);
    const duplicateImage = images[randomIndex];
    const uniqueImages = [...images];
    uniqueImages.push(duplicateImage);
    
    // Shuffle the images
    for (let i = uniqueImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [uniqueImages[i], uniqueImages[j]] = [uniqueImages[j], uniqueImages[i]];
    }
    return uniqueImages;
}

// Display images on the page
function displayImages() {
    const imagesContainer = document.getElementById("images");
    imagesContainer.innerHTML = ""; // Clear previous images
    imagePairs = shuffleImages();

    imagePairs.forEach(image => {
        const imgElem = document.createElement("img");
        imgElem.src = image + '.png'; // Assuming image paths
        imgElem.classList.add('image');
        imgElem.addEventListener('click', () => selectImage(image));
        imagesContainer.appendChild(imgElem);
    });
}

// Handle image selection
function selectImage(image) {
    if (!selectedImages.includes(image)) {
        selectedImages.push(image);
        if (selectedImages.length === 1) {
            document.getElementById("reset").style.display = 'inline';
        }
        if (selectedImages.length === 2) {
            document.getElementById("verify").style.display = 'inline';
        }
    }
}

// Reset function
document.getElementById("reset").addEventListener('click', () => {
    selectedImages = [];
    document.getElementById("reset").style.display = 'none';
    document.getElementById("verify").style.display = 'none';
    document.getElementById("para").innerHTML = "";
    displayImages();
});

// Verification process
document.getElementById("verify").addEventListener('click', () => {
    const message = document.getElementById("para");
    if (selectedImages[0] === selectedImages[1]) {
        message.innerHTML = "You are a human. Congratulations!";
    } else {
        message.innerHTML = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    document.getElementById("verify").style.display = 'none';
});

// Initialize the game
window.onload = displayImages;
