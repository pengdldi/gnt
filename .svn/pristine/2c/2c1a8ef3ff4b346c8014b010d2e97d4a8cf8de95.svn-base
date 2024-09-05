/**
 * Version : 1.0 
 * 파일명: mainMapFunc.js 
 * 작성일자 : 2023-09-10
 * 설명 : mainbaseMap.jsp 작동함수 정의
 */
let szoneUnitLayer;
let waitingLineLayer;
let laneLayer;
let roadLayer;
let snodeLayer;
let hoverStyle;

let coordinate;
let lane_no;
let waiting_line;
let smtl_node_name;

let tmpPopup2 = document.getElementById("popup02");
//let popupNode = document.getElementById("popup");

let waitingX = 932572.4818773593;
let waitingY = 1928079.5570632026;

let overlay;
const srsName5179 = 'EPSG:5179';
const defaultzoom = 18;

function func_showWaitingLineMap() {
	//음영구간도로(통합) 레이어
	waitingLineLayer = new ol.layer.Tile({
		visible: true,
		name : 'szone_waiting',
		source: new ol.source.TileWMS({
			url: geoserverURL,
			params: {
				'FORMAT': 'image/png', 
				'VERSION': '1.1.0',
				tiled: true,
				"LAYERS": 'szone:szone_waiting'
			},
			crossOrigin: 'anonymous'
		})
	});
	//차선 레이어
	laneLayer = new ol.layer.Tile({
		visible: true,
		name : 'lane_link',
		source: new ol.source.TileWMS({
			url: geoserverURL,
			params: {
				'FORMAT': 'image/png', 
				'VERSION': '1.1.0',
				tiled: true,
				"LAYERS": 'szone:lane_link'
			},
			crossOrigin: 'anonymous'
		})
	});
	
	//차로 레이어
	roadLayer = new ol.layer.Tile({
		visible: true,
		name : 'road_link_waiting',
		source: new ol.source.TileWMS({
			url: geoserverURL,
			params: {
				'FORMAT': 'image/png', 
				'VERSION': '1.1.0',
				tiled: true,
				"LAYERS": 'szone:road_link_waiting'
			},
			crossOrigin: 'anonymous'
		})
	});
	
	//교차로 노드
	snodeLayer = new ol.layer.Tile({
		visible: true,
		name : 'szone_cross',
		source: new ol.source.TileWMS({
			url: geoserverURL,
			params: {
				'FORMAT': 'image/png', 
				'VERSION': '1.1.0',
				tiled: true,
				"LAYERS": 'szone:szone_cross'
			},
			crossOrigin: 'anonymous'
		})
	});
	
	mapView = new ol.View({
		projection: srsName5179,
		center: [waitingX, waitingY], //변수로 담아오는 걸로 추후수정
		zoom: defaultzoom,
		maxZoom: 19.5,
		minZoom: 13 //12.8
	});
	
	baseMap = new ol.Map({
		layers: [backgroudLayer,laneLayer,roadLayer,snodeLayer,waitingLineLayer],
		target: 'map',
		view: mapView
	});
	
	hoverStyle = new ol.style.Style({
		stroke: new ol.style.Stroke({
			color: 'rgba(255, 0, 0, 1)', // 빨간색 윤곽선
			width: 5,
		}),
		fill: new ol.style.Fill({
			color: '#eeeeee', // 빨간색 채우기 (투명도 0.1)
		}),
	});
	zoomSlider();
}

/*let lane_no = 0;
let waiting_line = 0;*/
let lane_no_tmp = 0;
let waiting_line_tmp = 0;
let smtl_node_name_tmp = 0;
let popupNode = '';
function func_waitingLineMouseOver(evt) {
let properties = 0;

	baseMap.on('pointermove', function(evt) {
		let zoom = mapView.getZoom();
		if (zoom >= 17.5) {
		coordinate = evt.coordinate;
		const viewResolution = mapView.getResolution();
		const url = waitingLineLayer.getSource().getFeatureInfoUrl(
			coordinate,
			viewResolution,
			srsName5179,
			{'INFO_FORMAT' : 'application/json'}
		);
		if(url) {
			fetch(url).then(response => response.json()).then((result) => {
				const tmp = JSON.parse(JSON.stringify(result));
				if (tmp.features[0] === undefined) {
					if (popupNode != ''){
						popupNode.style.display = 'none';
						resetWaitingPopup();
					}
					lane_no_tmp = 0;
					waiting_line_tmp = 0;
					smtl_node_name_tmp = 0;
					lane_no = 0;
					waiting_line = 0;
					smtl_node_name = 0;
				} else {
					properties = tmp.features[0].properties;
					lane_no_tmp = properties.lane_no;
					waiting_line_tmp = properties.waiting_line;
					smtl_node_name_tmp = properties.smtl_node_name;
				}
			});
		}
		if (lane_no_tmp == 0) {} 
		else {
			if ( lane_no_tmp == lane_no && waiting_line_tmp == waiting_line && smtl_node_name_tmp == smtl_node_name ) {} 
			else {
				resetWaitingPopup();
				lane_no = properties.lane_no;
				waiting_line = properties.waiting_line;
				smtl_node_name = properties.smtl_node_name;
				drawWaitingPopup();
			}
		}
			evt.preventDefault();
		}
	});
}

function resetWaitingPopup() {
	let overlays = baseMap.getOverlays().getArray();
	overlays.forEach(function(overlay) {
		baseMap.removeOverlay(overlay);
	});
	if (popupNode != ''){
		popupNode.remove();
	}
}

function drawWaitingPopup() {
	popupNode = tmpPopup2.cloneNode(true);
	popupNode.id = "popup2";
	tmpPopup2.after(popupNode);
	
	const laneno = popupNode.querySelector("#lane_no");
	const waitline = popupNode.querySelector("#waiting_line");
	popupNode.querySelector("#road_name").innerHTML = smtl_node_name;
	
	let waitlineTd = '';
	
	waitlineTd += '<th>'+waiting_line+'(m)</th>';
	
	laneno.innerHTML = lane_no + '차로';
	waitline.insertAdjacentHTML('afterend',waitlineTd);
	
	overlay = new ol.Overlay({
		element: popupNode,
		autoPan: {
			animation: {
				duration: 400,
			},
		},
	})
	
	popupNode.style.display = 'block';
	overlay.setPosition(coordinate);
	baseMap.addOverlay(overlay);
}

function func_ajaxGetInfo(URL_NUM) {
		$.ajax({
		url: func_createUrl(URL_NUM),
		type: "POST",
		async: false,
		contentType: "application/json",
		data : func_createParmater(URL_NUM),
		success: function (result) {
			
		},
		error: function (request, status, error) {
			console.log(status);
			console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
		}
	});
}

function func_createUrl(URL_NUM){
	const url = arrUrlList[URL_NUM];
	return url;
}

function func_createParmater(URL_NUM){
	var obj = {};
	
	obj = {
		'timelevel': hour
	};
	return JSON.stringify(obj);
}

function executeAtNextHour() {
  let now = new Date();
  let nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0); // 다음 정각 계산

  let timeToNextHour = nextHour - now; // 현재 시간과 다음 정각까지의 시간 간격 (밀리초)
  
  setTimeout(function() {
	const source1 = snodeLayer.getSource();
	source1.updateParams({'time': Date.now()});
	const source2 = waitingLineLayer.getSource();
	source2.updateParams({'time': Date.now()});
    
    // 정각마다 반복 실행하도록 다시 설정
    executeAtNextHour();
  }, timeToNextHour);
}
