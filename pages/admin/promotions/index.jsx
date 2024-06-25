import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import PromotionRow from "pages-sections/admin/promotions/PromotionsRow";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const tableHeading = [
    { id: "promotionId", label: "Promotion ID", align: "left" },
    { id: "description", label: "Description", align: "left" },
    { id: "discount", label: "Discount", align: "left" },
    { id: "endDate", label: "End Date", align: "left" },
    { id: "action", label: "Action", align: "center" },
];

PromotionList.getLayout = function getLayout(page) {
    return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};

export default function PromotionList() {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [dataSearch, setDataSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
    const [totalPages, setTotalPages] = useState(0);

    const handleNav = () => {
        router.push("/admin/promotions/create");
    };

    const fetchPromotions = async (pageNumber, pageSize) => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://four-gems-api-c21adc436e90.herokuapp.com/promotions?page=${pageNumber}&size=${pageSize}`,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            return response.data.data;
        } catch (error) {
            console.error("Failed to fetch promotions:", error);
            return [];
        } finally {
            setLoading(false);
        }
    };


    const fetchDataSearch = async () => {
        if (!dataSearch) return;
        try {
            const response = await axios.get(
                `https://four-gems-api-c21adc436e90.herokuapp.com/promotions/search?query=${dataSearch}`,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            setPromotions(response.data.data);
            setTotalPages(1); // Assume search results are on a single page
            setPage(0); // Reset page to 0 when searching
        } catch (error) {
            console.error("Failed to search promotions:", error);
        }
    };

    useEffect(() => {
        const loadPromotions = async () => {
            const currentPageData = await fetchPromotions(page, rowsPerPage);
            setPromotions(currentPageData.content);
            setTotalPages(currentPageData.totalPages);
        };

        loadPromotions();
    }, [page, rowsPerPage]);

    const handleUpdate = async () => {
        const currentPageData = await fetchPromotions(page, rowsPerPage);
        setPromotions(currentPageData.content);
        setTotalPages(currentPageData.totalPages);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage - 1);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page when changing rows per page
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box py={4}>
            <H3 mb={2}>Promotions</H3>

            <SearchArea
                dataSearch={dataSearch}
                setDataSearch={setDataSearch}
                buttonText="Add Promotion"
                handleBtnClick={handleNav}
                searchPlaceholder="Search Promotion..."
            />

            <Card>
                <Scrollbar>
                    <TableContainer sx={{ minWidth: 900 }}>
                        <Table>
                            <TableHeader
                                hideSelectBtn
                                heading={tableHeading}
                            />

                            <TableBody>
                                {promotions.map((promotion) => (
                                    <PromotionRow
                                        promotion={promotion}
                                        key={promotion.id}
                                        onUpdate={handleUpdate}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <Stack alignItems="center" my={4}>
                    <TablePagination
                        onChange={handleChangePage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        count={totalPages} // Total pages based on search or regular fetch
                        page={page + 1}
                        rowsPerPage={rowsPerPage}
                    />
                </Stack>
            </Card>
        </Box>
    );
}
