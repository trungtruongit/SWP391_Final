import { useState, useEffect } from "react";
import useScanDetection from "use-scan-detection";

const BarCodeTest = () => {
    const [barCode, setBarcodeScan] = useState("No Barcode Scanned");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Ensure the hook is used only after the component has mounted
    useEffect(() => {
        if (isClient) {
            const onComplete = (code) => {
                setBarcodeScan(code);
            };

            const handler = (event) => {
                const barcode = event.key;
                if (barcode.length >= 6) {
                    onComplete(barcode);
                }
            };

            document.addEventListener("keydown", handler);

            return () => {
                document.removeEventListener("keydown", handler);
            };
        }
    }, [isClient]);

    return (
        <div>
            <h1>Barcode:{barCode}</h1>
        </div>
    );
};

export default BarCodeTest;
