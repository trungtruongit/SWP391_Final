import SEO from "components/SEO";
import Login from "pages-sections/sessions/Login";
import { FlexRowCenter } from "components/flex-box";
import ShopLayout1 from "components/layouts/ShopLayout1";
import { Box, useTheme } from "@mui/material";
const BarCodePage = () => {
    const theme = useTheme();
    return;
    <ShopLayout1 topbarBgColor={theme.palette.grey[900]}>
        <SEO title="FourGemsShop" />
        <Box bgcolor="#FFFFFF" />
    </ShopLayout1>;
};

export default BarCodePage;
