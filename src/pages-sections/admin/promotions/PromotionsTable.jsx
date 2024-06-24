import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import PromotionRow from "./PromotionsRow";

const PromotionsTable = () => {
    const [promotions, setPromotions] = useState([]);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await axios.get(
                    "https://four-gems-api-c21adc436e90.herokuapp.com/promotions?startDate=01/12/2022&endDate=01/12/2024&description=Promotion%20For&page=0&size=1&discount&sort=discount&sortType=DESC"
                );
                console.log(response.data)
                setPromotions(response.data);
            } catch (error) {
                console.error("Failed to fetch promotions:", error);
            }
        };

        fetchPromotions();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Promotion ID</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Discount</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {promotions.map((promotion) => (

                        <PromotionRow key={promotion.promotionId} promotion={promotion} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PromotionsTable;
