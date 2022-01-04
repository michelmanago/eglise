// import Swiper core and required components
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
// import Swiper styles
import 'swiper/swiper-bundle.css';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function CarouselParam({imgList, apiUrl}) {
    return (
        <div className="h-auto my-6 overflow-hidden bg-white rounded-xl md:max-w-full mb-9">
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                navigation={{clickable: true}}
                onSlideChange={() => null}
                onSwiper={swiper => console.log(swiper)}
            >
                {imgList &&
                    imgList.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col items-center">
                                <img className="full" src={`${apiUrl}${img.url}`} alt={`slide ${index}`} />
                                <div>{img.legende}</div>
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}
