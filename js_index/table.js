function fn_change() {
    var x = document.getElementById("list-tram").value;
    var array_distance_1day = new Array();
    var array_distance_3day = new Array();
    var array_distance_7day = new Array();
    var array_distance_15day = new Array();

    var array_time_1day = new Array();
    var array_time_3day = new Array();
    var array_time_7day = new Array();
    var array_time_15day = new Array();

    // TRẠM 1----------------------------------------------------------------------------------
    if (x == "tram1") {
        var params_chart1 = {
            TableName: "water_level",
            KeyConditionExpression: "device_id = :a",
            ExpressionAttributeValues: {
                ":a": 1,
            },
        };

        var docClient = new AWS.DynamoDB.DocumentClient();
        // Tọa độ
        // docClient.query(params_map1, function(err, data) {
        //     lat_data = data.Items[data.Items.length - 1].gps_data.Latitude;
        //     lng_data = data.Items[data.Items.length - 1].gps_data.Longitude;
        //     if (lat_data == 0) {
        lat_data = 9.283603
        lng_data = 105.7234
            // }
        toa_do = lat_data + ', ' + lng_data;
        document.getElementById("toa-do").innerHTML = toa_do;
        // });
        docClient.query(params_chart1, function(err, data) {
            // Hiện tại
            hien_tai = JSON.parse(data.Items[data.Items.length - 1].device_data.Distance);

            sample_time_data = JSON.parse(data.Items[data.Items.length - 1].sample_time);
            time_stamp = new Date(sample_time_data);
            min = time_stamp.getMinutes();
            hour = time_stamp.getHours();
            const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            date = time_stamp.getDate();
            month = month_name[time_stamp.getMonth()];
            year = time_stamp.getFullYear();
            if (min < 10) {
                min = '0' + min;
            }
            if (date < 10) {
                date = '0' + date;
            }
            if (month < 10) {
                month = '0' + month;
            }
            time_hien_tai = hour + ":" + min + ', ' + date + "/" + month + "/" + year;

            document.getElementById("hien-tai").innerHTML = hien_tai + " m";
            document.getElementById("time-hien-tai").innerHTML = time_hien_tai;

            // 1 NGÀY-----------------------------------------------------------------------
            for (let i = 0; i < data.Items.length; i++) {
                distance = JSON.parse(data.Items[i].device_data.Distance);
                array_distance_1day.push(distance);
                array_distance_3day.push(distance);
                array_distance_7day.push(distance);
                array_distance_15day.push(distance);

                sample_time_data = JSON.parse(data.Items[i].sample_time);
                time_stamp = new Date(sample_time_data);
                min = time_stamp.getMinutes();
                hour = time_stamp.getHours();
                const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                date = time_stamp.getDate();
                month = month_name[time_stamp.getMonth()];
                year = time_stamp.getFullYear();
                if (min < 10) {
                    min = '0' + min;
                }
                if (date < 10) {
                    date = '0' + date;
                }
                if (month < 10) {
                    month = '0' + month;
                }
                full_time = hour + ":" + min + ', ' + date + "/" + month + "/" + year;
                array_time_1day.push(full_time);
                array_time_3day.push(full_time);
                array_time_7day.push(full_time);
                array_time_15day.push(full_time);


                if (array_distance_1day.length > 145) {
                    array_distance_1day.shift();
                    array_time_1day.shift();
                }

                if (array_distance_3day.length > 433) {
                    array_distance_3day.shift();
                    array_time_3day.shift();
                }

                if (array_distance_7day.length > 1008) {
                    array_distance_7day.shift();
                    array_time_7day.shift();
                }

                if (array_distance_15day.length > 2160) {
                    array_distance_15day.shift();
                    array_time_15day.shift();
                }
            }
            // Lớn nhẩt
            max_1day = 0;
            for (let i = 0; i < array_distance_1day.length; i++) {
                if (array_distance_1day[i] > max_1day) {
                    max_1day = array_distance_1day[i];
                    time_max_1day = array_time_1day[i];
                }
            }
            document.getElementById("max-1day").innerHTML = max_1day + " m";
            document.getElementById("time-max-1day").innerHTML = time_max_1day;

            // Nhỏ nhất
            min_1day = max_1day;
            for (let i = 0; i < array_distance_1day.length; i++) {
                if (array_distance_1day[i] < min_1day) {
                    min_1day = array_distance_1day[i];
                    time_min_1day = array_time_1day[i];
                }
            }
            document.getElementById("min-1day").innerHTML = min_1day + " m";
            document.getElementById("time-min-1day").innerHTML = time_min_1day;

            // Trung bình   
            avg_1day = array_distance_1day = array_distance_1day.reduce((a, b) => a + b, 0) / array_distance_1day.length;
            avg_1day_final = Math.round(avg_1day * 1000) / 1000; // Làm tròn
            document.getElementById("average-1day").innerHTML = avg_1day_final + " m";
            // ------------------------------------------------------------------------------------------

            // 3 NGÀY------------------------------------------------------------------------------------
            // Lớn nhẩt
            max_3day = 0;
            for (let i = 0; i < array_distance_3day.length; i++) {
                if (array_distance_3day[i] > max_3day) {
                    max_3day = array_distance_3day[i];
                    time_max_3day = array_time_3day[i];
                }
            }
            document.getElementById("max-3day").innerHTML = max_3day + " m";
            document.getElementById("time-max-3day").innerHTML = time_max_3day;

            // Nhỏ nhất
            min_3day = max_3day;
            for (let i = 0; i < array_distance_3day.length; i++) {
                if (array_distance_3day[i] < min_3day) {
                    min_3day = array_distance_3day[i];
                    time_min_3day = array_time_3day[i];
                }
            }
            document.getElementById("min-3day").innerHTML = min_3day + " m";
            document.getElementById("time-min-3day").innerHTML = time_min_3day;

            // Trung bình   
            avg_3day = array_distance_3day = array_distance_3day.reduce((a, b) => a + b, 0) / array_distance_3day.length;
            avg_3day_final = Math.round(avg_3day * 1000) / 1000; // Làm tròn
            document.getElementById("average-3day").innerHTML = avg_3day_final + " m";
            // ------------------------------------------------------------------------------------------

            // 7 NGÀY------------------------------------------------------------------------------------
            // Lớn nhẩt
            max_7day = 0;
            for (let i = 0; i < array_distance_7day.length; i++) {
                if (array_distance_7day[i] > max_7day) {
                    max_7day = array_distance_7day[i];
                    time_max_7day = array_time_7day[i];
                }
            }
            document.getElementById("max-7day").innerHTML = max_7day + " m";
            document.getElementById("time-max-7day").innerHTML = time_max_7day;

            // Nhỏ nhất
            min_7day = max_7day;
            for (let i = 0; i < array_distance_7day.length; i++) {
                if (array_distance_7day[i] < min_7day) {
                    min_7day = array_distance_7day[i];
                    time_min_7day = array_time_7day[i];
                }
            }
            document.getElementById("min-7day").innerHTML = min_7day + " m";
            document.getElementById("time-min-7day").innerHTML = time_min_7day;

            // Trung bình   
            avg_7day = array_distance_7day = array_distance_7day.reduce((a, b) => a + b, 0) / array_distance_7day.length;
            avg_7day_final = Math.round(avg_7day * 1000) / 1000; // Làm tròn
            document.getElementById("average-7day").innerHTML = avg_7day_final + " m";
            // ------------------------------------------------------------------------------------------


            // 15 NGÀY------------------------------------------------------------------------------------
            // Lớn nhẩt
            max_15day = 0;
            for (let i = 0; i < array_distance_15day.length; i++) {
                if (array_distance_15day[i] > max_15day) {
                    max_15day = array_distance_15day[i];
                    time_max_15day = array_time_15day[i];
                }
            }
            document.getElementById("max-15day").innerHTML = max_15day + " m";
            document.getElementById("time-max-15day").innerHTML = time_max_15day;

            // Nhỏ nhất
            min_15day = max_15day;
            for (let i = 0; i < array_distance_15day.length; i++) {
                if (array_distance_15day[i] < min_15day) {
                    min_15day = array_distance_15day[i];
                    time_min_15day = array_time_15day[i];
                }
            }
            document.getElementById("min-15day").innerHTML = min_15day + " m";
            document.getElementById("time-min-15day").innerHTML = time_min_15day;

            // Trung bình   
            avg_15day = array_distance_15day = array_distance_15day.reduce((a, b) => a + b, 0) / array_distance_15day.length;
            avg_15day_final = Math.round(avg_15day * 1000) / 1000; // Làm tròn
            document.getElementById("average-15day").innerHTML = avg_15day_final + " m";
        });
        // ----------------------------------------------------------------------------------------


        // TRẠM 2----------------------------------------------------------------------------------
    } else if (x == "tram2") {
        var params_chart2 = {
            TableName: "water_level",
            KeyConditionExpression: "device_id = :a",
            ExpressionAttributeValues: {
                ":a": 2,
            },
        };


        var docClient = new AWS.DynamoDB.DocumentClient();
        // Tọa độ
        // docClient.query(params_map2, function(err, data) {
        //     lat_data = data.Items[data.Items.length - 1].gps_data.Latitude;
        //     lng_data = data.Items[data.Items.length - 1].gps_data.Longitude;
        //     if (lat_data == 0) {
        lat_data = 9.283539
        lng_data = 105.717714
            // }
        toa_do = lat_data + ', ' + lng_data;
        document.getElementById("toa-do").innerHTML = toa_do;
        // });

        docClient.query(params_chart2, function(err, data) {
            // Hiện tại
            hien_tai = JSON.parse(data.Items[data.Items.length - 1].device_data.Distance);

            sample_time_data = JSON.parse(data.Items[data.Items.length - 1].sample_time);
            time_stamp = new Date(sample_time_data);
            min = time_stamp.getMinutes();
            hour = time_stamp.getHours();
            const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            date = time_stamp.getDate();
            month = month_name[time_stamp.getMonth()];
            year = time_stamp.getFullYear();
            if (min < 10) {
                min = '0' + min;
            }
            if (date < 10) {
                date = '0' + date;
            }
            if (month < 10) {
                month = '0' + month;
            }
            time_hien_tai = hour + ":" + min + ', ' + date + "/" + month + "/" + year;

            document.getElementById("hien-tai").innerHTML = hien_tai + " m";
            document.getElementById("time-hien-tai").innerHTML = time_hien_tai;


            // 1 NGÀY-----------------------------------------------------------------------
            for (let i = 0; i < data.Items.length; i++) {
                distance = JSON.parse(data.Items[i].device_data.Distance);
                array_distance_1day.push(distance);
                array_distance_3day.push(distance);
                array_distance_7day.push(distance);
                array_distance_15day.push(distance);

                sample_time_data = JSON.parse(data.Items[i].sample_time);
                time_stamp = new Date(sample_time_data);
                min = time_stamp.getMinutes();
                hour = time_stamp.getHours();
                const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                date = time_stamp.getDate();
                month = month_name[time_stamp.getMonth()];
                year = time_stamp.getFullYear();
                if (min < 10) {
                    min = '0' + min;
                }
                if (date < 10) {
                    date = '0' + date;
                }
                if (month < 10) {
                    month = '0' + month;
                }
                full_time = hour + ":" + min + ', ' + date + "/" + month + "/" + year;
                array_time_1day.push(full_time);
                array_time_3day.push(full_time);
                array_time_7day.push(full_time);
                array_time_15day.push(full_time);


                if (array_distance_1day.length > 145) {
                    array_distance_1day.shift();
                    array_time_1day.shift();
                }

                if (array_distance_3day.length > 433) {
                    array_distance_3day.shift();
                    array_time_3day.shift();
                }

                if (array_distance_7day.length > 1008) {
                    array_distance_7day.shift();
                    array_time_7day.shift();
                }

                if (array_distance_15day.length > 2160) {
                    array_distance_15day.shift();
                    array_time_15day.shift();
                }
            }
            // Lớn nhẩt
            max_1day = 0;
            for (let i = 0; i < array_distance_1day.length; i++) {
                if (array_distance_1day[i] > max_1day) {
                    max_1day = array_distance_1day[i];
                    time_max_1day = array_time_1day[i];
                }
            }
            document.getElementById("max-1day").innerHTML = max_1day + " m";
            document.getElementById("time-max-1day").innerHTML = time_max_1day;

            // Nhỏ nhất
            min_1day = max_1day;
            for (let i = 0; i < array_distance_1day.length; i++) {
                if (array_distance_1day[i] < min_1day) {
                    min_1day = array_distance_1day[i];
                    time_min_1day = array_time_1day[i];
                }
            }
            document.getElementById("min-1day").innerHTML = min_1day + " m";
            document.getElementById("time-min-1day").innerHTML = time_min_1day;

            // Trung bình   
            avg_1day = array_distance_1day = array_distance_1day.reduce((a, b) => a + b, 0) / array_distance_1day.length;
            avg_1day_final = Math.round(avg_1day * 1000) / 1000; // Làm tròn
            document.getElementById("average-1day").innerHTML = avg_1day_final + " m";
            // ------------------------------------------------------------------------------------------

            // 3 NGÀY------------------------------------------------------------------------------------
            // Lớn nhẩt
            max_3day = 0;
            for (let i = 0; i < array_distance_3day.length; i++) {
                if (array_distance_3day[i] > max_3day) {
                    max_3day = array_distance_3day[i];
                    time_max_3day = array_time_3day[i];
                }
            }
            document.getElementById("max-3day").innerHTML = max_3day + " m";
            document.getElementById("time-max-3day").innerHTML = time_max_3day;

            // Nhỏ nhất
            min_3day = max_3day;
            for (let i = 0; i < array_distance_3day.length; i++) {
                if (array_distance_3day[i] < min_3day) {
                    min_3day = array_distance_3day[i];
                    time_min_3day = array_time_3day[i];
                }
            }
            document.getElementById("min-3day").innerHTML = min_3day + " m";
            document.getElementById("time-min-3day").innerHTML = time_min_3day;

            // Trung bình   
            avg_3day = array_distance_3day = array_distance_3day.reduce((a, b) => a + b, 0) / array_distance_3day.length;
            avg_3day_final = Math.round(avg_3day * 1000) / 1000; // Làm tròn
            document.getElementById("average-3day").innerHTML = avg_3day_final + " m";
            // ------------------------------------------------------------------------------------------

            // 7 NGÀY------------------------------------------------------------------------------------
            // Lớn nhẩt
            max_7day = 0;
            for (let i = 0; i < array_distance_7day.length; i++) {
                if (array_distance_7day[i] > max_7day) {
                    max_7day = array_distance_7day[i];
                    time_max_7day = array_time_7day[i];
                }
            }
            document.getElementById("max-7day").innerHTML = max_7day + " m";
            document.getElementById("time-max-7day").innerHTML = time_max_7day;

            // Nhỏ nhất
            min_7day = max_7day;
            for (let i = 0; i < array_distance_7day.length; i++) {
                if (array_distance_7day[i] < min_7day) {
                    min_7day = array_distance_7day[i];
                    time_min_7day = array_time_7day[i];
                }
            }
            document.getElementById("min-7day").innerHTML = min_7day + " m";
            document.getElementById("time-min-7day").innerHTML = time_min_7day;

            // Trung bình   
            avg_7day = array_distance_7day = array_distance_7day.reduce((a, b) => a + b, 0) / array_distance_7day.length;
            avg_7day_final = Math.round(avg_7day * 1000) / 1000; // Làm tròn
            document.getElementById("average-7day").innerHTML = avg_7day_final + " m";
            // ------------------------------------------------------------------------------------------


            // 15 NGÀY------------------------------------------------------------------------------------
            // Lớn nhẩt
            max_15day = 0;
            for (let i = 0; i < array_distance_15day.length; i++) {
                if (array_distance_15day[i] > max_15day) {
                    max_15day = array_distance_15day[i];
                    time_max_15day = array_time_15day[i];
                }
            }
            document.getElementById("max-15day").innerHTML = max_15day + " m";
            document.getElementById("time-max-15day").innerHTML = time_max_15day;

            // Nhỏ nhất
            min_15day = max_15day;
            for (let i = 0; i < array_distance_15day.length; i++) {
                if (array_distance_15day[i] < min_15day) {
                    min_15day = array_distance_15day[i];
                    time_min_15day = array_time_15day[i];
                }
            }
            document.getElementById("min-15day").innerHTML = min_15day + " m";
            document.getElementById("time-min-15day").innerHTML = time_min_15day;

            // Trung bình   
            avg_15day = array_distance_15day = array_distance_15day.reduce((a, b) => a + b, 0) / array_distance_15day.length;
            avg_15day_final = Math.round(avg_15day * 1000) / 1000; // Làm tròn
            document.getElementById("average-15day").innerHTML = avg_15day_final + " m";
        });
        // ----------------------------------------------------------------------------------------


        //TRẠM 3------------------------------------------------------------------------------------
    } else if (x == "tram3") {
        var params_chart3 = {
            TableName: "water_level",
            KeyConditionExpression: "device_id = :a",
            ExpressionAttributeValues: {
                ":a": 3,
            },
        };

        var docClient = new AWS.DynamoDB.DocumentClient();
        // Tọa độ
        // docClient.query(params_map3, function(err, data) {
        //     lat_data = data.Items[data.Items.length - 1].gps_data.Latitude;
        //     lng_data = data.Items[data.Items.length - 1].gps_data.Longitude;
        //     if (lat_data == 0) {
        lat_data = 9.278525
        lng_data = 105.72178
            // }
        toa_do = lat_data + ', ' + lng_data;
        document.getElementById("toa-do").innerHTML = toa_do;
        // });

        docClient.query(params_chart3, function(err, data) {
                // Hiện tại
                hien_tai = JSON.parse(data.Items[data.Items.length - 1].device_data.Distance);

                sample_time_data = JSON.parse(data.Items[data.Items.length - 1].sample_time);
                time_stamp = new Date(sample_time_data);
                min = time_stamp.getMinutes();
                hour = time_stamp.getHours();
                const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                date = time_stamp.getDate();
                month = month_name[time_stamp.getMonth()];
                year = time_stamp.getFullYear();
                if (min < 10) {
                    min = '0' + min;
                }
                if (date < 10) {
                    date = '0' + date;
                }
                if (month < 10) {
                    month = '0' + month;
                }
                time_hien_tai = hour + ":" + min + ', ' + date + "/" + month + "/" + year;

                document.getElementById("hien-tai").innerHTML = hien_tai + " m";
                document.getElementById("time-hien-tai").innerHTML = time_hien_tai;


                // 1 NGÀY-----------------------------------------------------------------------
                for (let i = 0; i < data.Items.length; i++) {
                    distance = JSON.parse(data.Items[i].device_data.Distance);
                    array_distance_1day.push(distance);
                    array_distance_3day.push(distance);
                    array_distance_7day.push(distance);
                    array_distance_15day.push(distance);

                    sample_time_data = JSON.parse(data.Items[i].sample_time);
                    time_stamp = new Date(sample_time_data);
                    min = time_stamp.getMinutes();
                    hour = time_stamp.getHours();
                    const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                    date = time_stamp.getDate();
                    month = month_name[time_stamp.getMonth()];
                    year = time_stamp.getFullYear();
                    if (min < 10) {
                        min = '0' + min;
                    }
                    if (date < 10) {
                        date = '0' + date;
                    }
                    if (month < 10) {
                        month = '0' + month;
                    }
                    full_time = hour + ":" + min + ', ' + date + "/" + month + "/" + year;
                    array_time_1day.push(full_time);
                    array_time_3day.push(full_time);
                    array_time_7day.push(full_time);
                    array_time_15day.push(full_time);


                    if (array_distance_1day.length > 145) {
                        array_distance_1day.shift();
                        array_time_1day.shift();
                    }

                    if (array_distance_3day.length > 433) {
                        array_distance_3day.shift();
                        array_time_3day.shift();
                    }

                    if (array_distance_7day.length > 1008) {
                        array_distance_7day.shift();
                        array_time_7day.shift();
                    }

                    if (array_distance_15day.length > 2160) {
                        array_distance_15day.shift();
                        array_time_15day.shift();
                    }
                }
                // Lớn nhẩt
                max_1day = 0;
                for (let i = 0; i < array_distance_1day.length; i++) {
                    if (array_distance_1day[i] > max_1day) {
                        max_1day = array_distance_1day[i];
                        time_max_1day = array_time_1day[i];
                    }
                }
                document.getElementById("max-1day").innerHTML = max_1day + " m";
                document.getElementById("time-max-1day").innerHTML = time_max_1day;

                // Nhỏ nhất
                min_1day = max_1day;
                for (let i = 0; i < array_distance_1day.length; i++) {
                    if (array_distance_1day[i] < min_1day) {
                        min_1day = array_distance_1day[i];
                        time_min_1day = array_time_1day[i];
                    }
                }
                document.getElementById("min-1day").innerHTML = min_1day + " m";
                document.getElementById("time-min-1day").innerHTML = time_min_1day;

                // Trung bình   
                avg_1day = array_distance_1day = array_distance_1day.reduce((a, b) => a + b, 0) / array_distance_1day.length;
                avg_1day_final = Math.round(avg_1day * 1000) / 1000; // Làm tròn
                document.getElementById("average-1day").innerHTML = avg_1day_final + " m";
                // ------------------------------------------------------------------------------------------

                // 3 NGÀY------------------------------------------------------------------------------------
                // Lớn nhẩt
                max_3day = 0;
                for (let i = 0; i < array_distance_3day.length; i++) {
                    if (array_distance_3day[i] > max_3day) {
                        max_3day = array_distance_3day[i];
                        time_max_3day = array_time_3day[i];
                    }
                }
                document.getElementById("max-3day").innerHTML = max_3day + " m";
                document.getElementById("time-max-3day").innerHTML = time_max_3day;

                // Nhỏ nhất
                min_3day = max_3day;
                for (let i = 0; i < array_distance_3day.length; i++) {
                    if (array_distance_3day[i] < min_3day) {
                        min_3day = array_distance_3day[i];
                        time_min_3day = array_time_3day[i];
                    }
                }
                document.getElementById("min-3day").innerHTML = min_3day + " m";
                document.getElementById("time-min-3day").innerHTML = time_min_3day;

                // Trung bình   
                avg_3day = array_distance_3day = array_distance_3day.reduce((a, b) => a + b, 0) / array_distance_3day.length;
                avg_3day_final = Math.round(avg_3day * 1000) / 1000; // Làm tròn
                document.getElementById("average-3day").innerHTML = avg_3day_final + " m";
                // ------------------------------------------------------------------------------------------

                // 7 NGÀY------------------------------------------------------------------------------------
                // Lớn nhẩt
                max_7day = 0;
                for (let i = 0; i < array_distance_7day.length; i++) {
                    if (array_distance_7day[i] > max_7day) {
                        max_7day = array_distance_7day[i];
                        time_max_7day = array_time_7day[i];
                    }
                }
                document.getElementById("max-7day").innerHTML = max_7day + " m";
                document.getElementById("time-max-7day").innerHTML = time_max_7day;

                // Nhỏ nhất
                min_7day = max_7day;
                for (let i = 0; i < array_distance_7day.length; i++) {
                    if (array_distance_7day[i] < min_7day) {
                        min_7day = array_distance_7day[i];
                        time_min_7day = array_time_7day[i];
                    }
                }
                document.getElementById("min-7day").innerHTML = min_7day + " m";
                document.getElementById("time-min-7day").innerHTML = time_min_7day;

                // Trung bình   
                avg_7day = array_distance_7day = array_distance_7day.reduce((a, b) => a + b, 0) / array_distance_7day.length;
                avg_7day_final = Math.round(avg_7day * 1000) / 1000; // Làm tròn
                document.getElementById("average-7day").innerHTML = avg_7day_final + " m";
                // ------------------------------------------------------------------------------------------


                // 15 NGÀY------------------------------------------------------------------------------------
                // Lớn nhẩt
                max_15day = 0;
                for (let i = 0; i < array_distance_15day.length; i++) {
                    if (array_distance_15day[i] > max_15day) {
                        max_15day = array_distance_15day[i];
                        time_max_15day = array_time_15day[i];
                    }
                }
                document.getElementById("max-15day").innerHTML = max_15day + " m";
                document.getElementById("time-max-15day").innerHTML = time_max_15day;

                // Nhỏ nhất
                min_15day = max_15day;
                for (let i = 0; i < array_distance_15day.length; i++) {
                    if (array_distance_15day[i] < min_15day) {
                        min_15day = array_distance_15day[i];
                        time_min_15day = array_time_15day[i];
                    }
                }
                document.getElementById("min-15day").innerHTML = min_15day + " m";
                document.getElementById("time-min-15day").innerHTML = time_min_15day;

                // Trung bình   
                avg_15day = array_distance_15day = array_distance_15day.reduce((a, b) => a + b, 0) / array_distance_15day.length;
                avg_15day_final = Math.round(avg_15day * 1000) / 1000; // Làm tròn
                document.getElementById("average-15day").innerHTML = avg_15day_final + " m";
            })
            // ----------------------------------------------------------------------------------------
    }
}
setTimeout(fn_change, 1000);