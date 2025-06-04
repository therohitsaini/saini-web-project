import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
function UserChart() {
    return (
        <div className=' bg-cyan-200/20 rounded-md'>
            <BarChart
                xAxis={[{ data: ['Admin  A', 'Admin B', 'Admin C'] }]}
                series={[{
                    data: [4, 3, 5],
                    color: "#64E2B7"
                },
                {
                    data: [1, 6, 3],
                    color: "#FFA955"

                },
                {
                    data: [2, 5, 6],
                    color: "red"

                }]}
                height={300}
            />
        </div>
    );
}

export default UserChart