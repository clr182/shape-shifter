const imageSources = ["/resources/assets/images/eyes1.png", "/resources/assets/images/eyes2.png", "/resources/assets/images/eyes3.png"];
let currentImageIndex = 0; 
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


function drawImageInCircle(ctx, centerX, centerY, radius, imageSize, positionY, image) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const circleFillColoir = changeForegroundCanvasColor();
    ctx.fillStyle = circleFillColoir || "#ffffff"

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - ctx.lineWidth / 2, 0, 2 * Math.PI);
    ctx.fill();

    if (image) {
        const imageSizeFactor = imageSize / 100;
        const imageWidth = imageSizeFactor * (radius * 2);
        const imageHeight = imageSizeFactor * (radius * 2);

        const imageY = centerY - imageHeight / 2 + positionY;

        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - ctx.lineWidth / 2, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(image, centerX - imageWidth / 2, imageY, imageWidth, imageHeight);
        ctx.restore();
    };
}

function changeBackgroundCanvasColor() {
    const colorInput = document.getElementById("canvasBackgroundColorInput");
    const newColor = colorInput.value;

    // Set the canvas background color
    canvas.style.backgroundColor = newColor;
}

function changeForegroundCanvasColor() {
    const colorInput = document.getElementById("canvasForegroundColorInput");
    const newColor = colorInput.value;

    return newColor;
}

function createImageSizeSlider() {
    var imageSizeSlider = document.getElementById("imageSizeSlider");

    var imagePositionSlider = document.getElementById("imagePositionSlider");

    imageSizeSlider.addEventListener("input", updateImage);
    imagePositionSlider.addEventListener("input", updateImage);
}

function updateImage() {
    const image = new Image();
    image.src = imageSources[currentImageIndex];

    image.onload = function () {
        const imageSize = parseInt(document.getElementById("imageSizeSlider").value);
        const positionY = parseInt(document.getElementById("imagePositionSlider").value);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 70;
        drawImageInCircle(ctx, centerX, centerY, radius, imageSize, positionY, image);

        document.getElementById("currentImage").alt = `Image ${currentImageIndex + 1}`;
    };
}

document.getElementById("prevImageBtn").addEventListener("click", function () {
    currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
    updateImage();
});

document.getElementById("nextImageBtn").addEventListener("click", function () {
    currentImageIndex = (currentImageIndex + 1) % imageSources.length;
    updateImage();
});

createImageSizeSlider();

updateImage();