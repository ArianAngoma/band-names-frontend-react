import Chart from 'chart.js/auto';
import {useContext, useEffect} from 'react';

/* Importaciones propias */
import {SocketContext} from '../context/SocketContext';

let myChart;

export const BandChart = () => {
    const {socket} = useContext(SocketContext);

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            // console.log(bands);
            createChart(bands);
        });
    }, [socket]);

    const createChart = (bands) => {
        const ctx = document.getElementById('myChart');

        if (myChart) myChart.destroy();

        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: bands.map(band => band.name),
                datasets: [{
                    label: '# of Votes',
                    data: bands.map(band => band.votes),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    xAxes: {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                },
                animation: false
            }
        });
    }

    return (
        <canvas id="myChart"></canvas>
    )
}