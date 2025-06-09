import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { ScatterChartPro } from '@mui/x-charts-pro/ScatterChartPro';

import { BarChartPro } from '@mui/x-charts-pro/BarChartPro';
import { LineChartPro } from '@mui/x-charts-pro/LineChartPro';
import { Heatmap } from '@mui/x-charts-pro/Heatmap';
import { Unstable_FunnelChart as FunnelChart } from '@mui/x-charts-pro/FunnelChart';
import { RadarChartPro } from '@mui/x-charts-pro/RadarChartPro';
import { PieChartPro } from '@mui/x-charts-pro/PieChartPro';

export const heatmapData = [
    [0, 0, 10],
    [0, 1, 20],
    [0, 2, 40],
    [0, 3, 90],
    [0, 4, 70],
    [1, 0, 30],
    [1, 1, 50],
    [1, 2, 10],
    [1, 3, 70],
    [1, 4, 40],
    [2, 0, 50],
    [2, 1, 20],
    [2, 2, 90],
    [2, 3, 20],
    [2, 4, 70],
    [3, 0, 40],
    [3, 1, 50],
    [3, 2, 20],
    [3, 3, 70],
    [3, 4, 90],
];
export const data = [
    {
        id: 'data-0',
        x1: 329.39,
        y1: 443.28,
        y2: 153.9,
    },
    {
        id: 'data-1',
        x1: 96.94,
        y1: 110.5,
        y2: 217.8,
    },
    {
        id: 'data-2',
        x1: 336.35,
        y1: 175.23,
        y2: 286.32,
    },
    {
        id: 'data-3',
        x1: 159.44,
        y1: 195.97,
        y2: 325.12,
    },
    {
        id: 'data-4',
        x1: 188.86,
        y1: 351.77,
        y2: 144.58,
    },
    {
        id: 'data-5',
        x1: 143.86,
        y1: 43.253,
        y2: 146.51,
    },
    {
        id: 'data-6',
        x1: 202.02,
        y1: 376.34,
        y2: 309.69,
    },
    {
        id: 'data-7',
        x1: 384.41,
        y1: 31.514,
        y2: 236.38,
    },
    {
        id: 'data-8',
        x1: 256.76,
        y1: 231.31,
        y2: 440.72,
    },
    {
        id: 'data-9',
        x1: 143.79,
        y1: 108.04,
        y2: 20.29,
    },
    {
        id: 'data-10',
        x1: 103.48,
        y1: 321.77,
        y2: 484.17,
    },
    {
        id: 'data-11',
        x1: 272.39,
        y1: 120.18,
        y2: 54.962,
    },
    {
        id: 'data-12',
        x1: 23.57,
        y1: 366.2,
        y2: 418.5,
    },
    {
        id: 'data-13',
        x1: 219.73,
        y1: 451.45,
        y2: 181.32,
    },
    {
        id: 'data-14',
        x1: 54.99,
        y1: 294.8,
        y2: 440.9,
    },
    {
        id: 'data-15',
        x1: 134.13,
        y1: 121.83,
        y2: 273.52,
    },
    {
        id: 'data-16',
        x1: 12.7,
        y1: 287.7,
        y2: 346.7,
    },
    {
        id: 'data-17',
        x1: 176.51,
        y1: 134.06,
        y2: 74.528,
    },
    {
        id: 'data-18',
        x1: 65.05,
        y1: 104.5,
        y2: 150.9,
    },
    {
        id: 'data-19',
        x1: 162.25,
        y1: 413.07,
        y2: 26.483,
    },
    {
        id: 'data-20',
        x1: 68.88,
        y1: 74.68,
        y2: 333.2,
    },
    {
        id: 'data-21',
        x1: 95.29,
        y1: 360.6,
        y2: 422.0,
    },
    {
        id: 'data-22',
        x1: 390.62,
        y1: 330.72,
        y2: 488.06,
    },
];

