import { TimelineMax, gsap } from "gsap";
import { Timeline } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIntersection } from "react-use";
import { useRef, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export const WhatIsNearby = () => {
  let titleRef = useRef(null);
  let gladYouAskedRef = useRef(null);
  const sectionRefs = useRef([]);
  sectionRefs.current = [];

  useEffect(() => {
    const tl = new TimelineMax();
    tl.fromTo(
      titleRef,
      1,
      {
        opacity: 0,
        x: -40,
      },
      {
        opacity: 1,
        x: 0,
      },
    );
    tl.fromTo(
      gladYouAskedRef,
      2,
      {
        opacity: 0,
        y: +40,
      },
      {
        opacity: 1,
        y: 0,
      },
      "+=0.3",
    );
    sectionRefs.current.forEach((el, index) => {
      let sectionTl = new gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top center",
          toggleActions: "play none none reverse",
        },
      });
      sectionTl.fromTo(
        el.firstChild,
        { scale: 2, x: -400, opacity: 0 },
        {
          scale: 1,
          x: 0,
          opacity: 1,
          ease: "none",
        },
      );
      sectionTl.fromTo(
        el.lastChild,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
      );
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
    console.log(sectionRefs.current);
  };

  return (
    <div className="what-is-nearby-container">
      <div className="header-container">
        <h1
          ref={(e) => {
            titleRef = e;
          }}
        >
          " So what exactly is Nearby? "
        </h1>
        <p
          ref={(e) => {
            gladYouAskedRef = e;
          }}
        >
          We're glad you asked
        </p>
      </div>
      <section ref={addToRefs}>
        <h1>NEARBY</h1>
        <p>A site to make sure people are connecting.</p>
      </section>
      <section ref={addToRefs}>
        <h1>A COMMUNITY MORE CONNECTED THAN EVER</h1>
        <p> Nearby started with one goal in mind: keeping people in a community more connected than ever before.</p>
      </section>
      <section ref={addToRefs}>
        <h1>A COMMUNITY MORE CONNECTED THAN EVER</h1>
        <p> Nearby started with one goal in mind: keeping people in a community more connected than ever before.</p>
      </section>
    </div>
  );
};
