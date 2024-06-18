import Link from "next/link";
import { useState } from "react";
import { Badge, Box, Button, Dialog, Drawer, styled } from "@mui/material";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  KeyboardArrowDown,
  PersonOutline,
  MonetizationOn,
} from "@mui/icons-material";
import clsx from "clsx";
import Image from "components/BazaarImage";
import { FlexBox } from "components/flex-box";
import MiniCart from "components/mini-cart/MiniCart";
import MobileMenu from "components/navbar/MobileMenu";
import CategoryMenu from "components/categories/CategoryMenu";
import GrocerySearchBox from "components/search-box/GrocerySearchBox";
import Category from "components/icons/Category";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import { useAppContext } from "contexts/AppContext";
import Login from "pages-sections/sessions/Login";
import { layoutConstant } from "utils/constants";
import SearchBox from "../search-box/SearchBox";
import { useRouter } from "next/router"; // styled component

export const HeaderWrapper = styled(Box)(({ theme }) => ({
  zIndex: 3,
  position: "relative",
  height: layoutConstant.headerHeight,
  transition: "height 250ms ease-in-out",
  background: "#DD8EB8",
  [theme.breakpoints.down("sm")]: {
    height: layoutConstant.mobileHeaderHeight,
  },
})); // ==============================================================

// ==============================================================
const Header = ({ isFixed, className, searchBoxType = "type1" }) => {
  const theme = useTheme();
  const { state } = useAppContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const downMd = useMediaQuery(theme.breakpoints.down(1150));
  const router = useRouter();
  const handleLink = () => {
    router.push("/goldpage/goldpage");
  };
  const toggleDialog = () => setDialogOpen(!dialogOpen);

  const toggleSidenav = () => setSidenavOpen(!sidenavOpen);

  return (
    <HeaderWrapper className={clsx(className)}>
      <Container
        sx={{
          gap: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FlexBox
          mr={2}
          minWidth="170px"
          alignItems="center"
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <Link href="/">
            <a>
              <Image height={44} src="/assets/images/logo2.svg" alt="logo" />
            </a>
          </Link>

          {isFixed && (
            <CategoryMenu>
              <FlexBox color="grey.600" alignItems="center" ml={2}>
                <Button color="inherit">
                  <Category fontSize="small" color="inherit" />
                  <KeyboardArrowDown fontSize="small" color="inherit" />
                </Button>
              </FlexBox>
            </CategoryMenu>
          )}
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          {searchBoxType === "type1" && <SearchBox />}
          {searchBoxType === "type2" && <GrocerySearchBox />}
        </FlexBox>

        <FlexBox
          alignItems="center"
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <Box
            component={IconButton}
            p={1.25}
            bgcolor="grey.200"
            onClick={handleLink}
            sx={{
              "&:hover": {
                backgroundColor: "#FFFFFF",
              },
            }}
          >
            <MonetizationOn />
          </Box>

          {/*<Box*/}
          {/*    component={IconButton}*/}
          {/*    p={1.25}*/}
          {/*    ml={2.5}*/}
          {/*    bgcolor="grey.200"*/}
          {/*    onClick={toggleDialog}*/}
          {/*    sx={{*/}
          {/*      '&:hover': {*/}
          {/*        backgroundColor: '#FFFFFF',*/}
          {/*      },*/}
          {/*    }}*/}
          {/*>*/}
          {/*  <PersonOutline />*/}
          {/*</Box>*/}

          <Badge badgeContent={state.cart.length} color="primary">
            <Box
              ml={2.5}
              p={1.25}
              bgcolor="grey.200"
              component={IconButton}
              onClick={toggleSidenav}
              sx={{
                "&:hover": {
                  backgroundColor: "#FFFFFF",
                },
              }}
            >
              <ShoppingBagOutlined />
            </Box>
          </Badge>
        </FlexBox>

        <Dialog
          scroll="body"
          open={dialogOpen}
          fullWidth={isMobile}
          onClose={toggleDialog}
        >
          <Login />
        </Dialog>

        <Drawer open={sidenavOpen} anchor="right" onClose={toggleSidenav}>
          <MiniCart toggleSidenav={() => {}} />
        </Drawer>

        {downMd && <MobileMenu />}
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
