import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";

import { css } from "@emotion/react";
import { ChevronLeft, ChevronRight, PauseIcon, PlayIcon } from "lucide-react";
import { useRef, useState } from "react";
import { swiperData } from "../data/swiperData";

export default function ProductSwiper() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [swiperPlayStatus, setPlaySwiper] = useState(true);

  const togglePlayHandler = () => {
    if (swiperPlayStatus) {
      swiperRef.current?.autoplay.stop();
    } else {
      swiperRef.current?.autoplay.start();
    }
    setPlaySwiper((swiperPlayStatus) => !swiperPlayStatus);
  };

  return (
    <Swiper
      css={swiperStyle}
      slidesPerView={"auto"}
      spaceBetween={18}
      autoplay={{ delay: 6000, disableOnInteraction: false }}
      pagination={{
        el: ".swiper-progress",
        type: "custom",
        renderCustom: function (_, current, total) {
          const fillPer = (current / total) * 100;
          return `<progress value="${fillPer}" max="100" />`;
        },
      }}
      preventInteractionOnTransition
      loop
      centeredSlides
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
      modules={[Autoplay, Pagination]}
    >
      {swiperData.map((group, groupIndex) => (
        <SwiperSlide key={groupIndex}>
          {group.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </SwiperSlide>
      ))}

      <ProgressContainer
        swiperPlayStatus={swiperPlayStatus}
        prev={() => swiperRef.current?.slidePrev()}
        next={() => swiperRef.current?.slideNext()}
        togglePlay={togglePlayHandler}
      />
    </Swiper>
  );
}

const swiperStyle = css`
  padding: 20px 0;
  max-width: 2221px;

  .swiper-slide {
    display: flex;
    gap: 18px;
    justify-content: center;
    width: 1326px;
  }

  .swiper-slide:not(.swiper-slide-active) {
    .product-card {
      &::after {
        content: "";
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        transition: background-color 0.3s;
        border-radius: 24px;
      }

      .text-box {
        opacity: 0;
      }
    }
  }
`;

type ProductType = {
  url: string;
  text: {
    title1: string;
    title2: string | null;
    subTitle: string;
  } | null;
};

function ProductCard({ product }: { product: ProductType }) {
  return (
    <div className="product-card" css={productCardStyle}>
      <img src={product.url} alt={`Product ${product.url}`} />
      {product.text && (
        <div className="text-box">
          <span className="title">{product.text.title1}</span>
          <span className="title">{product.text.title2}</span>
          <span className="sub-title">{product.text.subTitle}</span>
        </div>
      )}
    </div>
  );
}

const productCardStyle = css`
  width: 430px;
  height: 573px;
  border-radius: 24px;
  position: relative;

  img {
    border-radius: 24px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }

  .text-box {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    padding: 40px 36px;
    color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    transition-property: transform, opacity;
    transition-duration: 0.1s;
    transition-delay: 0.28s;
    transition-timing-function: ease-out;
    opacity: 1;

    &::after {
      height: 192px;
      content: "";
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 100%;
      transition-property: opacity;
      transition-duration: 0.3s;
      transition-timing-function: ease;
      background: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
      border-radius: 24px;
    }

    .title {
      line-height: 41.6px;
      padding-right: 70px;
      font-size: 32px;
      font-weight: 600;
      z-index: 1;
    }

    .sub-title {
      line-height: 21.6px;
      margin-top: 12px;
      padding-right: 80px;
      font-size: 16px;
      font-weight: 400;
      z-index: 1;
    }
  }
`;

function ProgressContainer({
  swiperPlayStatus,
  prev,
  next,
  togglePlay,
}: {
  swiperPlayStatus: boolean;
  prev: () => void;
  next: () => void;
  togglePlay: () => void;
}) {
  return (
    <div css={progressContainerStyle}>
      <div className="swiper-progress" />
      <div css={btnContainerStyle}>
        <ChevronLeft size={26} className="icon" onClick={prev} />
        <div className="divider" />
        <ChevronRight size={26} className="icon" onClick={next} />
        {swiperPlayStatus ? (
          <PauseIcon
            size={18}
            fill="#000"
            className="btn icon"
            onClick={togglePlay}
          />
        ) : (
          <PlayIcon
            size={18}
            fill="#000"
            className="btn icon"
            onClick={togglePlay}
          />
        )}
      </div>
    </div>
  );
}

const progressContainerStyle = css`
  margin-top: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;

  .swiper-progress {
    display: flex;
    align-items: center;

    progress[value] {
      appearance: none;
      border: none;
      width: 1202px;
      height: 3px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      &::-webkit-progress-bar {
        background-color: rgb(238, 238, 238);
      }

      &::-webkit-progress-value {
        background-color: #000;
      }
    }
  }
`;

const btnContainerStyle = css`
  display: inline-flex;
  align-items: center;

  .icon {
    cursor: pointer;
  }

  .btn {
    margin-left: 12px;
  }

  .divider {
    width: 1px;
    height: 10px;
    margin: 0 6px;
    background-color: rgb(226, 226, 226);
  }
`;
