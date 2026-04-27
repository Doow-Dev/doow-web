"use client";

import { useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { HiMiniXMark } from "react-icons/hi2";

import type { LandingDemoVideoContent } from "../content";
import { VideoPlayButtonIcon } from "@/components/custom/icons/video-play-button-icon";
import { MediaFrame } from "@/components/system";

const DEMO_FRAME_RATIO = 1005 / 669;
const DEMO_VIDEO_CARD_RATIO = 866.268 / 588.164;

export interface DemoVideoLightboxProps {
  content: LandingDemoVideoContent;
}

export function DemoVideoLightbox({ content }: DemoVideoLightboxProps) {
  const [open, setOpen] = useState(false);
  const lightboxRatio = content.poster.width / content.poster.height;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <MediaFrame
        className="demo-video-frame"
        id={content.id}
        frame={
          <div className="demo-video-frame__art">
            <Image
              fill
              alt=""
              aria-hidden="true"
              className="demo-video-frame__art-image"
              quality={70}
              sizes="(min-width: 1280px) 1005px, (min-width: 768px) 76vw, 94vw"
              src={content.frame.src}
            />
          </div>
        }
        mediaClassName="demo-video-frame__media"
        padded={false}
        ratio={DEMO_FRAME_RATIO}
      >
        <Dialog.Trigger asChild>
          <button aria-label={content.playLabel} className="demo-video-frame__trigger" type="button">
            <span className="demo-video-frame__card" style={{ aspectRatio: DEMO_VIDEO_CARD_RATIO }}>
              <Image
                fill
                alt=""
                aria-hidden="true"
                className="demo-video-frame__poster"
                quality={80}
                sizes="(min-width: 1280px) 866px, (min-width: 768px) 76vw, 92vw"
                src={content.poster.src}
              />
              <span aria-hidden="true" className="demo-video-frame__play-button">
                <VideoPlayButtonIcon />
              </span>
            </span>
          </button>
        </Dialog.Trigger>
      </MediaFrame>

      <Dialog.Portal>
        <Dialog.Overlay className="demo-video-lightbox__overlay" onClick={() => setOpen(false)} />
        <Dialog.Content className="demo-video-lightbox__content" onInteractOutside={() => setOpen(false)}>
          <Dialog.Title className="sr-only">{content.title}</Dialog.Title>
          <Dialog.Description className="sr-only">{content.description}</Dialog.Description>

          <div className="demo-video-lightbox__frame">
            <Dialog.Close asChild>
              <button aria-label="Close demo video" className="demo-video-lightbox__close" type="button">
                <HiMiniXMark aria-hidden="true" className="size-5" />
              </button>
            </Dialog.Close>

            <div className="demo-video-lightbox__surface" style={{ aspectRatio: lightboxRatio }}>
              {open ? (
                <video
                  autoPlay
                  className="demo-video-lightbox__video"
                  controls
                  muted
                  playsInline
                  poster={content.poster.src}
                  preload="auto"
                >
                  <source src={content.video.src} type={content.video.mimeType} />
                  Your browser does not support the Doow demo video.
                </video>
              ) : null}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
