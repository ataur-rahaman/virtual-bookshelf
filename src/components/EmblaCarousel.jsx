import React from 'react';
import SliderOne from './SliderOne';
import SliderTwo from './SliderTwo';
import SliderThree from './SliderThree';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from "embla-carousel-autoplay";

const EmblaCarousel = () => {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);
    return (
        <div className='embla' ref={emblaRef}>
            <div className='embla__container'>
                <div className='embla__slide'><SliderOne></SliderOne></div>
                <div className='embla__slide'><SliderTwo></SliderTwo></div>
                <div className='embla__slide'><SliderThree></SliderThree></div>
            </div>
        </div>
    );
};

export default EmblaCarousel;