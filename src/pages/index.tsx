/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import { FunctionComponent, useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useKeyPress } from "../utils/customHooks";

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
  const shakePressed = useKeyPress({ targetKey: "t" });
  const [isShake, setIsShake] = useState<boolean>(true);
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
    if (shakePressed && isShake) setIsShake(false);
    else if (shakePressed && !isShake) setIsShake(true);
    console.log("Shake");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shakePressed]);

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
    <div className="bg-[#40005e] overflow-hidden relative flex w-full">
      <div className="absolute z-[10] flex justify-center self-center items-center w-full h-full glass">
        <img
          src="logo.png"
          alt="logo"
          className={`transform scale-75 ${isShake ? "shake" : ""}`}
        />
      </div>
      <div className="bg-[#40005e] h-screen w-[100%] flex flex-col gap-1 transform rotate-12 scale-125">
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
