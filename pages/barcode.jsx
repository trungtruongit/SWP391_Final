import { useState, useEffect } from "react";

const BarCodeTest = () => {
    const [barCode, setBarcodeScan] = useState("No Barcode Scanned");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            let barcode = "";
            let lastKeyTime = Date.now();

            const onKeydown = (event) => {
                const now = Date.now();

                // Reset barcode if too much time has passed since the last key press
                if (now - lastKeyTime > 100) {
                    barcode = "";
                }

                // Process only alphanumeric keys (ignore special keys)
                if (/^[a-zA-Z0-9]$/.test(event.key)) {
                    barcode += event.key;
                } else if (event.key === "Enter") {
                    // Check if the barcode length is correct and set the barcode state
                    if (barcode.length > 0) {
                        setBarcodeScan(barcode);
                    }
                    barcode = "";
                }

                lastKeyTime = now;
            };

            document.addEventListener("keydown", onKeydown);

            return () => {
                document.removeEventListener("keydown", onKeydown);
            };
        }
    }, [isClient]);

    return (
        <div>
            <h1>Barcode: {barCode}</h1>
        </div>
    );
};

export default BarCodeTest;
