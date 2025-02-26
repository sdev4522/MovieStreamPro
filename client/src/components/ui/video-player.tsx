import React from "react";
import ReactPlayer from "react-player";
import { Card } from "./card";

interface VideoPlayerProps {
  url: string;
  type: string;
  title: string;
}

export function VideoPlayer({ url, type, title }: VideoPlayerProps) {
  return (
    <Card className="w-full aspect-video bg-black overflow-hidden">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        playing
        pip
        config={{
          youtube: {
            playerVars: { showinfo: 1 }
          },
          file: {
            attributes: {
              controlsList: "nodownload",
              title
            }
          }
        }}
      />
    </Card>
  );
}
