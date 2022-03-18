var lat_1_data, lng_1_data, lat_2_data, lng_2_data, lat_3_data, lng_3_data;
lat_1_data = 9.290664
lng_1_data = 105.713546

lat_2_data = 9.288121
lng_2_data = 105.729293

lat_3_data = 9.279089
lng_3_data = 105.722414

// var params_map1 = {
//     TableName: "gps_water_level",
//     KeyConditionExpression: "device_id = :a",
//     ExpressionAttributeValues: {
//         ":a": 1,
//     },
// };
// var params_map2 = {
//     TableName: "gps_water_level",
//     KeyConditionExpression: "device_id = :a",
//     ExpressionAttributeValues: {
//         ":a": 2,
//     },
// };
// var params_map3 = {
//     TableName: "gps_water_level",
//     KeyConditionExpression: "device_id = :a",
//     ExpressionAttributeValues: {
//         ":a": 3,
//     },
// };
// var docClient = new AWS.DynamoDB.DocumentClient();
// // Tọa độ 1
// docClient.query(params_map1, function(err, data) {
//     lat_1_data = data.Items[data.Items.length - 1].gps_data.Latitude;
//     lng_1_data = data.Items[data.Items.length - 1].gps_data.Longitude;
//     if (lat_1_data == 0) {
//         lat_1_data = 9.290664
//         lng_1_data = 105.713546
//     }
//     // Tọa độ 2
//     docClient.query(params_map2, function(err, data) {
//         lat_2_data = data.Items[data.Items.length - 1].gps_data.Latitude;
//         lng_2_data = data.Items[data.Items.length - 1].gps_data.Longitude;
//         if (lat_2_data == 0) {
//             lat_2_data = 9.288121
//             lng_2_data = 105.729293
//         }
//         //     // Tọa độ 3
//         docClient.query(params_map3, function(err, data) {
//             lat_3_data = data.Items[data.Items.length - 1].gps_data.Latitude;
//             lng_3_data = data.Items[data.Items.length - 1].gps_data.Longitude;
//             if (lat_3_data == 0) {
//                 lat_3_data = 9.279089
//                 lng_3_data = 105.722414
//             }

initMap();

function initMap() {
    // Thiết lập ban đầu

    const window_width = window.innerWidth;
    if (window_width < 740) {
        var zoom_value = 14;
    } else {
        var zoom_value = 15;
    }
    var options = {
        center: { lat: 9.286103, lng: 105.721894 },
        zoom: zoom_value,
        controls: true,
    };
    var map = new map4d.Map(document.getElementById("map"), options);
    // map.setPOIsEnabled(false); //Tắt địa điểm mặc định
    //Giới hạn vùng di chuyển
    map.setRestrictionBounds(new map4d.LatLngBounds([9.362071, 105.642207, 9.191152, 105.830422]));

    // Bật tắt 3D mode
    // map.enable3dMode(true)

    // Tạo đối tượng marker từ MarkerOption
    var marker1 = new map4d.Marker({
        //Tên marker
        label: new map4d.MarkerLabel({
            text: "Trạm 3",
            color: "0000000",
            fontSize: 20,
        }),
        position: { lat: lat_1_data, lng: lng_1_data },
    });

    var marker2 = new map4d.Marker({
        //Tên marker
        label: new map4d.MarkerLabel({
            text: "Trạm 2",
            color: "0000000",
            fontSize: 20,
        }),
        position: { lat: lat_2_data, lng: lng_2_data },
    });

    var marker3 = new map4d.Marker({
        //Tên marker
        label: new map4d.MarkerLabel({
            text: "Trạm 1",
            color: "0000000",
            fontSize: 20,
        }),
        position: { lat: lat_3_data, lng: lng_3_data },
    });

    // Thêm marker vào bản đồ
    marker1.setMap(map);
    marker2.setMap(map);
    marker3.setMap(map);

    //Lắng nge sự kiện click marker
    // map.addListener("click", function clickMarker() {
    // }, { marker: true });

    //Update value of marker
    /*docClient.query(params_chart1, function(err, data) {
        for (let i = 0; i < data.Items.length; i++) {
            distance_data_chart1 = JSON.parse(data.Items[i].device_data.Distance);
            array_distance_chart1.push(distance_data_chart1);
        }
        //Update value of marker
        let FinalMarker1 = array_distance_chart1[array_distance_chart1.length - 1];
        marker1.setInfoContents("Độ cao hiện tại: " + FinalMarker1 + "m");
        marker1.setMap(map);
    })
    docClient.query(params_chart2, function(err, data) {
        for (let i = 0; i < data.Items.length; i++) {
            distance_data_chart2 = JSON.parse(data.Items[i].device_data.Distance);
            array_distance_chart2.push(distance_data_chart2);
        }
        //Update value of marker
        let FinalMarker2 = array_distance_chart2[array_distance_chart2.length - 1];
        marker2.setInfoContents("Độ cao hiện tại: " + FinalMarker2 + "m");
        marker2.setMap(map);
    })
    docClient.query(params_chart3, function(err, data) {
        for (let i = 0; i < data.Items.length; i++) {
            distance_data_chart3 = JSON.parse(data.Items[i].device_data.Distance);
            array_distance_chart3.push(distance_data_chart3);
        }
        //Update value of marker
        let FinalMarker3 = array_distance_chart3[array_distance_chart3.length - 1];
        marker3.setInfoContents("Độ cao hiện tại: " + FinalMarker3 + "m");
        marker3.setMap(map);
    })*/
};


//         });
//     });
// });