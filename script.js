// script.js

const images = ['img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png'];
let selectedImages = [];
let duplicateIndex = Math.floor(Math.random() * 5);
let imageSet = [];

// Function to shuffle images and create the image set
function shuffleImages() {
    let shuffledImages = [...images];
    let duplicateImage = shuffledImages[duplicateIndex];
    shuffledImages.push(duplicateImage);
    shuffledImages.sort(() => Math.random() - 0.5);
    imageSet = shuffledImages;

    // Render images
    renderImages();
}

// Function to render images
function renderImages() {
    const container = document.getElementById('image-container');
    container.innerHTML = '';

    imageSet.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Image ${index + 1}`;
        img.onclick = () => selectImage(src);
        container.appendChild(img);
    });
}

// Function to handle image selection
function selectImage(src) {
    if (selectedImages.includes(src)) {
        return; // Prevent selecting the same image twice
    }
    
    selectedImages.push(src);
    document.getElementById('reset').style.display = 'inline';

    if (selectedImages.length === 2) {
        document.getElementById('verify').style.display = 'inline';
    }
}

// Function to reset the selection
document.getElementById('reset').onclick = () => {
    selectedImages = [];
    document.getElementById('reset').style.display = 'none';
    document.getElementById('verify').style.display = 'none';
    document.getElementById('para').innerText = '';
};

// Function to verify the selection
document.getElementById('verify').onclick = () => {
    const [firstImage, secondImage] = selectedImages;

    if (firstImage === secondImage) {
        document.getElementById('para').innerText = "You are a human. Congratulations!";
    } else {
        document.getElementById('para').innerText = "We can't verify you as a human. You selected the non-identical tiles.";
    }

    document.getElementById('verify').style.display = 'none';
};

// Initialize the game on page load
window.onload = shuffleImages;
