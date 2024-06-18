import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import useWindowSize from "hooks/useWindowSize";
import { FlexBetween } from "components/flex-box";
import Carousel from "components/carousel/Carousel";
import NavLink3 from "components/nav-link/NavLink3";
import { H2 } from "components/Typography";
import ProductCard20 from "components/product-cards/ProductCard20";
import { carouselStyled } from "components/carousel/CarouselStyled";

// ======================================================================
const Section4 = ({ products }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);
  useEffect(() => {
    if (width < 426) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 1024) setVisibleSlides(3);
    else if (width < 1200) setVisibleSlides(4);
    else setVisibleSlides(4);
  }, [width]);
  return (
    <Container
      sx={{
        py: 4,
        mt: 2,
      }}
    >
      <FlexBetween mb={3}>
        <H2 fontSize={30}>Deals Of The Day</H2>
        <NavLink3
          fontSize={30}
          text="More Products"
          href="#"
          hoverColor="dark.main"
        />
      </FlexBetween>

      <Carousel
        totalSlides={products.length}
        visibleSlides={visibleSlides}
        sx={carouselStyled}
      >
        {products.map((product) => (
          <ProductCard20 product={product} key={product.id} />
        ))}
      </Carousel>
    </Container>
  );
};

export default Section4;
