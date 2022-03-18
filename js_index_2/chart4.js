var myChart;
var array_line_alert = new Array();

//Live
var array_distance_live_1 = new Array();
var array_time_live = new Array();
var array_avg_live_1 = new Array();
var array_avg_live_1_0 = new Array();

var array_distance_live_2 = new Array();
var array_avg_live_2 = new Array();
var array_avg_live_2_0 = new Array();

var array_distance_live_3 = new Array();
var array_avg_live_3 = new Array();
var array_avg_live_3_0 = new Array();

//1 ngày
var array_distance_1ngay_1 = new Array();
var array_time_1ngay = new Array();
var array_avg_1ngay_1 = new Array();
var array_avg_1ngay_1_0 = new Array();

var array_distance_1ngay_2 = new Array();
var array_avg_1ngay_2 = new Array();
var array_avg_1ngay_2_0 = new Array();

var array_distance_1ngay_3 = new Array();
var array_avg_1ngay_3 = new Array();
var array_avg_1ngay_3_0 = new Array();

//3 ngày
var array_distance_3ngay_1 = new Array();
var array_time_3ngay = new Array();
var array_avg_3ngay_1 = new Array();
var array_avg_3ngay_1_0 = new Array();

var array_distance_3ngay_2 = new Array();
var array_avg_3ngay_2 = new Array();
var array_avg_3ngay_2_0 = new Array();

var array_distance_3ngay_3 = new Array();
var array_avg_3ngay_3 = new Array();
var array_avg_3ngay_3_0 = new Array();

//7 ngày
var array_distance_7ngay_1 = new Array();
var array_time_7ngay = new Array();
var array_avg_7ngay_1 = new Array();
var array_avg_7ngay_1_0 = new Array();

var array_distance_7ngay_2 = new Array();
var array_avg_7ngay_2 = new Array();
var array_avg_7ngay_2_0 = new Array();

var array_distance_7ngay_3 = new Array();
var array_avg_7ngay_3 = new Array();
var array_avg_7ngay_3_0 = new Array();

//15 ngày
var array_distance_15ngay_1 = new Array();
var array_time_15ngay = new Array();
var array_avg_15ngay_1 = new Array();
var array_avg_15ngay_1_0 = new Array();

var array_distance_15ngay_2 = new Array();
var array_avg_15ngay_2 = new Array();
var array_avg_15ngay_2_0 = new Array();

var array_distance_15ngay_3 = new Array();
var array_avg_15ngay_3 = new Array();
var array_avg_15ngay_3_0 = new Array();

//Filter
var array_time_filter = new Array();
var array_date_filter = new Array();

var array_distance_filter_1 = new Array();
var array_avg_filter_1 = new Array();
var array_avg_filter_1_0 = new Array();

var array_distance_filter_2 = new Array();
var array_avg_filter_2 = new Array();
var array_avg_filter_2_0 = new Array();

var array_distance_filter_3 = new Array();
var array_avg_filter_3 = new Array();
var array_avg_filter_3_0 = new Array();

//Tham chiếu
var array_thamchieu_1 = new Array();
var array_distance_1 = new Array();

var array_thamchieu_2 = new Array();
var array_distance_2 = new Array();

var array_thamchieu_3 = new Array();
var array_distance_3 = new Array();

var params_chart1_4 = {
    TableName: "water_level",
    KeyConditionExpression: "device_id = :a",
    ExpressionAttributeValues: {
        ":a": 1,
    },
};
var params_chart2_4 = {
    TableName: "water_level",
    KeyConditionExpression: "device_id = :a",
    ExpressionAttributeValues: {
        ":a": 2,
    },
};
var params_chart3_4 = {
    TableName: "water_level",
    KeyConditionExpression: "device_id = :a",
    ExpressionAttributeValues: {
        ":a": 3,
    },
};

