import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { ArrowDropUp, ArrowDropDown } from "@mui/icons-material";

const stats = [
    {
        title: "Total active users",
        value: "18,765",
        change: "+2.6%",
        trend: "up",
        color: "success.main",
        chartColor: "#6ae5da",
    },
    {
        title: "Total installed",
        value: "4,876",
        change: "+0.2%",
        trend: "up",
        color: "success.main",
        chartColor: "#00B0FF",
    },
    {
        title: "Total downloads",
        value: "678",
        change: "-0.1%",
        trend: "down",
        color: "error.main",
        chartColor: "#FF3D00",
    },
];

export default function StatCards() {
    return (
        <div className="bg-cyan-200/20 rounded-md">
            <Box
                sx={{
                    // minHeight: "10\\0vh",
                    // background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)", // dark background
                    py: 4,
                    px: 4,
                    borderRadius: 2
                }}
            >
                <Grid container spacing={4} justifyContent="center">
                    {stats.map((stat, index) => (
                        <Grid key={index} item xs={12} sm={6} md={4}>
                            <Box
                                sx={{
                                    p: 3,
                                    borderRadius: 4,
                                    background: "linear-gradient(to top right, #131823, #1c4c5f)", // dark to sky blue
                                    color: "white",
                                    // boxShadow: 3,
                                    width: 350
                                }}
                            >
                                <Typography variant="body2" color="white" gutterBottom>
                                    {stat.title}
                                </Typography>
                                <Typography variant="h4" fontWeight="bold">
                                    {stat.value}
                                </Typography>
                                <Box display="flex" alignItems="center" mt={1}>
                                    {stat.trend === "up" ? (
                                        <ArrowDropUp sx={{ color: stat.color }} />
                                    ) : (
                                        <ArrowDropDown sx={{ color: stat.color }} />
                                    )}
                                    <Typography variant="body2" sx={{ color: stat.color }}>
                                        {stat.change} last 7 days
                                    </Typography>
                                </Box>
                                {/* Placeholder for chart */}
                                <Box
                                    sx={{
                                        height: 30,
                                        // width:100,
                                        mt: 2,
                                        backgroundColor: stat.chartColor,
                                        borderRadius: 1,
                                        opacity: 0.6,
                                    }}
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}
