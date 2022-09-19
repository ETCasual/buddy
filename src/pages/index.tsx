/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { FunctionComponent, useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useKeyPress } from "../utils/customHooks";

const exImage = [
  "https://i.postimg.cc/x8Ww7n1x/IMG-9479.jpg",
  "https://i.postimg.cc/Vk9xGyQg/IMG-9496.jpg",
  "https://i.postimg.cc/MHj41Nmy/IMG-9499.jpg",
  "https://i.postimg.cc/NjwhksVL/IMG-9507.jpg",
  "https://i.postimg.cc/SsRHxJX1/IMG-9514.jpg",
  "https://i.postimg.cc/BvMd3xv1/IMG-9517.jpg",
  "https://i.postimg.cc/1td2nswm/IMG-9522.jpg",
  "https://i.postimg.cc/yW4GjjL2/IMG-9532.jpg",
  "https://i.postimg.cc/QMXRv6j3/IMG-9540.jpg",
  "https://i.postimg.cc/MZCZg8NJ/IMG-9544.jpg",
  "https://i.postimg.cc/3J2rTcQ4/IMG-9553.jpg",
];

const Home: NextPage = () => {
  const images = trpc.useQuery(["example.listImages"], {
    refetchOnWindowFocus: false,
  });
  const animation = { duration: 20000, easing: (t: number) => t };

  const [ref, iRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    mode: "free",
    slides: {
      perView: 7,
      spacing: 13,
    },
  });
  const [rtlRef, iRef2] = useKeenSlider<HTMLDivElement>({
    rtl: true,
    loop: true,
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    mode: "free",
    slides: {
      perView: 7,
      spacing: 13,
    },
  });
  const [ref2, iRef3] = useKeenSlider<HTMLDivElement>({
    loop: true,
    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    mode: "free",
    slides: {
      perView: 7,
      spacing: 13,
    },
  });

  const isPressed = useKeyPress({ targetKey: "s" });
  const stopAnim = () => {
    iRef.current?.animator.stop();
    iRef2.current?.animator.stop();
    iRef3.current?.animator.stop();
  };

  useEffect(() => {
    if (isPressed) stopAnim();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPressed]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await images.refetch().then(() => {
        iRef.current?.update();
        iRef2.current?.update();
        iRef3.current?.update();
      });
    }, 20000);

    return () => clearInterval(interval);
  }, [iRef, iRef2, iRef3, images]);

  if (images.status === "loading" || images.status === "error" || !images.data)
    return null;

  return (
    <div className="bg-black overflow-hidden">
      <div className="bg-black h-screen w-[100%] flex flex-col gap-1 transform rotate-12 scale-125">
        <div ref={ref} className="keen-slider">
          {images.data.map((e) => (
            <BuddyImage src={e} key={e} />
          ))}
        </div>
        <div ref={rtlRef} className="keen-slider">
          {images.data.map((e) => (
            <BuddyImage src={e} key={e} />
          ))}
        </div>
        <div ref={ref2} className="keen-slider">
          {images.data.map((e) => (
            <BuddyImage src={e} key={e} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Images handler
type BuddyImageProps = {
  src: string;
};

const BuddyImage: FunctionComponent<BuddyImageProps> = ({ src }) => {
  return (
    <div className="keen-slider__slide">
      <img src={src} alt={src} className="object-cover w-full h-full" />
    </div>
  );
};

export default Home;
