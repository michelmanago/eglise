// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper styles
import 'swiper/swiper-bundle.css';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function Carousel() {
    return (

        <div className="w-3/4 h-auto mx-auto bg-white rounded-xl  overflow-hidden md:max-w-full m-6 mb-9">
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                navigation={{ clickable: true }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                style={{ '--swiper-navigation-color': 'white' }}
            >
            <SwiperSlide><img className="full" src="/static/img/cimetiere/tombe-princesse-wolkonsky-cimetière-russe-Sainte-Genevieve-des-Bois.jpg" alt="slide 1" /></SwiperSlide>
            <SwiperSlide><img className="full" src="/static/img/cimetiere/carré-anciens-combattants-cimetière-russe-Sainte-Genevieve-des-Bois.jpg" alt="slide 2" /></SwiperSlide>
            <SwiperSlide><img className="full" src="/static/img/cimetiere/allée-cimetière-russe-Sainte-Geneviève-des-Bois.jpg" alt="slide 3" /></SwiperSlide>
            <SwiperSlide><img className="full" src="/static/img/cimetiere/croix-cimetière-russe-Sainte-Genevieve-des-Bois.jpg" alt="slide 4" /></SwiperSlide>
            <SwiperSlide><img className="full" src="/static/img/cimetiere/cimetière-russe-Sainte-Geneviève-des-Bois.jpg" alt="slide 5" /></SwiperSlide>
            <SwiperSlide><img className="full" src="/static/img/cimetiere/crypte-église-sainte-genevieve-des-bois.jpg" alt="slide 6" /></SwiperSlide>

            </Swiper>
        </div>

    );
};