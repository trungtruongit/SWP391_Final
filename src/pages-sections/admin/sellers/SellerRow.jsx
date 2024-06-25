import { useRouter } from 'next/router';
import { RemoveRedEye } from '@mui/icons-material';
import { StyledIconButton, StyledTableCell, StyledTableRow } from '../StyledComponents';

const SellerRow = ({user}) => {
    const { fullName, username, email, roleName, revenue } = user;
    const router = useRouter();

    const handleRowClick = () => {
        router.push(`/admin/sellers/SellerInfo?email=${encodeURIComponent(email)}`);
    };

    return (
        <StyledTableRow tabIndex={-1} role="checkbox" onClick={handleRowClick}>
            <StyledTableCell align="left">{fullName}</StyledTableCell>
            <StyledTableCell align="left">{username}</StyledTableCell>
            <StyledTableCell align="left">{email}</StyledTableCell>
            <StyledTableCell align="left">{roleName}</StyledTableCell>
            <StyledTableCell align="left">${revenue.toFixed(2)}</StyledTableCell>
            <StyledTableCell align="center">
                <StyledIconButton>
                    <RemoveRedEye/>
                </StyledIconButton>
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default SellerRow;