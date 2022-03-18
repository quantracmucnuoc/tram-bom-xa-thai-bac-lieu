var array_distance_chart2 = new Array();
var array_time_chart2 = new Array();

var params_chart2 = {
    TableName: "water_level",
    KeyConditionExpression: "device_id = :a",
    ExpressionAttributeValues: {
        ":a": 2,
    },
};
var docClient = new AWS.DynamoDB.DocumentClient();
docClient.query(params_chart2, function(err, data) {
    if (err) {
        alert("Error !!!");
    } else {
        for (let i = 0; i < data.Items.length; i++) {
            distance_data_chart2 = JSON.parse(data.Items[i].device_data.Distance);
            array_distance_chart2.push(distance_data_chart2);
        }
        for (let i = 0; i < data.Items.length; i++) {
            sample_time_data_chart2 = JSON.parse(data.Items[i].sample_time);
            const time_stamp_chart2 = new Date(sample_time_data_chart2);
            min_chart2 = time_stamp_chart2.getMinutes();
            hour_chart2 = time_stamp_chart2.getHours();
            if (min_chart2 < 10) {
                min_chart2 = '0' + min_chart2;
            }
            time_chart2 = hour_chart2 + ":" + min_chart2;
            array_time_chart2.push(time_chart2);
        }
        //Alert message
        var showAlert2 = document.getElementById("alert-2");
        distance_alert2 = array_distance_chart2[array_distance_chart2.length - 1];
        if (distance_alert2 < 0.6) {
            showAlert2.style.display = "block";
        }

        //Biểu đồ
        const x_data_chart2 = array_time_chart2;
        const y_data_chart2 = array_distance_chart2;
        x_length_2 = x_data_chart2.length;

        const ctx = document.getElementById("chart-2").getContext("2d");
        const myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: x_data_chart2,
                datasets: [{
                    label: "Trạm 2",
                    data: y_data_chart2,
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 2.5,
                    cubicInterpolationMode: 'monotone',
                    pointRadius: 0, // xóa dot
                    pointStyle: 'rect',
                    hoverRadius: 8,
                }],
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    x: {
                        min: x_length_2 - 37,
                        max: x_length_2,
                        ticks: {
                            color: 'black'
                        },
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: 'black'
                        },
                    },
                },
                onHover: (event, chartElement) => {
                    event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
            },
        });
    }
});