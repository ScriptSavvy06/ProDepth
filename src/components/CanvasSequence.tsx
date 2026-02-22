"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, MotionValue } from "framer-motion";

interface CanvasSequenceProps {
    progress: MotionValue<number>;
    folderPath?: string;
    frameCount?: number;
}

export default function CanvasSequence({ progress, folderPath = "/sequence", frameCount = 240 }: CanvasSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    // Preload Images
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(3, "0");
            img.src = `${folderPath}/ezgif-frame-${paddedIndex}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setImages(loadedImages);
                    setLoaded(true);
                }
            };
            // Default image loading mechanism for fallback if needed, but not necessary if we wait.
            loadedImages.push(img);
        }
    }, [folderPath, frameCount]);

    // Draw frame to canvas based on scroll progress
    useMotionValueEvent(progress, "change", (latest) => {
        if (!loaded || !canvasRef.current || images.length === 0) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        // Calculate current frame index (0 to frameCount - 1)
        let frameIndex = Math.floor(latest * (frameCount - 1));
        // Clamp
        if (frameIndex < 0) frameIndex = 0;
        if (frameIndex >= frameCount) frameIndex = frameCount - 1;

        const img = images[frameIndex];
        if (img && img.complete) {
            // Clear and draw image scaled to fit/cover
            const canvas = canvasRef.current;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Calculate aspect ratio covering
            const imgRatio = img.width / img.height;
            const canvasRatio = canvas.width / canvas.height;
            let drawWidth = canvas.width;
            let drawHeight = canvas.height;
            let offsetX = 0;
            let offsetY = 0;

            if (imgRatio > canvasRatio) {
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
            } else {
                drawHeight = canvas.width / imgRatio;
                offsetY = (canvas.height - drawHeight) / 2;
            }

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Trigger a redraw of the current frame on resize
                const currentProgress = progress.get();
                if (loaded && images.length > 0) {
                    let frameIndex = Math.floor(currentProgress * (frameCount - 1));
                    // Clamp
                    if (frameIndex < 0) frameIndex = 0;
                    if (frameIndex >= frameCount) frameIndex = frameCount - 1;

                    const img = images[frameIndex];
                    if (img && img.complete) {
                        const ctx = canvasRef.current.getContext("2d");
                        if (ctx) {
                            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                            const imgRatio = img.width / img.height;
                            const canvasRatio = canvasRef.current.width / canvasRef.current.height;
                            let drawWidth = canvasRef.current.width;
                            let drawHeight = canvasRef.current.height;
                            let offsetX = 0;
                            let offsetY = 0;

                            if (imgRatio > canvasRatio) {
                                drawWidth = canvasRef.current.height * imgRatio;
                                offsetX = (canvasRef.current.width - drawWidth) / 2;
                            } else {
                                drawHeight = canvasRef.current.width / imgRatio;
                                offsetY = (canvasRef.current.height - drawHeight) / 2;
                            }
                            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                        }
                    }
                }
            }
        };

        handleResize(); // Initial setup
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [loaded, images, progress, frameCount]);

    return (
        <div className="w-full h-full bg-[#050505]">
            <canvas
                ref={canvasRef}
                className="block w-full h-full object-cover"
            />
        </div>
    );
}
