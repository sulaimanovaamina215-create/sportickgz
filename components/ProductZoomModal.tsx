"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type ZoomAnchor = {
    top: number;
    left: number;
    width: number;
    height: number;
};

type ProductZoomModalProps = {
    open: boolean;
    src: string;
    alt?: string;
    anchor: ZoomAnchor | null;
    onClose: () => void;
    gallery?: string[];
    galleryIndex?: number;
    onGalleryStep?: (dir: 1 | -1) => void;
};

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

export default function ProductZoomModal({
    open,
    src,
    alt = "Product",
    anchor,
    onClose,
    gallery,
    galleryIndex = 0,
    onGalleryStep,
}: ProductZoomModalProps) {
    const [vw, setVw] = useState(1200);
    const [vh, setVh] = useState(800);

    useEffect(() => {
        const sync = () => {
            setVw(window.innerWidth);
            setVh(window.innerHeight);
        };
        sync();
        window.addEventListener("resize", sync);
        return () => window.removeEventListener("resize", sync);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onGalleryStep?.(-1);
            if (e.key === "ArrowRight") onGalleryStep?.(1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose, onGalleryStep]);

    if (!open) return null;

    const hasGallery = Array.isArray(gallery) && gallery.length > 1;
    const pad = 16;
    const box = Math.round(
        clamp(
            (anchor ? Math.max(anchor.width, anchor.height) * 1.75 : 300),
            Math.min(280, vw * 0.72),
            Math.min(380, vw * 0.88)
        )
    );

    let top: number;
    let left: number;

    if (anchor) {
        top = anchor.top + anchor.height / 2 - box / 2;
        left = anchor.left + anchor.width / 2 - box / 2;
    } else {
        top = vh / 2 - box / 2;
        left = vw / 2 - box / 2;
    }

    top = clamp(top, pad, vh - box - pad);
    left = clamp(left, pad, vw - box - pad);

    return (
        <div className="fixed inset-0 z-[90]" onClick={onClose}>
            <div className="absolute inset-0 bg-black/65" />
            <div
                className="absolute overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10"
                style={{ top, left, width: box, height: box }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative flex h-full w-full items-center justify-center p-5 sm:p-6">
                    <Image
                        src={src}
                        alt={alt}
                        width={700}
                        height={700}
                        className="h-auto max-h-full w-auto max-w-full object-contain"
                        sizes={`${box}px`}
                        priority
                    />
                </div>

                {hasGallery && onGalleryStep && (
                    <>
                        <button
                            type="button"
                            onClick={() => onGalleryStep(-1)}
                            className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/90 text-white shadow-lg transition hover:bg-cyan-600"
                            aria-label="Previous photo"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            type="button"
                            onClick={() => onGalleryStep(1)}
                            className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/90 text-white shadow-lg transition hover:bg-cyan-600"
                            aria-label="Next photo"
                        >
                            <ChevronRight size={18} />
                        </button>
                        <div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 rounded-full bg-slate-900/80 px-2.5 py-0.5 text-[11px] font-bold text-white">
                            {galleryIndex + 1} / {gallery!.length}
                        </div>
                    </>
                )}

                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition hover:bg-red-600"
                    aria-label="Close"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}
