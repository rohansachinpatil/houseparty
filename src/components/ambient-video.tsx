import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type AmbientVideoProps = {
  src: string;
  className?: string;
};

export function AmbientVideo({ src, className }: AmbientVideoProps) {
  const reducedMotion = useReducedMotion();

  return (
    <video
      aria-hidden="true"
      autoPlay={!reducedMotion}
      className={cn("ambient-video", className)}
      loop
      muted
      playsInline
      preload="none"
      tabIndex={-1}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

type HlsBackgroundVideoProps = {
  src: string;
  className?: string;
};

export function HlsBackgroundVideo({ src, className }: HlsBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    let cancelled = false;
    let cleanupPlayback: () => void = () => {};
    let observer: IntersectionObserver | undefined;

    const loadVideo = async () => {
      const { default: Hls } = await import("hls.js");
      if (cancelled) return;

      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          maxBufferLength: 18,
          backBufferLength: 0,
        });
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          void video.play().catch(() => undefined);
        });
        cleanupPlayback = () => hls.destroy();
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        void video.play().catch(() => undefined);
        cleanupPlayback = () => {
          video.pause();
          video.removeAttribute("src");
          video.load();
        };
      }
    };

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer?.disconnect();
            void loadVideo();
          }
        },
        { rootMargin: "240px" },
      );
      observer.observe(video);
    } else {
      void loadVideo();
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      cleanupPlayback();
    };
  }, [reducedMotion, src]);

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      autoPlay={!reducedMotion}
      className={cn("ambient-video", className)}
      loop
      muted
      playsInline
      preload="none"
      tabIndex={-1}
    />
  );
}
