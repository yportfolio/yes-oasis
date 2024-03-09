"use client";
import React from "react";

export default function MusicPlayer() {
  return (
    <figure className="flex items-center">
      <figcaption>Boulevard of Broken Dreams</figcaption>
      <audio autoPlay src="/media/Boulevard-of-Broken-Dreams.mp3"></audio>
    </figure>
  );
}