var docClient = new AWS.DynamoDB.DocumentClient();
// Trạm 1----------------------------------------------------------------------------------------------------
docClient.query(params_chart1_4, function(err, data) {

    for (let i = 0; i < data.Items.length; i++) {
        distance_data_chart1_4 = JSON.parse(data.Items[i].device_data.Distance);
        array_distance_1.push(distance_data_chart1_4);
    }

    // Tham chiếu TB
    array_thamchieu_1 = array_distance_1;
    avg_thamchieu = array_thamchieu_1 = array_thamchieu_1.reduce((a, b) => a + b, 0) / array_thamchieu_1.length;
    avg_thamchieu_final = Math.round(avg_thamchieu * 1000) / 1000; // Làm tròn
    for (let i = 0; i < array_distance_1.length; i++) {
        thamchieu_data = array_distance_1[i] - avg_thamchieu_final;
        thamchieu_data_final = Math.round(thamchieu_data * 1000) / 1000; // Làm tròn
        array_distance_live_1.push(thamchieu_data_final);
        array_distance_1ngay_1.push(thamchieu_data_final);
        array_distance_3ngay_1.push(thamchieu_data_final);
        array_distance_7ngay_1.push(thamchieu_data_final);
        array_distance_15ngay_1.push(thamchieu_data_final);
        array_distance_filter_1.push(thamchieu_data_final);

        if (array_distance_live_1.length > 145) {
            array_distance_live_1.shift();
        }
        if (array_distance_1ngay_1.length > 145) {
            array_distance_1ngay_1.shift();
        }
        if (array_distance_3ngay_1.length > 433) {
            array_distance_3ngay_1.shift();
        }
        if (array_distance_7ngay_1.length > 1009) {
            array_distance_7ngay_1.shift();
        }
        if (array_distance_15ngay_1.length > 2161) {
            array_distance_15ngay_1.shift();
        }
        alert_data = 0.2;
        array_line_alert.push(alert_data);
    }

    // AVERGAGE
    for (let i = 0; i < array_distance_live_1.length; i++) {
        avg_data_chart1_1 = array_distance_live_1[i];
        array_avg_live_1_0.push(avg_data_chart1_1);

        avg_live_1 = array_avg_live_1_0.reduce((a, b) => a + b, 0) / array_avg_live_1_0.length;
        avg_live_1_final = Math.round(avg_live_1 * 1000) / 1000; // Làm tròn
        array_avg_live_1.push(avg_live_1_final);
    }

    for (let i = 0; i < array_distance_1ngay_1.length; i++) {
        avg_data_chart1_1 = array_distance_1ngay_1[i];
        array_avg_1ngay_1_0.push(avg_data_chart1_1);

        avg_1ngay_1 = array_avg_1ngay_1_0.reduce((a, b) => a + b, 0) / array_avg_1ngay_1_0.length;
        avg_1ngay_1_final = Math.round(avg_1ngay_1 * 1000) / 1000; // Làm tròn
        array_avg_1ngay_1.push(avg_1ngay_1_final);
    }

    for (let i = 0; i < array_distance_3ngay_1.length; i++) {
        avg_data_chart1_3 = array_distance_3ngay_1[i];
        array_avg_3ngay_1_0.push(avg_data_chart1_3);

        avg_3ngay_1 = array_avg_3ngay_1_0.reduce((a, b) => a + b, 0) / array_avg_3ngay_1_0.length;
        avg_3ngay_1_final = Math.round(avg_3ngay_1 * 1000) / 1000; // Làm tròn
        array_avg_3ngay_1.push(avg_3ngay_1_final);
    }

    for (let i = 0; i < array_distance_7ngay_1.length; i++) {
        avg_data_chart1_7 = array_distance_7ngay_1[i];
        array_avg_7ngay_1_0.push(avg_data_chart1_7);

        avg_7ngay_1 = array_avg_7ngay_1_0.reduce((a, b) => a + b, 0) / array_avg_7ngay_1_0.length;
        avg_7ngay_1_final = Math.round(avg_7ngay_1 * 1000) / 1000; // Làm tròn
        array_avg_7ngay_1.push(avg_7ngay_1_final);
    }

    for (let i = 0; i < array_distance_15ngay_1.length; i++) {
        avg_data_chart1_15 = array_distance_15ngay_1[i];
        array_avg_15ngay_1_0.push(avg_data_chart1_15);

        avg_15ngay_1 = array_avg_15ngay_1_0.reduce((a, b) => a + b, 0) / array_avg_15ngay_1_0.length;
        avg_15ngay_1_final = Math.round(avg_15ngay_1 * 1000) / 1000; // Làm tròn
        array_avg_15ngay_1.push(avg_15ngay_1_final);
    }
    // -----------------------------------------------------------------------------

    for (let i = 0; i < data.Items.length; i++) {
        sample_time_data_chart4 = JSON.parse(data.Items[i].sample_time);
        const time_stamp_chart4 = new Date(sample_time_data_chart4);
        min_chart4 = time_stamp_chart4.getMinutes();
        hour_chart4 = time_stamp_chart4.getHours();

        const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        date = time_stamp_chart4.getDate();
        month = month_name[time_stamp_chart4.getMonth()];
        year = time_stamp_chart4.getFullYear();

        if (min_chart4 < 10) {
            min_chart4 = '0' + min_chart4;
        }
        if (date < 10) {
            date = '0' + date;
        }
        if (month < 10) {
            month = '0' + month;
        }
        full_time_chart4 = hour_chart4 + ":" + min_chart4 + ' ' + date + "/" + month;
        date_filter = year + '-' + month + '-' + date;
        array_date_filter.push(date_filter)

        array_time_live.push(full_time_chart4);
        array_time_filter.push(time_stamp_chart4);
        array_time_1ngay.push(time_stamp_chart4);
        array_time_3ngay.push(time_stamp_chart4);
        array_time_7ngay.push(time_stamp_chart4);
        array_time_15ngay.push(time_stamp_chart4);

        if (array_time_live.length > 145) {
            array_time_live.shift();
        }
        if (array_time_1ngay.length > 145) {
            array_time_1ngay.shift();
        }
        if (array_time_3ngay.length > 433) {
            array_time_3ngay.shift();
        }
        if (array_time_7ngay.length > 1009) {
            array_time_7ngay.shift();
        }
        if (array_time_15ngay.length > 2160) {
            array_time_15ngay.shift();
        }
    }
    min_filter = array_date_filter[0];

    document.getElementById('start').value = date_filter;
    document.getElementById('start').min = min_filter;
    document.getElementById('start').max = date_filter;

    document.getElementById('end').max = date_filter;
    document.getElementById('end').min = min_filter;
    document.getElementById('end').value = date_filter;

    //Moblie
    document.getElementById('start_m').value = date_filter;
    document.getElementById('start_m').min = min_filter;
    document.getElementById('start_m').max = date_filter;

    document.getElementById('end_m').max = date_filter;
    document.getElementById('end_m').min = min_filter;
    document.getElementById('end_m').value = date_filter;
});
//---------------------------------------------------------------------------------------------------------


