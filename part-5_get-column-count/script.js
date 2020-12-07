// image paths array

const imagePaths = [
    './images/bridge.jpg',
    './images/building.jpg',
    './images/cat.jpg',
    './images/dome.jpg',
    './images/graffiti.jpg',
    './images/house.jpg',
    './images/lobby.jpg',
    './images/mountains.jpg',
    './images/pool.jpg',
    './images/sawmill.jpg',
    './images/sunset-2.jpg',
    './images/sunset.jpg',
    './images/vinyard-1.jpg',
    './images/vinyard-2.jpg',
    './images/vinyard-3.jpg',
    './images/vinyard-4.jpg',
];

// ------------------------------

// animation queue

let animationQueue = [];

// ------------------------------

// append image HTML to document

const appendImageHTMLToDocument = () => {
    const imageParent = document.querySelector('.images');
    imagePaths.forEach((path) => {
        const imageHtml = `<div class="image" style="background-image: url(${path})"></div>`;
        imageParent.innerHTML += imageHtml;
    })
};

appendImageHTMLToDocument();

// ------------------------------

// function that checks if element is in viewport

const isInViewport = (el) => {
    const boundingBox = el.getBoundingClientRect();
    return (
        boundingBox.top <= window.innerHeight &&
        boundingBox.bottom >= 0
    );
};

// ------------------------------

// push elements to animation queue

const pushElementsToAnimationQueue = () => {
    const invisibleImages = document.querySelectorAll('.image:not(.visible)');
    for(const image of invisibleImages) {
        if(isInViewport(image)) {
            animationQueue.push(image);
        }
    }
}

// ------------------------------

// get column count for grid

const getGalleryColumnCount = () => {
    const imageParent = document.querySelector('.images');
    const [image] = document.querySelectorAll('.image');
    const imageParentWidth = imageParent.clientWidth;
    const imageWidth = image.clientWidth;
    return Math.floor(imageParentWidth / imageWidth);
}

// ------------------------------

// reveal elements in animation queue

const revealElementsInAnimationQueue = () => {
    const columnCount = getGalleryColumnCount();
    if(animationQueue.length >= columnCount) {
        animationQueue.forEach((image, index) => {
            setTimeout(() => {
                image.classList.add('visible');
            }, index * 200);
        })
    }
    animationQueue = [];
};

// ------------------------------

// instant function calls

pushElementsToAnimationQueue();
revealElementsInAnimationQueue();

// ------------------------------

// scroll event listener

document.addEventListener('scroll', () => {
    pushElementsToAnimationQueue();
    revealElementsInAnimationQueue();
});

// ------------------------------