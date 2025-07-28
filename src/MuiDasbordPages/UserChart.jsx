// src/MuiDasbordPages/UserChart.jsx
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const UserChart = () => {
    return (
        <div style={{ width: '100%', maxWidth: 600, margin: 'auto', }} className='bg-cyan-200/20'>
            <BarChart
                xAxis={[
                    {
                        id: 'x-axis',         // ✅ Custom ID to match series
                        scaleType: 'band',    // ✅ REQUIRED for bar charts
                        data: ['Jan', 'Feb', 'Mar', 'Apr'],
                    }
                ]}
                series={[
                    {
                        id: 'user-series',    // ✅ Optional custom ID
                        label: 'Users',
                        data: [5, 10, 15, 20],
                        xAxisKey: 'x-axis',   // ✅ REQUIRED if xAxis has custom `id`
                    }
                ]}
                width={500}
                height={300}
            />
        </div>
    );
};

export default UserChart;