// Trạm 2--------------------------------------------------------------------------------------------------
docClient.query(params_chart2_4, function(err, data) {
    for (let i = 0; i < data.Items.length; i++) {
        distance_data_chart2_4 = JSON.parse(data.Items[i].device_data.Distance);
        array_distance_2.push(distance_data_chart2_4);
    }

    // Tham chiếu TB
    array_thamchieu_2 = array_distance_2;
    avg_thamchieu = array_thamchieu_2 = array_thamchieu_2.reduce((a, b) => a + b, 0) / array_thamchieu_2.length;
    avg_thamchieu_final = Math.round(avg_thamchieu * 1000) / 1000; // Làm tròn
    for (let i = 0; i < array_distance_2.length; i++) {
        thamchieu_data = array_distance_2[i] - avg_thamchieu_final;
        thamchieu_data_final = Math.round(thamchieu_data * 1000) / 1000; // Làm tròn
        array_distance_live_2.push(thamchieu_data_final);
        array_distance_1ngay_2.push(thamchieu_data_final);
        array_distance_3ngay_2.push(thamchieu_data_final);
        array_distance_7ngay_2.push(thamchieu_data_final);
        array_distance_15ngay_2.push(thamchieu_data_final);
        array_distance_filter_2.push(thamchieu_data_final);

        if (array_distance_live_2.length > 145) {
            array_distance_live_2.shift();
        }
        if (array_distance_1ngay_2.length > 145) {
            array_distance_1ngay_2.shift();
        }
        if (array_distance_3ngay_2.length > 433) {
            array_distance_3ngay_2.shift();
        }
        if (array_distance_7ngay_2.length > 1009) {
            array_distance_7ngay_2.shift();
        }
        if (array_distance_15ngay_2.length > 2161) {
            array_distance_15ngay_2.shift();
        }
    }
    // AVERGAGE
    for (let i = 0; i < array_distance_live_2.length; i++) {
        avg_data_chart2_1 = array_distance_live_2[i];
        array_avg_live_2_0.push(avg_data_chart2_1);

        avg_live_2 = array_avg_live_2_0.reduce((a, b) => a + b, 0) / array_avg_live_2_0.length;
        avg_live_2_final = Math.round(avg_live_2 * 1000) / 1000; // Làm tròn
        array_avg_live_2.push(avg_live_2_final);
    }

    for (let i = 0; i < array_distance_1ngay_2.length; i++) {
        avg_data_chart2_1 = array_distance_1ngay_2[i];
        array_avg_1ngay_2_0.push(avg_data_chart2_1);

        avg_1ngay_2 = array_avg_1ngay_2_0.reduce((a, b) => a + b, 0) / array_avg_1ngay_2_0.length;
        avg_1ngay_2_final = Math.round(avg_1ngay_2 * 1000) / 1000; // Làm tròn
        array_avg_1ngay_2.push(avg_1ngay_2_final);
    }

    for (let i = 0; i < array_distance_3ngay_2.length; i++) {
        avg_data_chart2_3 = array_distance_3ngay_2[i];
        array_avg_3ngay_2_0.push(avg_data_chart2_3);

        avg_3ngay_2 = array_avg_3ngay_2_0.reduce((a, b) => a + b, 0) / array_avg_3ngay_2_0.length;
        avg_3ngay_2_final = Math.round(avg_3ngay_2 * 1000) / 1000; // Làm tròn
        array_avg_3ngay_2.push(avg_3ngay_2_final);
    }

    for (let i = 0; i < array_distance_7ngay_2.length; i++) {
        avg_data_chart2_7 = array_distance_7ngay_2[i];
        array_avg_7ngay_2_0.push(avg_data_chart2_7);

        avg_7ngay_2 = array_avg_7ngay_2_0.reduce((a, b) => a + b, 0) / array_avg_7ngay_2_0.length;
        avg_7ngay_2_final = Math.round(avg_7ngay_2 * 1000) / 1000; // Làm tròn
        array_avg_7ngay_2.push(avg_7ngay_2_final);
    }

    for (let i = 0; i < array_distance_15ngay_2.length; i++) {
        avg_data_chart2_15 = array_distance_15ngay_2[i];
        array_avg_15ngay_2_0.push(avg_data_chart2_15);

        avg_15ngay_2 = array_avg_15ngay_2_0.reduce((a, b) => a + b, 0) / array_avg_15ngay_2_0.length;
        avg_15ngay_2_final = Math.round(avg_15ngay_2 * 1000) / 1000; // Làm tròn
        array_avg_15ngay_2.push(avg_15ngay_2_final);
    }
});
//---------------------------------------------------------------------------------------------------------


