//Dashboard - Weekly Sales/ Total Orders of the Week
import { Box, Card } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { H1, H3, H6, Paragraph } from "components/Typography"; // =========================================================

// =========================================================
const Card2 = ({ children, title, amount }) => {
  return (
    <Card
      sx={{
        p: 3,
        pr: 1,
        gap: 2,
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
      }}
    >
      <Box flexShrink={0} height="inherit">
        <FlexBox
          flexDirection="column"
          justifyContent="space-between"
          height="inherit"
        >
          <H3 color="grey.600">{title}</H3>

          <Box>
            <H1 mb={2}>{amount}</H1>
            <FlexBox mt={0.3} alignItems="center" color="info.main">
            </FlexBox>
          </Box>
        </FlexBox>
      </Box>

      <Box
        sx={{
          "& > div": {
            minHeight: "0px !important",
          },
        }}
      >
        {children}
      </Box>
    </Card>
  );
};

export default Card2;
