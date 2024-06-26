import { Fragment } from "react";
import { Grid, Pagination } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import ProductCard1 from "components/product-cards/ProductCard1";
import { Span } from "components/Typography";

// ========================================================
const ProductCard1List = ({ products }) => {
    return (
        <Fragment>
            <Grid container spacing={3}>
                {products.map((item) => (
                    <Grid item lg={4} sm={6} xs={12} key={item.id}>
                        <ProductCard1
                            id={item.productId}
                            title={item.productName}
                            price={item.price}
                            imgUrl={item.image}
                        />
                    </Grid>
                ))}
            </Grid>

            <FlexBetween flexWrap="wrap" mt={4}>
                <Span color="grey.600">Showing 1-9 of Products</Span>
                <Pagination count={10} variant="outlined" color="primary" />
            </FlexBetween>
        </Fragment>
    );
};

export default ProductCard1List;