// Trạm 3--------------------------------------------------------------------------------------------------
docClient.query(params_chart3_4, function(err, data) {
    for (let i = 0; i < data.Items.length; i++) {
        distance_data_chart3_4 = JSON.parse(data.Items[i].device_data.Distance);
        array_distance_3.push(distance_data_chart3_4);
    }

    // Tham chiếu TB
    array_thamchieu_3 = array_distance_3;
    avg_thamchieu = array_thamchieu_3 = array_thamchieu_3.reduce((a, b) => a + b, 0) / array_thamchieu_3.length;
    avg_thamchieu_final = Math.round(avg_thamchieu * 1000) / 1000; // Làm tròn
    for (let i = 0; i < array_distance_3.length; i++) {
        thamchieu_data = array_distance_3[i] - avg_thamchieu_final;
        thamchieu_data_final = Math.round(thamchieu_data * 1000) / 1000; // Làm tròn
        array_distance_live_3.push(thamchieu_data_final);
        array_distance_1ngay_3.push(thamchieu_data_final);
        array_distance_3ngay_3.push(thamchieu_data_final);
        array_distance_7ngay_3.push(thamchieu_data_final);
        array_distance_15ngay_3.push(thamchieu_data_final);
        array_distance_filter_3.push(thamchieu_data_final);

        if (array_distance_live_3.length > 145) {
            array_distance_live_3.shift();
        }
        if (array_distance_1ngay_3.length > 145) {
            array_distance_1ngay_3.shift();
        }
        if (array_distance_3ngay_3.length > 433) {
            array_distance_3ngay_3.shift();
        }
        if (array_distance_7ngay_3.length > 1009) {
            array_distance_7ngay_3.shift();
        }
        if (array_distance_15ngay_3.length > 2161) {
            array_distance_15ngay_3.shift();
        }
    }
    // AVERGAGE
    for (let i = 0; i < array_distance_live_3.length; i++) {
        avg_data_chart3_1 = array_distance_live_3[i];
        array_avg_live_3_0.push(avg_data_chart3_1);

        avg_live_3 = array_avg_live_3_0.reduce((a, b) => a + b, 0) / array_avg_live_3_0.length;
        avg_live_3_final = Math.round(avg_live_3 * 1000) / 1000; // Làm tròn
        array_avg_live_3.push(avg_live_3_final);
    }

    for (let i = 0; i < array_distance_1ngay_3.length; i++) {
        avg_data_chart3_1 = array_distance_1ngay_3[i];
        array_avg_1ngay_3_0.push(avg_data_chart3_1);

        avg_1ngay_3 = array_avg_1ngay_3_0.reduce((a, b) => a + b, 0) / array_avg_1ngay_3_0.length;
        avg_1ngay_3_final = Math.round(avg_1ngay_3 * 1000) / 1000; // Làm tròn
        array_avg_1ngay_3.push(avg_1ngay_3_final);
    }

    for (let i = 0; i < array_distance_3ngay_3.length; i++) {
        avg_data_chart3_3 = array_distance_3ngay_3[i];
        array_avg_3ngay_3_0.push(avg_data_chart3_3);

        avg_3ngay_3 = array_avg_3ngay_3_0.reduce((a, b) => a + b, 0) / array_avg_3ngay_3_0.length;
        avg_3ngay_3_final = Math.round(avg_3ngay_3 * 1000) / 1000; // Làm tròn
        array_avg_3ngay_3.push(avg_3ngay_3_final);
    }

    for (let i = 0; i < array_distance_7ngay_3.length; i++) {
        avg_data_chart3_7 = array_distance_7ngay_3[i];
        array_avg_7ngay_3_0.push(avg_data_chart3_7);

        avg_7ngay_3 = array_avg_7ngay_3_0.reduce((a, b) => a + b, 0) / array_avg_7ngay_3_0.length;
        avg_7ngay_3_final = Math.round(avg_7ngay_3 * 1000) / 1000; // Làm tròn
        array_avg_7ngay_3.push(avg_7ngay_3_final);
    }

    for (let i = 0; i < array_distance_15ngay_3.length; i++) {
        avg_data_chart3_15 = array_distance_15ngay_3[i];
        array_avg_15ngay_3_0.push(avg_data_chart3_15);

        avg_15ngay_3 = array_avg_15ngay_3_0.reduce((a, b) => a + b, 0) / array_avg_15ngay_3_0.length;
        avg_15ngay_3_final = Math.round(avg_15ngay_3 * 1000) / 1000; // Làm tròn
        array_avg_15ngay_3.push(avg_15ngay_3_final);
    }
});
//----------------------------------------------------------------------------------------------------------

