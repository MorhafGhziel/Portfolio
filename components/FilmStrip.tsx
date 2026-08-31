"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type Shot = { src: string; alt: string };

/**
 * A reel of real screens that tracks the page scroll. Motion is driven by
 * how far you've scrolled rather than a timer, so it reads as a response to
 * the reader rather than as decoration playing to itself.
 */
export default function FilmStrip({ shots }: { shots: Shot[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-26%"]);

  return (
    <div ref={ref} className="edge-fade overflow-hidden py-14 md:py-20">
      <motion.div
        className="flex w-max gap-4 md:gap-6"
        style={reduce ? undefined : { x }}
      >
        {shots.map((shot, i) => (
          <figure
            key={shot.src}
            className="group relative w-[260px] shrink-0 overflow-hidden rounded-[10px] border border-line bg-ink-2 sm:w-[340px] md:w-[420px]"
            style={{ transform: `rotate(${i % 2 === 0 ? -1.1 : 0.9}deg)` }}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              width={840}
              height={525}
              sizes="(max-width: 640px) 260px, (max-width: 768px) 340px, 420px"
              className="tone h-full w-full object-cover"
              style={{ aspectRatio: "16 / 10" }}
            />
          </figure>
        ))}
      </motion.div>
    </div>
  );
}
