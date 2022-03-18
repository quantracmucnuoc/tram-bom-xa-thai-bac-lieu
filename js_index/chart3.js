var array_distance_chart3 = new Array();
var array_time_chart3 = new Array();

var params_chart3 = {
    TableName: "water_level",
    KeyConditionExpression: "device_id = :a",
    ExpressionAttributeValues: {
        ":a": 3,
    },
};
var docClient = new AWS.DynamoDB.DocumentClient();
docClient.query(params_chart3, function(err, data) {
    if (err) {
        alert("Error !!!");
    } else {
        for (let i = 0; i < data.Items.length; i++) {
            distance_data_chart3 = JSON.parse(data.Items[i].device_data.Distance);
            array_distance_chart3.push(distance_data_chart3);
        }
        for (let i = 0; i < data.Items.length; i++) {
            sample_time_data_chart3 = JSON.parse(data.Items[i].sample_time);
            const time_stamp_chart3 = new Date(sample_time_data_chart3);
            min_chart3 = time_stamp_chart3.getMinutes();
            hour_chart3 = time_stamp_chart3.getHours();
            if (min_chart3 < 10) {
                min_chart3 = '0' + min_chart3;
            }
            time_chart3 = hour_chart3 + ":" + min_chart3;
            array_time_chart3.push(time_chart3);
        }
        //Alert message
        var showAlert3 = document.getElementById("alert-3");
        distance_alert3 = array_distance_chart3[array_distance_chart3.length - 1];
        if (distance_alert3 < 0.6) {
            showAlert3.style.display = "block";
        }

        //Biểu đồ
        const x_data_chart3 = array_time_chart3;
        const y_data_chart3 = array_distance_chart3;
        x_length_3 = x_data_chart3.length;

        const ctx = document.getElementById("chart-3").getContext("2d");
        const myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: x_data_chart3,
                datasets: [{
                    label: "Trạm 3",
                    data: y_data_chart3,
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
                        min: x_length_3 - 37,
                        max: x_length_3,
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