function showChart() {
    live_x = array_time_live;
    x_length_4 = array_time_live.length;
    const x_labels_4 = live_x.map(label => label.split(' '));

    var bgColor = {
        id: 'bgColor',
        beforeDraw: (chart, options) => {
            const {
                ctx,
                width,
                height
            } = chart;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, width, height)
            ctx.restore();
        },
    }

    const window_width = window.innerWidth;
    if (window_width < 740) {
        var number_Ratio = 1.2
        var display_value = false
        var position_value = 'bottom'
    } else if (window_width >= 740 && window_width < 1024) {
        var number_Ratio = 2.5
        var display_value = true
        var position_value = 'right'
    } else {
        var number_Ratio = 3.16
        var display_value = true
        var position_value = 'right'
    }

    const ctx = document.getElementById("chart-4").getContext("2d");
    myChart = new Chart(ctx, {
        data: {
            labels: x_labels_4,
            datasets: [{ //0
                    type: "line",
                    label: "Trạm 1",
                    data: array_distance_live_1,
                    backgroundColor: "red",
                    borderColor: "red",
                    borderWidth: 3,
                    cubicInterpolationMode: 'monotone',
                    pointStyle: 'rect',
                    hoverRadius: 8,
                    pointRadius: 0
                },
                { //1
                    type: "line",
                    label: "Trạm 2",
                    data: array_distance_live_2,
                    backgroundColor: "blue",
                    borderColor: "blue",
                    borderWidth: 3,
                    cubicInterpolationMode: 'monotone',
                    pointStyle: 'rect',
                    hoverRadius: 8,
                    pointRadius: 0
                },
                { //2
                    type: "line",
                    label: "Trạm 3",
                    data: array_distance_live_3,
                    backgroundColor: "green",
                    borderColor: "green",
                    borderWidth: 3,
                    cubicInterpolationMode: 'monotone',
                    pointStyle: 'rect',
                    hoverRadius: 8,
                    pointRadius: 0
                },
                { //3
                    type: "line",
                    label: "TB Trạm 1",
                    data: array_avg_live_1,
                    backgroundColor: 'white',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 3,
                    borderDash: [10, 8.3],
                    // hidden: true,
                    cubicInterpolationMode: 'monotone',
                    pointRadius: 0, // xóa dot
                    pointStyle: 'rect',
                    hoverRadius: 8,
                },
                { //4
                    type: "line",
                    label: "TB Trạm 2",
                    data: array_avg_live_2,
                    backgroundColor: 'white',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 3,
                    borderDash: [10, 8.3],
                    // hidden: true,
                    cubicInterpolationMode: 'monotone',
                    pointRadius: 0, // xóa dot
                    pointStyle: 'rect',
                    hoverRadius: 8,
                },
                { //5
                    type: "line",
                    label: "TB Trạm 3",
                    data: array_avg_live_3,
                    backgroundColor: 'white',
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 3,
                    borderDash: [10, 8.3],
                    // hidden: true,
                    cubicInterpolationMode: 'monotone',
                    pointRadius: 0, // xóa dot
                    pointStyle: 'rect',
                    hoverRadius: 8,
                }, { //6
                    type: "line",
                    label: "Alert",
                    data: array_line_alert,
                    backgroundColor: 'rgb(255, 159, 64)',
                    borderColor: 'rgb(255, 159, 64)',
                    borderWidth: 1,
                    pointRadius: 0, // xóa dot
                    pointStyle: 'none',
                    hoverRadius: 0,
                }
            ],
        },
        options: {
            aspectRatio: number_Ratio,
            responsive: true,

            scales: {
                x: {
                    min: x_length_4 - 37,
                    max: x_length_4,
                    ticks: {
                        color: 'black'
                    },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: display_value,
                        text: 'Độ cao (m)',
                        font: {
                            // family: 'Times',
                            size: 17,
                            weight: 'bold',
                        },
                        color: 'black'
                    },
                    ticks: {
                        color: 'black'
                    },
                },
            },
            onHover: (event, chartElement) => {
                event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
            },
            plugins: {
                legend: {
                    position: position_value,
                    labels: {
                        padding: 15,
                        font: {
                            size: 14,
                        },
                        color: 'black',
                        boxWidth: 50,
                        boxHeight: 1.5
                    },
                },
                tooltip: {
                    filter: (tooltipItem) => {
                        if (tooltipItem.datasetIndex !== 6) {
                            return tooltipItem
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
        },
        plugins: [bgColor]
    });
}
// Hiển thị biểu đồ
function toggleData(value) {
    const showValue = myChart.isDatasetVisible(value);
    if (showValue === true) {
        myChart.hide(value);
    }
    if (showValue === false) {
        myChart.show(value);
    }
};

function nextData(start, end) {
    x_length_4 = array_time_live.length;
    const startScale = myChart.options.scales.x.min + start;
    const endScale = myChart.options.scales.x.max + end;

    // possition by defaut if
    myChart.options.scales.x.min = startScale;
    myChart.options.scales.x.max = endScale;
    document.getElementById('previous').disabled = false;
    document.getElementById('next').disabled = false;

    if (endScale > x_length_4) {
        myChart.options.scales.x.min = x_length_4 - 37;
        myChart.options.scales.x.max = x_length_4 - 1;
        document.getElementById('next').disabled = true;
    };

    if (startScale < 0) {
        myChart.options.scales.x.min = 0;
        myChart.options.scales.x.max = 36;
        document.getElementById('previous').disabled = true;
    };
    myChart.update();
}
setTimeout(showChart, 1000);

// RESET CHART
function resetData() {
    x_length_4 = array_time_live.length;
    live_x = array_time_live;
    const x_labels_4 = live_x.map(label => label.split(' '));
    var x_scale_live = {
        min: x_length_4 - 37,
        max: x_length_4,
        ticks: {
            color: 'black'
        },
    };
    myChart.data.datasets[0].data = array_distance_live_1;
    myChart.data.datasets[1].data = array_distance_live_2;
    myChart.data.datasets[2].data = array_distance_live_3;
    myChart.data.datasets[3].data = array_avg_live_1;
    myChart.data.datasets[4].data = array_avg_live_2;
    myChart.data.datasets[5].data = array_avg_live_3;
    myChart.data.labels = x_labels_4;
    myChart.options.scales.x = x_scale_live
    myChart.update();

    document.getElementById('next').disabled = false;
    document.getElementById('previous').disabled = false;

    document.getElementById('change_chart').value = 'live'
};

// Change chart
change_chart.addEventListener('change', change_data);

function change_data() {
    live_x = array_time_live;
    live_x_length = array_time_live.length;
    const x_labels_4 = live_x.map(label => label.split(' '));

    var x_scale_live = {
        min: live_x_length - 37,
        max: live_x_length,
        ticks: {
            color: 'black'
        },
    };

    var x_scale_hour = {
        type: 'time',
        time: {
            unit: 'hour',
            stepSize: 2
        },
        ticks: {
            color: 'black'
        },
    };

    var x_scale_day = {
        type: 'time',
        time: {
            unit: 'day',
        },
        ticks: {
            color: 'black'
        },
    };

    const change_value = document.getElementById('change_chart').value;
    if (change_value == 'live') {
        myChart.data.datasets[0].data = array_distance_live_1;
        myChart.data.datasets[1].data = array_distance_live_2;
        myChart.data.datasets[2].data = array_distance_live_3;
        myChart.data.datasets[3].data = array_avg_live_1;
        myChart.data.datasets[4].data = array_avg_live_2;
        myChart.data.datasets[5].data = array_avg_live_3;
        myChart.data.labels = x_labels_4;
        myChart.options.scales.x = x_scale_live;

        document.getElementById('next').disabled = false;
        document.getElementById('previous').disabled = false;
    }
    if (change_value == '1-ngay') {
        myChart.data.datasets[0].data = array_distance_1ngay_1;
        myChart.data.datasets[1].data = array_distance_1ngay_2;
        myChart.data.datasets[2].data = array_distance_1ngay_3;
        myChart.data.datasets[3].data = array_avg_1ngay_1;
        myChart.data.datasets[4].data = array_avg_1ngay_2;
        myChart.data.datasets[5].data = array_avg_1ngay_3;
        myChart.data.labels = array_time_1ngay;
        myChart.options.scales.x = x_scale_hour;

        document.getElementById('next').disabled = true;
        document.getElementById('previous').disabled = true;
    }
    if (change_value == '3-ngay') {
        myChart.data.datasets[0].data = array_distance_3ngay_1;
        myChart.data.datasets[1].data = array_distance_3ngay_2;
        myChart.data.datasets[2].data = array_distance_3ngay_3;
        myChart.data.datasets[3].data = array_avg_3ngay_1;
        myChart.data.datasets[4].data = array_avg_3ngay_2;
        myChart.data.datasets[5].data = array_avg_3ngay_3;
        myChart.data.labels = array_time_3ngay;
        myChart.options.scales.x = x_scale_day;

        document.getElementById('next').disabled = true;
        document.getElementById('previous').disabled = true;
    }
    if (change_value == '7-ngay') {
        myChart.data.datasets[0].data = array_distance_7ngay_1;
        myChart.data.datasets[1].data = array_distance_7ngay_2;
        myChart.data.datasets[2].data = array_distance_7ngay_3;
        myChart.data.datasets[3].data = array_avg_7ngay_1;
        myChart.data.datasets[4].data = array_avg_7ngay_2;
        myChart.data.datasets[5].data = array_avg_7ngay_3;
        myChart.data.labels = array_time_7ngay;
        myChart.options.scales.x = x_scale_day;

        document.getElementById('next').disabled = true;
        document.getElementById('previous').disabled = true;
    }
    if (change_value == '15-ngay') {
        myChart.data.datasets[0].data = array_distance_15ngay_1;
        myChart.data.datasets[1].data = array_distance_15ngay_2;
        myChart.data.datasets[2].data = array_distance_15ngay_3;
        myChart.data.datasets[3].data = array_avg_15ngay_1;
        myChart.data.datasets[4].data = array_avg_15ngay_2;
        myChart.data.datasets[5].data = array_avg_15ngay_3;
        myChart.data.labels = array_time_15ngay;
        myChart.options.scales.x = x_scale_day;

        document.getElementById('next').disabled = true;
        document.getElementById('previous').disabled = true;
    }
    myChart.update();
}

//Fillter date
function filterDate() {
    document.getElementById('next').disabled = true;
    document.getElementById('previous').disabled = true;

    const data_filter_1 = array_distance_filter_1;
    const data_filter_2 = array_distance_filter_2;
    const data_filter_3 = array_distance_filter_3;
    var x_scale_filter_day = {
        type: 'time',
        time: {
            unit: 'day',
        },
        ticks: {
            color: 'black'
        },
    };
    var x_scale_filter_hour = {
        type: 'time',
        time: {
            unit: 'hour',
            stepSize: 2
        },
        ticks: {
            color: 'black'
        },
    };

    const start1 = new Date(document.getElementById('start').value);
    const start = start1.setHours(0, 0, 0, 0);
    const end1 = new Date(document.getElementById('end').value);
    const end = end1.setHours(23, 59, 59, 999);

    const filterDates = array_time_filter.filter(date => date >= start && date <= end)

    myChart.data.labels = filterDates;


    //working on the data
    const startArray = array_time_filter.indexOf(filterDates[0])
    const endArray = array_time_filter.indexOf(filterDates[filterDates.length - 1])
    const time_start = array_time_filter[startArray].getDate();
    const time_end = array_time_filter[endArray].getDate();

    //Chart 1
    const copydatafilter_1 = [...data_filter_1]
    copydatafilter_1.splice(endArray + 1, filterDates.length);
    copydatafilter_1.splice(0, startArray);
    //Chart 2
    const copydatafilter_2 = [...data_filter_2]
    copydatafilter_2.splice(endArray + 1, filterDates.length);
    copydatafilter_2.splice(0, startArray);
    // Chart 3
    const copydatafilter_3 = [...data_filter_3]
    copydatafilter_3.splice(endArray + 1, filterDates.length);
    copydatafilter_3.splice(0, startArray);

    for (let i = 0; i < copydatafilter_1.length; i++) {
        avg_data_1_0 = copydatafilter_1[i];
        array_avg_filter_1_0.push(avg_data_1_0);

        avg_filter_1 = array_avg_filter_1_0.reduce((a, b) => a + b, 0) / array_avg_filter_1_0.length;
        avg_filter_final_1 = Math.round(avg_filter_1 * 1000) / 1000; // Làm tròn
        array_avg_filter_1.push(avg_filter_final_1);
    }
    for (let i = 0; i < copydatafilter_2.length; i++) {
        avg_data_2_0 = copydatafilter_2[i];
        array_avg_filter_2_0.push(avg_data_2_0);

        avg_filter_2 = array_avg_filter_2_0.reduce((a, b) => a + b, 0) / array_avg_filter_2_0.length;
        avg_filter_final_2 = Math.round(avg_filter_2 * 1000) / 1000; // Làm tròn
        array_avg_filter_2.push(avg_filter_final_2);
    }
    for (let i = 0; i < copydatafilter_3.length; i++) {
        avg_data_3_0 = copydatafilter_3[i];
        array_avg_filter_3_0.push(avg_data_3_0);

        avg_filter_3 = array_avg_filter_3_0.reduce((a, b) => a + b, 0) / array_avg_filter_3_0.length;
        avg_filter_final_3 = Math.round(avg_filter_3 * 1000) / 1000; // Làm tròn
        array_avg_filter_3.push(avg_filter_final_3);
    }

    if (time_end - time_start > 1) {
        myChart.options.scales.x = x_scale_filter_day;
    } else {
        myChart.options.scales.x = x_scale_filter_hour;
    }

    myChart.data.datasets[0].data = copydatafilter_1;
    myChart.data.datasets[1].data = copydatafilter_2;
    myChart.data.datasets[2].data = copydatafilter_3;
    myChart.data.datasets[3].data = array_avg_filter_1;
    myChart.data.datasets[4].data = array_avg_filter_2;
    myChart.data.datasets[5].data = array_avg_filter_3;
    myChart.update();

    length_clear_0 = array_avg_filter_1_0.length;
    length_clear_1 = array_avg_filter_1.length;

    array_avg_filter_1_0.splice(0, length_clear_0)
    array_avg_filter_1.splice(0, length_clear_1)
    array_avg_filter_2_0.splice(0, length_clear_0)
    array_avg_filter_2.splice(0, length_clear_1)
    array_avg_filter_3_0.splice(0, length_clear_0)
    array_avg_filter_3.splice(0, length_clear_1)
}

//Fillter date mobile
function filterDate_mobile() {
    document.getElementById('next').disabled = true;
    document.getElementById('previous').disabled = true;

    const data_filter_1 = array_distance_filter_1;
    const data_filter_2 = array_distance_filter_2;
    const data_filter_3 = array_distance_filter_3;
    var x_scale_filter_day = {
        type: 'time',
        time: {
            unit: 'day',
        },
        ticks: {
            color: 'black'
        },
    };
    var x_scale_filter_hour = {
        type: 'time',
        time: {
            unit: 'hour',
            stepSize: 2
        },
        ticks: {
            color: 'black'
        },
    };

    const start1 = new Date(document.getElementById('start_m').value);
    const start = start1.setHours(0, 0, 0, 0);
    const end1 = new Date(document.getElementById('end_m').value);
    const end = end1.setHours(23, 59, 59, 999);

    const filterDates = array_time_filter.filter(date => date >= start && date <= end)

    myChart.data.labels = filterDates;


    //working on the data
    const startArray = array_time_filter.indexOf(filterDates[0])
    const endArray = array_time_filter.indexOf(filterDates[filterDates.length - 1])
    const time_start = array_time_filter[startArray].getDate();
    const time_end = array_time_filter[endArray].getDate();

    //Chart 1
    const copydatafilter_1 = [...data_filter_1]
    copydatafilter_1.splice(endArray + 1, filterDates.length);
    copydatafilter_1.splice(0, startArray);
    //Chart 2
    const copydatafilter_2 = [...data_filter_2]
    copydatafilter_2.splice(endArray + 1, filterDates.length);
    copydatafilter_2.splice(0, startArray);
    // Chart 3
    const copydatafilter_3 = [...data_filter_3]
    copydatafilter_3.splice(endArray + 1, filterDates.length);
    copydatafilter_3.splice(0, startArray);

    for (let i = 0; i < copydatafilter_1.length; i++) {
        avg_data_1_0 = copydatafilter_1[i];
        array_avg_filter_1_0.push(avg_data_1_0);

        avg_filter_1 = array_avg_filter_1_0.reduce((a, b) => a + b, 0) / array_avg_filter_1_0.length;
        avg_filter_final_1 = Math.round(avg_filter_1 * 1000) / 1000; // Làm tròn
        array_avg_filter_1.push(avg_filter_final_1);
    }
    for (let i = 0; i < copydatafilter_2.length; i++) {
        avg_data_2_0 = copydatafilter_2[i];
        array_avg_filter_2_0.push(avg_data_2_0);

        avg_filter_2 = array_avg_filter_2_0.reduce((a, b) => a + b, 0) / array_avg_filter_2_0.length;
        avg_filter_final_2 = Math.round(avg_filter_2 * 1000) / 1000; // Làm tròn
        array_avg_filter_2.push(avg_filter_final_2);
    }
    for (let i = 0; i < copydatafilter_3.length; i++) {
        avg_data_3_0 = copydatafilter_3[i];
        array_avg_filter_3_0.push(avg_data_3_0);

        avg_filter_3 = array_avg_filter_3_0.reduce((a, b) => a + b, 0) / array_avg_filter_3_0.length;
        avg_filter_final_3 = Math.round(avg_filter_3 * 1000) / 1000; // Làm tròn
        array_avg_filter_3.push(avg_filter_final_3);
    }

    if (time_end - time_start > 1) {
        myChart.options.scales.x = x_scale_filter_day;
    } else {
        myChart.options.scales.x = x_scale_filter_hour;
    }

    myChart.data.datasets[0].data = copydatafilter_1;
    myChart.data.datasets[1].data = copydatafilter_2;
    myChart.data.datasets[2].data = copydatafilter_3;
    myChart.data.datasets[3].data = array_avg_filter_1;
    myChart.data.datasets[4].data = array_avg_filter_2;
    myChart.data.datasets[5].data = array_avg_filter_3;
    myChart.update();

    length_clear_0 = array_avg_filter_1_0.length;
    length_clear_1 = array_avg_filter_1.length;

    array_avg_filter_1_0.splice(0, length_clear_0)
    array_avg_filter_1.splice(0, length_clear_1)
    array_avg_filter_2_0.splice(0, length_clear_0)
    array_avg_filter_2.splice(0, length_clear_1)
    array_avg_filter_3_0.splice(0, length_clear_0)
    array_avg_filter_3.splice(0, length_clear_1)
}

// PDF
function downloadPDF() {
    const canvas = document.getElementById('chart-4');
    const canvasImage = canvas.toDataURL('image/jpeg', 1.0);

    let pdf = new jsPDF('landscape');
    pdf.setFontSize(15);
    pdf.addImage(canvasImage, 'JPEG', 5, 40, 280, 90);
    pdf.save('Tong_hop.pdf');
}

// PDF mobile
function downloadPDF_mobile() {
    const canvas = document.getElementById('chart-4');
    const canvasImage = canvas.toDataURL('image/jpeg', 1.0);

    let pdf = new jsPDF('portrait');
    pdf.setFontSize(15);
    pdf.addImage(canvasImage, 'JPEG', 5, 60, 200, 170);
    pdf.save('Tong_hop.pdf');
}