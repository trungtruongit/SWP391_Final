import { Box, Card, Grid, Avatar, TextField } from "@mui/material";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H5, H6, Paragraph, Span } from "components/Typography";
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import VendorDashboardLayout from "components/layouts/vendor-dashboard";

const SellerInfo = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { email } = router.query;

    useEffect(() => {
        if (email) {
            const fetchUserDetail = async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                try {
                    const response = await fetch(`https://four-gems-api-c21adc436e90.herokuapp.com/user/get-by-email?email=${email}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch user details');
                    }

                    const responseData = await response.json();
                    setUser(responseData.data[0]);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchUserDetail();
        }
    }, [email]);

    if (loading) {
        return <Paragraph>Loading...</Paragraph>;
    }

    if (!user) {
        return <Paragraph>User not found</Paragraph>;
    }

    return (
        <VendorDashboardLayout>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card sx={{ p: 3 }}>
                        <FlexBox alignItems="center" gap={4}>
                            <Paragraph>
                                <Span color="grey.600">User ID:</Span> {user.id}
                            </Paragraph>

                            <Paragraph>
                                <Span color="grey.600">Role:</Span> {user.roleName}
                            </Paragraph>
                        </FlexBox>

                        <Box my={2} gap={2} sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                md: "1fr 1fr",
                                xs: "1fr",
                            },
                        }}>
                            <FlexBox flexShrink={0} gap={1.5} alignItems="center">
                                <Avatar sx={{ height: 64, width: 64, borderRadius: "8px" }}>
                                    <PersonIcon fontSize="large" />
                                </Avatar>

                                <Box>
                                    <H6 mb={1}>{user.fullName}</H6>

                                    <FlexBox alignItems="center" gap={1}>
                                        <Paragraph fontSize={14} color="grey.600">
                                            {user.email}
                                        </Paragraph>
                                    </FlexBox>
                                </Box>
                            </FlexBox>

                            <FlexBetween flexShrink={0}>
                                <Paragraph color="grey.600">
                                    Username: {user.username}
                                </Paragraph>
                            </FlexBetween>
                        </Box>
                    </Card>
                </Grid>

                <Grid item md={6} xs={12}>
                    <Card sx={{ px: 3, py: 4 }}>
                        <TextField
                            fullWidth
                            color="info"
                            variant="outlined"
                            label="Address"
                            value={user.address}
                            sx={{ mb: 4 }}
                        />

                        <TextField
                            fullWidth
                            color="info"
                            variant="outlined"
                            label="Phone Number"
                            value={user.phoneNumber}
                        />
                    </Card>
                </Grid>

                <Grid item md={6} xs={12}>
                    <Card sx={{ px: 3, py: 4 }}>
                        <H5 mt={0} mb={2}>
                            User Summary
                        </H5>

                        <FlexBetween mb={1.5}>
                            <Paragraph color="grey.600">Role ID:</Paragraph>
                            <H6>{user.roleId}</H6>
                        </FlexBetween>

                        <FlexBetween mb={1.5}>
                            <Paragraph color="grey.600">Counter ID:</Paragraph>
                            <H6>{user.counterId}</H6>
                        </FlexBetween>

                        <FlexBetween mb={1.5}>
                            <Paragraph color="grey.600">Revenue:</Paragraph>
                            <H6>${user.revenue.toFixed(2)}</H6>
                        </FlexBetween>
                    </Card>
                </Grid>
            </Grid>
        </VendorDashboardLayout>
    );
};

export default SellerInfo;