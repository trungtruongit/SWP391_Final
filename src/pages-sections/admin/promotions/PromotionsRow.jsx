import { Delete, Edit } from "@mui/icons-material";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import {
    StyledIconButton,
    StyledTableCell,
    StyledTableRow,
} from "./StyledComponents";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, TextField } from "@mui/material";

const PromotionRow = ({ promotion, onUpdate }) => {
    const { id, description, discount, endDate, productDTOList, startDate } = promotion;
    const router = useRouter();
    const [edit, setEdit] = useState(false);
    const [editedDescription, setEditedDescription] = useState(description);
    const [editedDiscount, setEditedDiscount] = useState(discount);
    const [editedEndDate, setEditedEndDate] = useState(endDate);

    const productIdList = productDTOList.map(product => product.productId);

    let token = "";
    if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("token");
    }

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const formattedStartDate = formatDateTime(startDate);
    const formattedEndDate = formatDateTime(editedEndDate);

    const handleUpdatePromotion = async () => {
        if (editedEndDate === endDate) {
            alert("Please select a new end date.");
            return;
        }
        try {
            const response = await axios.put(
                `https://four-gems-api-c21adc436e90.herokuapp.com/promotions/update`,
                {
                    id: id,
                    description: editedDescription,
                    discount: parseFloat(editedDiscount),
                    endDate: formattedEndDate,
                    // Add other required fields if necessary
                    startDate: formattedStartDate, // Assuming this exists in the original promotion object
                    productIdList: productIdList,
                    removeProductList: []
                },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            setEdit(false);
            onUpdate();
        } catch (error) {
            console.error("Failed to update promotion:", error);
        }
    };

    return (
        <StyledTableRow tabIndex={-1} role="checkbox">
            <StyledTableCell align="left">{id}</StyledTableCell>
            <StyledTableCell align="left">
                {edit ? (
                    <TextField
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    />
                ) : (
                    description
                )}
            </StyledTableCell>
            <StyledTableCell align="left">
                {edit ? (
                    <TextField
                        value={editedDiscount}
                        onChange={(e) => setEditedDiscount(e.target.value)}
                    />
                ) : (
                    discount
                )}
            </StyledTableCell>
            <StyledTableCell align="left">
                {edit ? (
                    <TextField
                        type="date"
                        value={editedEndDate}
                        onChange={(e) => setEditedEndDate(e.target.value)}
                    />
                ) : (
                    endDate
                )}
            </StyledTableCell>
            <StyledTableCell align="center">
                {edit ? (
                    <div>
                        <Button
                            variant="contained"
                            color="info"
                            onClick={handleUpdatePromotion}
                        >
                            Confirm
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => setEdit(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <div>
                        <StyledIconButton onClick={() => setEdit(true)}>
                            <Edit />
                        </StyledIconButton>
                    </div>
                )}
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default PromotionRow;
