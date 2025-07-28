import React, { Fragment } from 'react'
import UserChart from './UserChart'
import { data } from 'react-router-dom';
// import { Gauge } from '@mui/x-charts-pro/Gauge';
import { blue } from '@mui/material/colors';
import PrintChart from './PrintChart';
import ColorScale from './ColorScale';
import StatCards from './StatCards';
import { GaugeCircle } from 'lucide-react';
import { Gauge } from '@mui/x-charts';


function DashbordHomePage() {
    const config = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Pie Chart'
                }
            }
        },
    };
    return (
        <Fragment>
            <div className='flex flex-col gap-10'>
                <StatCards />
                <div className='grid grid-cols-2 gap-2'>
                    <UserChart />
                    <div className=' bg-cyan-200/20 rounded-md flex '>
                        <div>

                            {/* {config} */}

                            <Gauge
                                value={71}
                            // startAngle={0}
                            // endAngle={360}
                            // innerRadius="80%"
                            // outerRadius="100%"
                            // ...
                            />
                        </div>
                        <div>

                            <Gauge
                                value={30}
                                sx={{ color: "blue", }}
                            // startAngle={0}
                            // endAngle={360}
                            // innerRadius="80%"
                            // outerRadius="100%"
                            // ...
                            />
                        </div>
                    </div>
                </div>

                <ColorScale />
            </div>
        </Fragment>
    )
}

export default DashbordHomePage