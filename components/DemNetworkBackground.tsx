"use client";

export default function DemNetworkBackground() {
    return (
        <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
            aria-hidden
        >
            <source src="/dem-hero.mp4" type="video/mp4" />
        </video>
    );
}
