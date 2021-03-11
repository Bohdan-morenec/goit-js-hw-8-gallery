
import gallery from "./gallery.js"
const galleryEl = document.querySelector('.gallery')
const fnCreatesGalleryEl = createsLandscapePhotos(gallery)
const modalPhotoEl = document.querySelector('.lightbox')
const imgModalEl = document.querySelector('.lightbox__image')
const buttonEl = document.querySelector('.lightbox__button')
const modalOverlay = document.querySelector('.lightbox__overlay')

galleryEl.insertAdjacentHTML('beforeend', fnCreatesGalleryEl)

function createsLandscapePhotos(gallery) {
    return gallery.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
    <a
        class="gallery__link"
        href = "${original}"
>
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
</li>`
    }).join('')
}

const openPhotoFn = (e) => {
    e.preventDefault()
    let photoUrlEl = e.target.dataset.source
    let altPhotoEl = e.target.alt
    let photoNodeNameEl = e.target.nodeName

    if (photoNodeNameEl !== 'IMG') {
        return
    }
    modalPhotoEl.classList.add("is-open")
    photoAttributesfn(photoUrlEl, altPhotoEl)
    imgModalEl.dataset.index = 0
}

const closingModalPhotoFn = () => {
    modalPhotoEl.classList.remove("is-open")
    photoAttributesfn('', '')
}

galleryEl.addEventListener('click', openPhotoFn)
buttonEl.addEventListener('click', closingModalPhotoFn)
modalOverlay.addEventListener('click', closingModalPhotoFn)

document.addEventListener('keyup', (e => {
    const key = e.code;

    if (key === 'Escape') {
        closingModalPhotoFn()
    };
    if (key === 'ArrowLeft') {
        ArrowLeft()
    };
    if (key === 'ArrowRight') {
        ArrowRight()
    };
}))

const sliderСarouselFn = (step, index) => {
    imgModalEl.dataset.index = `${index + step}`
    imgModalEl.src = gallery[index + step].original
}

function ArrowLeft() {

    let index = +imgModalEl.dataset.index
    if (index === 0) {
        sliderСarouselFn(0, gallery.length - 1)
        return
    }
    sliderСarouselFn(-1, index)
}
function ArrowRight() {

    let index = +imgModalEl.dataset.index
    if (index === gallery.length - 1) {
        sliderСarouselFn(0, 0)
        return
    }
    sliderСarouselFn(1, index)
}
const photoAttributesfn = (src, alt) => {
    imgModalEl.src = src
    imgModalEl.alt = alt
}