let pageUrls = {
    about: '/index.html?about',
    contact: '/index.html?contact',
    gallery: '/index.html?gallery'
};

function OnStartUp() {
    popStateHandler();
}

OnStartUp();

document.querySelector('#about-link').addEventListener('click', () => {
    let stateObj = { page: 'about' };
    document.title = 'About';
    history.pushState(stateObj, "about", "?about");
    RenderAboutPage();
});

document.querySelector('#contact-link').addEventListener('click', () => {
    let stateObj = { page: 'contact' };
    document.title = 'Contact';
    history.pushState(stateObj, "contact", "?contact");
    RenderContactPage();
});

document.querySelector('#gallery-link').addEventListener('click', () => {
    let stateObj = { page: 'gallery' };
    document.title = 'Gallery';
    history.pushState(stateObj, "gallery", "?gallery");
    RenderGalleryPage();
});

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
})

function RenderAboutPage() {
    document.querySelector('main').innerHTML = `
<h1 class="title">About Me</h1>
<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>`;
}

function RenderContactPage() {
    document.querySelector('main').innerHTML = `
        <h1 class="title">Contact with me</h1>
        <form id="contact-form">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        <label for="message">Message:</label>
        <textarea id="message" name="message" required></textarea>
        <button type="submit">Send</button>
        </form>`;
    document.getElementById('contact-form').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Form submitted!')
    });
}

function RenderGalleryPage() {
    document.querySelector('main').innerHTML = `
        <h1 class="title">Gallery</h1>
        <div id="gallery" class="gallery-grid"></div>
        <div id="image-modal" class="modal hidden">
            <img id="modal-img" src="" alt="Full view">
        </div>
    `;

    loadGalleryImages();
    setupModalEvents();
}

function popStateHandler() {
    let loc = window.location.href.toString().split(window.location.host)[1];
    if (loc === pageUrls.contact) { RenderContactPage(); }
    else if (loc === pageUrls.about) { RenderAboutPage(); }
    else if (loc === pageUrls.gallery) { RenderGalleryPage(); }
}

function loadGalleryImages() {
    const imageUrls = Array.from({ length: 9 }, (_, i) => `images/im${i + 1}.jpg`);
    const gallery = document.getElementById('gallery');

    imageUrls.forEach(url => {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const imgURL = URL.createObjectURL(blob);
                const img = document.createElement('img');
                img.src = imgURL;
                img.loading = "lazy";
                img.classList.add("thumb");
                img.alt = "Gallery image";
                img.addEventListener('click', () => openModal(imgURL));
                gallery.appendChild(img);
            });
    });
}

function openModal(src) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    modalImg.src = src;
    modal.classList.remove('hidden');
}

function setupModalEvents() {
    const modal = document.getElementById('image-modal');
    modal.addEventListener('click', (e) => {
        if (e.target.id !== 'modal-img') {
            modal.classList.add('hidden');
            document.getElementById('modal-img').src = '';
        }
    });
}

window.onpopstate = popStateHandler