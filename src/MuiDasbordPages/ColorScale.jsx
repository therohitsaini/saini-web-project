import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';


const series = [{ data: [-2, -9, 12, 11, 6, -4] }];

export default function ColorScale() {
    const [colorX, setColorX] = React.useState('piecewise');
    const [colorY, setColorY] = React.useState('None');

    return (
        <div className=' bg-cyan-200/20 rounded-md flex p-5 '>
            <Stack direction="column" spacing={1} sx={{ width:"100%"}}>
                <Stack direction="row" spacing={1}>
                    <TextField
                        select
                        size='small'
                        sx={{ minWidth: 200 }}
                        label="x-axis colorMap"
                        value={colorX}
                        onChange={(event) => setColorX(event.target.value)}
                    >
                        <MenuItem value="None">None</MenuItem>
                        <MenuItem value="piecewise">piecewise</MenuItem>
                        <MenuItem value="continuous">continuous</MenuItem>
                        <MenuItem value="ordinal">ordinal</MenuItem>
                    </TextField>
                    <TextField
                        select
                        size='small'
                        sx={{ minWidth: 200 }}
                        label="y-axis colorMap"
                        value={colorY}
                        onChange={(event) => setColorY(event.target.value)}
                    >
                        <MenuItem value="None">None</MenuItem>
                        <MenuItem value="piecewise">piecewise</MenuItem>
                        <MenuItem value="continuous">continuous</MenuItem>
                    </TextField>
                </Stack>

                <BarChart
                   
                    height={300}
                    minWidth={600}
                    grid={{ horizontal: true }}
                    series={series}
                    yAxis={[
                        {
                            colorMap:
                                (colorY === 'continuous' && {
                                    type: 'continuous',
                                    min: -10,
                                    max: 10,
                                    color: ['red', 'green'],
                                }) ||
                                (colorY === 'piecewise' && {
                                    type: 'piecewise',
                                    thresholds: [0],
                                    colors: ['red', 'green'],
                                }) ||
                                undefined,
                        },
                    ]}
                    xAxis={[
                        {
                            data: [
                                new Date(2019, 1, 1),
                                new Date(2020, 1, 1),
                                new Date(2021, 1, 1),
                                new Date(2022, 1, 1),
                                new Date(2023, 1, 1),
                                new Date(2024, 1, 1),
                            ],
                            valueFormatter: (value) => value.getFullYear().toString(),
                            colorMap:
                                (colorX === 'ordinal' && {
                                    type: 'ordinal',
                                    colors: [
                                        '#ccebc5',
                                        '#a8ddb5',
                                        '#7bccc4',
                                        '#4eb3d3',
                                        '#2b8cbe',
                                        '#60a2be',
                                    ],
                                }) ||
                                (colorX === 'continuous' && {
                                    type: 'continuous',
                                    min: new Date(2019, 1, 1),
                                    max: new Date(2024, 1, 1),
                                    color: ['green', 'orange'],
                                }) ||
                                (colorX === 'piecewise' && {
                                    type: 'piecewise',
                                    thresholds: [new Date(2021, 1, 1), new Date(2023, 1, 1)],
                                    colors: ['blue', 'red', 'blue'],
                                }) ||
                                undefined,
                        },
                    ]}
                />

            </Stack>
        </div >
    );
}
