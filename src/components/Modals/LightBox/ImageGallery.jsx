import { SlideshowLightbox } from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css'

export default function ImageGallery({ images }) {
    return <SlideshowLightbox
        theme="lightbox"
        iconColor="silver"
        thumbnailBorder="silver"
        imgAnimation="fade"
        className='container grid grid-cols-4 gap-2 mx-auto'
        showThumbnails={true}>
        {images?.map((curElem, i) => {
            return (<img className='w-full rounded-lg h-52 object-contain bg-slate-50 p-2' src={curElem?.url} alt={curElem.url} key={i} title={curElem.url} />)
        })}
    </SlideshowLightbox>
}