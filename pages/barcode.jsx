import { useState, useEffect } from "react";
import useScanDetection from "use-scan-detection";

const BarCodeTest = () => {
    const [barcodeScan, setBarcodeScan] = useState("No Barcode Scanned");

    useScanDetection({
        onComplete: setBarcodeScan,
        minLength: 6,
    });

    return (
        <div>
            <h1>Barcode:{barcodeScan}</h1>
        </div>
    );
};

export default BarCodeTest;
