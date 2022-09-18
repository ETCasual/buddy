/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Image from "next/image";
import { FunctionComponent, useState } from "react";
import { trpc } from "../utils/trpc";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

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
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  const [data, setData] = useState<string[]>([]);
  const animation = { duration: 20000, easing: (t: number) => t };
  const [ref] = useKeenSlider<HTMLDivElement>({
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
  const [rtlRef] = useKeenSlider<HTMLDivElement>({
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

  return (
    <>
      <div className="bg-black h-screen w-screen flex flex-col gap-1">
        <div ref={ref} className="keen-slider">
          {exImage.map((e) => (
            <BuddyImage src={e} key={e} />
          ))}
        </div>
        <div ref={rtlRef} className="keen-slider">
          {exImage.map((e) => (
            <BuddyImage src={e} key={e} />
          ))}
        </div>
        <div ref={ref} className="keen-slider">
          {exImage.map((e) => (
            <BuddyImage src={e} key={e} />
          ))}
        </div>
      </div>
    </>
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
