import React, { Fragment } from 'react'
import UserChart from './UserChart'
import { data } from 'react-router-dom';
import { Gauge } from '@mui/x-charts/Gauge';
import { blue } from '@mui/material/colors';


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
        </Fragment>
    )
}

export default DashbordHomePage