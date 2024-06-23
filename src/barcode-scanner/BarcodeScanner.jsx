"use client";
import { useEffect, useRef } from "react";
import { CameraEnhancer } from "dynamsoft-camera-enhancer";
import { BarcodeReader } from "dynamsoft-javascript-barcode";
import React from "react";

const BarcodeScanner = ({
    isActive,
    children,
    interval,
    license,
    onInitialized,
    onScanned,
    onPlayed,
    onClosed,
}) => {
    const container = useRef(null);
    const enhancer = useRef(null);
    const reader = useRef(null);
    const mounted = useRef(false);

    useEffect(() => {
        const init = async () => {
            if (typeof window === "undefined") {
                // We are not in the browser, return early.
                return;
            }

            if (BarcodeReader.isWasmLoaded() === false) {
                if (license) {
                    BarcodeReader.license = license;
                } else {
                    BarcodeReader.license = "YOUR_TRIAL_LICENSE"; // Replace with your trial license
                }
                BarcodeReader.engineResourcePath =
                    "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@9.6.11/dist/";
            }
            reader.current = await BarcodeReader.createInstance();
            enhancer.current = await CameraEnhancer.createInstance();
            await enhancer.current.setUIElement(container.current);
            enhancer.current.on("played", (playCallbackInfo) => {
                if (onPlayed) onPlayed(playCallbackInfo);
            });
            enhancer.current.on("cameraClose", () => {
                if (onClosed) onClosed();
            });
            enhancer.current.setVideoFit("cover");
            if (onInitialized) onInitialized(enhancer.current, reader.current);
        };

        if (!mounted.current) {
            init();
        }
        mounted.current = true;
    }, []);

    const toggleCamera = () => {
        if (mounted.current) {
            if (isActive) {
                enhancer.current?.open(true);
            } else {
                stopScanning();
                enhancer.current?.close();
            }
        }
    };

    useEffect(() => {
        toggleCamera();
    }, [isActive]);

    const intervalRef = useRef(null);
    const decoding = useRef(false);
    const startScanning = () => {
        const decode = async () => {
            if (!decoding.current && reader.current && enhancer.current) {
                decoding.current = true;
                const results = await reader.current.decode(
                    enhancer.current.getFrame()
                );
                if (onScanned) onScanned(results);
                decoding.current = false;
            }
        };
        intervalRef.current = setInterval(decode, interval || 40);
    };

    const stopScanning = () => {
        clearInterval(intervalRef.current);
    };

    useEffect(() => {
        if (enhancer.current) {
            enhancer.current.on("played", (playCallbackInfo) => {
                if (onPlayed) onPlayed(playCallbackInfo);
                startScanning();
            });
        }
    }, [enhancer.current]);

    return (
        <div
            ref={container}
            style={{ position: "relative", width: "100%", height: "100%" }}
        >
            <div className="dce-video-container"></div>
            {children}
        </div>
    );
};

export default BarcodeScanner;
