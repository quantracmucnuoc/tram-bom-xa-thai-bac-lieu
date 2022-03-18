var array_distance_chart1 = new Array();
var array_distance_thamchieu_chart1 = new Array();
var array_thamchieu_chart1 = new Array();
var array_time_chart1 = new Array();
var array_time_update = new Array();

AWS.config.update({
    region: "ap-northeast-1",
    endpoint: "http://dynamodb.ap-northeast-1.amazonaws.com",
    accessKeyId: "AKIAXKZISWAEZWPSCIVL",
    secretAccessKey: "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",
});

var params_chart1 = {
    TableName: "water_level",
    KeyConditionExpression: "device_id = :a",
    ExpressionAttributeValues: {
        ":a": 1,
    },
};

var docClient = new AWS.DynamoDB.DocumentClient();
docClient.query(params_chart1, function(err, data) {

    for (let i = 0; i < data.Items.length; i++) {
        distance_data_chart1 = JSON.parse(data.Items[i].device_data.Distance);
        array_distance_chart1.push(distance_data_chart1);
    }

    // Tham chiếu TB
    array_thamchieu_chart1 = array_distance_chart1;
    avg_thamchieu = array_thamchieu_chart1 = array_thamchieu_chart1.reduce((a, b) => a + b, 0) / array_thamchieu_chart1.length;
    avg_thamchieu_final = Math.round(avg_thamchieu * 1000) / 1000; // Làm tròn
    for (let i = 0; i < array_distance_chart1.length; i++) {
        thamchieu_data = array_distance_chart1[i] - avg_thamchieu_final;
        thamchieu_data_final = Math.round(thamchieu_data * 1000) / 1000; // Làm tròn
        array_distance_thamchieu_chart1.push(thamchieu_data_final)
    }

    for (let i = 0; i < data.Items.length; i++) {
        sample_time_data_chart1 = JSON.parse(data.Items[i].sample_time);
        const time_stamp_chart1 = new Date(sample_time_data_chart1);
        min_chart1 = time_stamp_chart1.getMinutes();
        hour_chart1 = time_stamp_chart1.getHours();

        const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        date = time_stamp_chart1.getDate();
        month = month_name[time_stamp_chart1.getMonth()];
        year = time_stamp_chart1.getFullYear();

        if (min_chart1 < 10) {
            min_chart1 = '0' + min_chart1;
        }
        if (date < 10) {
            date = '0' + date;
        }
        if (month < 10) {
            month = '0' + month;
        }

        full_time_update = hour_chart1 + ":" + min_chart1 + ', ' + date + "/" + month + "/" + year;
        time_chart1 = hour_chart1 + ":" + min_chart1;
        array_time_chart1.push(time_chart1);
        array_time_update.push(full_time_update);
    }
    display_time = array_time_update[array_time_update.length - 1];
    document.getElementById("display_time").innerHTML = display_time;

    //Alert message
    var showAlert1 = document.getElementById("alert-1");
    distance_alert1 = array_distance_thamchieu_chart1[array_distance_thamchieu_chart1.length - 1];
    if (distance_alert1 < -0.5) {
        showAlert1.style.display = "block";
    }


    // Biểu đồ
    const x_data_chart1 = array_time_chart1;
    const y_data_chart1 = array_distance_thamchieu_chart1;
    x_length_1 = x_data_chart1.length;

    // Animation
    const totalDuration = 10000;
    const delayBetweenPoints = totalDuration / x_data_chart1.length;
    const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const animation = {
        x: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: NaN, // the point is initially skipped
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.xStarted) {
                    return 0;
                }
                ctx.xStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        },
        y: {
            type: 'number',
            easing: 'linear',
            duration: delayBetweenPoints,
            from: previousY,
            delay(ctx) {
                if (ctx.type !== 'data' || ctx.yStarted) {
                    return 0;
                }
                ctx.yStarted = true;
                return ctx.index * delayBetweenPoints;
            }
        }
    };


    const ctx = document.getElementById("chart-1").getContext("2d");
    const myChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: x_data_chart1,
            datasets: [{
                label: "Trạm 1",
                data: y_data_chart1,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 2.5,
                cubicInterpolationMode: 'monotone',
                pointRadius: 0, // xóa dot
                pointStyle: 'rect',
                hoverRadius: 8,
            }, ],
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                x: {
                    min: x_length_1 - 37,
                    max: x_length_1,
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
            // animation,
        },
    });
});