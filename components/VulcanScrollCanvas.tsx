"use client";

import { MotionValue, useMotionValueEvent } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface VulcanScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames: number;
    imageFolderPath: string;
}

export default function VulcanScrollCanvas({
    scrollYProgress,
    totalFrames,
    imageFolderPath,
}: VulcanScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const currentFrameRef = useRef(0);
    const rafRef = useRef<number | null>(null);

    // ── Preload all frames ──────────────────────────
    useEffect(() => {
        const images: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 0; i < totalFrames; i++) {
            const img = new Image();
            const frameNum = String(i + 1).padStart(3, "0");
            img.src = `${imageFolderPath}/ezgif-frame-${frameNum}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalFrames) {
                    imagesRef.current = images;
                    setImagesLoaded(true);
                }
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === totalFrames) {
                    imagesRef.current = images;
                    setImagesLoaded(true);
                }
            };
            images.push(img);
        }
    }, [totalFrames, imageFolderPath]);

    // ── Draw a frame (cover fit) ────────────────────
    const drawFrame = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = imagesRef.current[frameIndex];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const dpr = window.devicePixelRatio || 1;
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;

        if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.scale(dpr, dpr);
        }

        ctx.clearRect(0, 0, w, h);

        // Cover-fit logic
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = w / h;
        let drawW: number, drawH: number, offsetX: number, offsetY: number;

        if (imgRatio > canvasRatio) {
            drawH = h;
            drawW = h * imgRatio;
            offsetX = (w - drawW) / 2;
            offsetY = 0;
        } else {
            drawW = w;
            drawH = w / imgRatio;
            offsetX = 0;
            offsetY = (h - drawH) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    }, []);

    // ── Resize observer ─────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const observer = new ResizeObserver(() => {
            if (imagesLoaded) {
                drawFrame(currentFrameRef.current);
            }
        });
        observer.observe(canvas);
        return () => observer.disconnect();
    }, [imagesLoaded, drawFrame]);

    // ── Scroll → frame mapping ──────────────────────
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!imagesLoaded) return;
        const frameIndex = Math.min(
            Math.floor(latest * (totalFrames - 1)),
            totalFrames - 1
        );

        if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
        }
    });

    // ── Draw first frame once loaded ────────────────
    useEffect(() => {
        if (imagesLoaded) {
            drawFrame(0);
        }
    }, [imagesLoaded, drawFrame]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 0 }}
        />
    );
}
