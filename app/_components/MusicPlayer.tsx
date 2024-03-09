"use client";
import { Play, PauseCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLAudioElement>(null);

  const onPlay = () => {
    ref.current?.play();
    setPlaying(true);
  };

  const onPause = () => {
    ref.current?.pause();
    setPlaying(false);
  };

  return (
    <figure className="flex items-center">
      <figcaption className={`${playing && "animate-pulse"}`}>
        Boulevard of Broken Dreams
      </figcaption>
      <audio ref={ref} src="/media/Boulevard-of-Broken-Dreams.mp3" />
      {playing ? (
        <PauseCircle className="cursor-pointer" onClick={onPause} />
      ) : (
        <Play className="cursor-pointer" onClick={onPlay} />
      )}
    </figure>
  );
}