const scatterSeries = [
    {
        label: 'Series A',
        data: data.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
    },
    {
        label: 'Series B',
        data: data.map((v) => ({ x: v.x1, y: v.y2, id: v.id })),
    },
];

const series = [
    { label: 'Series A', data: data.map((p) => p.y1) },
    { label: 'Series B', data: data.map((p) => p.y2) },
];

export default function PrintChart() {
    const [chartType, setChartType] = React.useState('scatter');
    const apiRef = React.useRef(undefined);

    const handleChange = (event) => setChartType(event.target.value);

    return (
        <Stack width="100%" sx={{ display: 'block' }}>
            <Stack
                width="100%"
                direction="row"
                gap={2}
                justifyContent="center"
                sx={{ mb: 1 }}
            >
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel id="chart-type-label">Chart Type</InputLabel>
                    <Select
                        labelId="chart-type-label"
                        id="chart-type-select"
                        value={chartType}
                        label="Chart Type"
                        onChange={handleChange}
                    >
                        <MenuItem value="scatter">Scatter</MenuItem>
                        <MenuItem value="line">Line</MenuItem>
                        <MenuItem value="bar">Bar</MenuItem>
                        <MenuItem value="pie">Pie</MenuItem>
                        <MenuItem value="heatmap">Heatmap</MenuItem>
                        <MenuItem value="funnel">Funnel</MenuItem>
                        <MenuItem value="radar">Radar</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={() => apiRef.current.exportAsPrint()} variant="contained">
                    Print
                </Button>
            </Stack>
            <Chart key={chartType} apiRef={apiRef} type={chartType} />
        </Stack>
    );
}

function Chart({ apiRef, type }) {
    switch (type) {
        case 'scatter':
            return <ScatterChartPro apiRef={apiRef} height={300} series={scatterSeries} />;

        case 'line':
            return (
                <LineChartPro
                    apiRef={apiRef}
                    height={300}
                    xAxis={[{ data: data.map((p) => p.x1).toSorted((a, b) => a - b) }]}
                    series={series}
                />
            );

        case 'bar':
            return (
                <BarChartPro
                    apiRef={apiRef}
                    height={300}
                    xAxis={[
                        { data: data.map((p) => Math.round(p.x1)).toSorted((a, b) => a - b) },
                    ]}
                    series={series}
                />
            );

        case 'pie':
            return (
                <PieChartPro
                    apiRef={apiRef}
                    series={[
                        {
                            arcLabel: 'value',
                            data: [
                                { id: 0, value: 10, label: 'series A' },
                                { id: 1, value: 15, label: 'series B' },
                                { id: 2, value: 20, label: 'series C' },
                            ],
                        },
                    ]}
                    height={300}
                    hideLegend={false}
                />
            );

        case 'heatmap':
            return (
                <Heatmap
                    apiRef={apiRef}
                    xAxis={[{ data: [1, 2, 3, 4] }]}
                    yAxis={[{ data: ['A', 'B', 'C', 'D', 'E'] }]}
                    series={[{ data: heatmapData }]}
                    height={300}
                    hideLegend={false}
                />
            );

        case 'funnel':
            return (
                <FunnelChart
                    apiRef={apiRef}
                    width={400}
                    height={300}
                    series={[
                        {
                            data: [
                                { label: 'Visitors', value: 200 },
                                { label: 'Product Page Views', value: 180 },
                                { label: 'Added to Cart', value: 90 },
                                { label: 'Purchased', value: 50 },
                            ],
                        },
                    ]}
                />
            );

        case 'radar':
            return (
                <RadarChartPro
                    apiRef={apiRef}
                    height={300}
                    series={[{ label: 'Lisa', data: [120, 98, 86, 99, 85, 65] }]}
                    radar={{
                        max: 120,
                        metrics: [
                            'Math',
                            'Chinese',
                            'English',
                            'Geography',
                            'Physics',
                            'History',
                        ],
                    }}
                />
            );

        default:
            throw new Error(`Unknown chart type: ${type}`);
    }
}
