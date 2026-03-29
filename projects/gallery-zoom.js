const screenshotImages = document.querySelectorAll('.screens-grid img');

if (screenshotImages.length > 0) {
    const lightbox = document.createElement('dialog');
    lightbox.className = 'image-lightbox';

    const zoomedImage = document.createElement('img');
    const caption = document.createElement('p');

    lightbox.appendChild(zoomedImage);
    lightbox.appendChild(caption);
    document.body.appendChild(lightbox);

    screenshotImages.forEach((image) => {
        image.addEventListener('click', () => {
            zoomedImage.src = image.src;
            zoomedImage.alt = image.alt;

            const figure = image.closest('figure');
            const text = figure ? figure.querySelector('figcaption') : null;
            caption.textContent = text ? text.textContent : '';

            lightbox.showModal();
        });
    });

    lightbox.addEventListener('click', (event) => {
        const bounds = zoomedImage.getBoundingClientRect();
        const clickInsideImage =
            event.clientX >= bounds.left &&
            event.clientX <= bounds.right &&
            event.clientY >= bounds.top &&
            event.clientY <= bounds.bottom;

        if (!clickInsideImage) {
            lightbox.close();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && lightbox.open) {
            lightbox.close();
        }
    });
}
