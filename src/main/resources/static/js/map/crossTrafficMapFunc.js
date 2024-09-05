/**
 * Version : 1.0 
 * 파일명: mainMapFunc.js 
 * 작성일자 : 2023-09-10
 * 설명 : mainbaseMap.jsp 작동함수 정의
 */

let nodeLayer;

let lane_no;
let node_id;
let coordinate;

const srsName5179 = 'EPSG:5179';
const defaultzoom = 14;

let traffic_map;
let overlay;

let tmpPopup1 = document.getElementById("popup01");
let tmpPopup2 = document.getElementById("popup02");

let timebar;
let time_range = document.getElementById("time_range");
let timelevel;

function func_showTrafficMap() {
	timebar = document.getElementById("playstop");
	//hour = document.getElementById("hour").value;
	func_ajaxGetInfo(URL_GET_CROSS_NODE_INFO);
	
	//교차로 노드
	nodeLayer = new ol.layer.Tile({
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
		center: [centerX, centerY], //변수로 담아오는 걸로 추후수정
		zoom: defaultzoom,
		maxZoom: 19.5,
		minZoom: 13 //12.8
	});
	
	baseMap = new ol.Map({
		layers: [backgroudLayer,nodeLayer],
		target: 'map',
		view: mapView
	});
	
	zoomSlider();
}

function func_CrossTrafficMapClickEvt(evt) {
	baseMap.on('singleclick', function(evt) {
		coordinate = evt.coordinate;
		const viewResolution = mapView.getResolution();
		const url = nodeLayer.getSource().getFeatureInfoUrl(
			coordinate,
			viewResolution,
			srsName5179,
			{'INFO_FORMAT' : 'application/json'}
		);
		if(url) {
			fetch(url).then(response => response.json()).then((result) => {
				const tmp = JSON.parse(JSON.stringify(result));

				if (tmp.features[0] === undefined) {
				} else {
					const properties = tmp.features[0].properties;
					if (properties.node_id === undefined) {
					} else {
						node_id = properties.node_id;
						func_ajaxGetInfo(URL_CROSS_TRAFFIC_INFO);
					}
				}
			});
			evt.preventDefault();
		}
	});
}
let intervalId;
function func_timeClickEvt(evt, URL_NUM) {
	const target = evt.target.id;
	switch (target) {
		case 'btn_time' : {
			const btn_time = document.getElementById('btn_time');
			if (timebar.value == 'stop') {
				timebar.value = 'play';
				btn_time.classList.remove('ico_play');
				btn_time.classList.add('ico_stop');
				func_setInterver(URL_NUM);
			} else if (timebar.value == 'play') {
				clearInterval(intervalId);
				timebar.value = 'stop';
				btn_time.classList.remove('ico_stop');
				btn_time.classList.add('ico_play');
			}
			break;
		}
		case 'btn_timer' : {
			if (timebar.value == 'play') {
				return false;
			} else {
				if (hour == 23) {
					return false;
				} else {
					hour++;
					crossnodeThreeSeconds(hour,URL_NUM);
				}
			}
			break;
		}
		case 'btn_timel' : {
			if (timebar.value == 'play') {
				return false;
			} else {
				if (hour == 0) {
					return false;
				} else {
					hour--;
					crossnodeThreeSeconds(hour,URL_NUM);					
				}
			}
			break;
		}
	}
}

function func_changeLayer() {
	const source = nodeLayer.getSource();
	source.updateParams({'time': Date.now()});
	
}

function func_setInterver(URL_NUM) {
	intervalId = setInterval(function() {
		hour++;
		crossnodeThreeSeconds(hour,URL_NUM);
	}, 3000);
}

function crossnodeThreeSeconds(var_hour,URL_NUM) {
	if (var_hour > 23) {
		hour = 0;
		time_range.value = 0;
	} else if (var_hour < 0) {
		return false;
	} else {
		time_range.value = (var_hour*4.35).toFixed(2);
	}
	func_ajaxGetInfo(URL_NUM);
	func_changeLayer();
}

function func_ajaxGetInfo(URL_NUM) {
		$.ajax({
		url: func_createUrl(URL_NUM),
		type: "POST",
		async: false,
		contentType: "application/json",
		dataType: func_dataType(URL_NUM),
		data : func_createParmater(URL_NUM),
		success: function (result) {
			func_resultDataParser(result, URL_NUM);
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

function func_dataType(URL_NUM) {
	switch(URL_NUM) {
		case URL_CROSS_TRAFFIC_INFO : {
			return "json"
		}
	}
}

function func_createParmater(URL_NUM){
	var obj = {};
	obj = {
		'node_id' : node_id,
		'timelevel' : hour
	};
	return JSON.stringify(obj);
}

function func_resultDataParser(result, URL_NUM) {
	switch (URL_NUM) {
		case URL_CROSS_TRAFFIC_INFO : {
			const windowWidth = window.innerWidth;
			const windowHeight = window.innerHeight;
			
			const overlayWidth = 1640;
			const overlayHeight = 950;
			
			const posX = (windowWidth-overlayWidth) / 2;
			const posY = (windowHeight-overlayHeight) / 2;
			
			let popupNode = tmpPopup1.cloneNode(true);
			popupNode.id = "popup1";
			tmpPopup1.after(popupNode);
			
			const popupXY = result.popupXY;
			const trafficInfo = result.trafficInfo;
			
			overlay = new ol.Overlay({
				element: popupNode,
				autoPan: {
					animation: {
						duration: 400,
					},
				},
			})
			popupNode.style.display = 'block';
			
			overlay.setPosition(baseMap.getCoordinateFromPixel([posX, posY]));
			baseMap.addOverlay(overlay);
		
			//위성지도 위
			traffic_map = new ngii_wmts.map("crosspMap",{
				mapMode:9,
				projection: srsName5179,
				center: [coordinate[0], coordinate[1]],
				zoom: defaultzoom,
				maxZoom: 19.5,
				minZoom: 11,
			});
			
			let lanenoTh = '';
			let volTd = '';
			let spdTd = '';
			let waitinglineTd = '';
			let turnTd = '';
			
			for (let i=0; i<popupXY.length; i++) {
				let newNode = tmpPopup2.cloneNode(true);
				newNode.id = popupXY[i].cross_node_id;
				newNode.style.display = 'block';
				tmpPopup2.after(newNode);
				
				let positionX = popupXY[i].positionx;
				let positionY = popupXY[i].positiony;
				
				let traffic_overlay = new ol.Overlay({
					position: [positionX, positionY],
					element: newNode,
					autoPan: {
						animation: {
							duration: 400,
						},
					},
				});
				
				//교통량 데이터 넣기
				let newnode_id = newNode.id;
				let laneno = newNode.querySelector("#lane_no");
				let vol = newNode.querySelector("#vol");
				let spd = newNode.querySelector("#spd");
				let waiting_line = newNode.querySelector("#waiting_line");
				let turn = newNode.querySelector("#turn");
				
				for (let i=0; i<trafficInfo.length; i++) {
					lanenoTh = '';
					volTd = '';
					spdTd = '';
					waitinglineTd = '';
					turnTd = '';
					
					if (trafficInfo[i].cross_node_id == newnode_id){
						lanenoTh = "<th>"+trafficInfo[i].lane_no+"차로</th>";
						volTd = "<td>"+trafficInfo[i].vol+"</td>";
						spdTd = "<td>"+trafficInfo[i].spd+"</td>";
						waitinglineTd = "<td>"+trafficInfo[i].waiting_line+"</td>";
						turnTd = "<td>"+trafficInfo[i].turn+"</td>";
						
						laneno.insertAdjacentHTML('afterend',lanenoTh);
						vol.insertAdjacentHTML('afterend',volTd);
						spd.insertAdjacentHTML('afterend',spdTd);
						waiting_line.insertAdjacentHTML('afterend',waitinglineTd);
						turn.insertAdjacentHTML('afterend',turnTd);
					}
				}
				setTimeout(() => traffic_map._getMap().addOverlay(traffic_overlay), 50);
			}
			break;
		}
		case URL_GET_CROSS_NODE_INFO : {
			
		}
	}
}

function func_resetPopup(evt) {
	
	const target = evt.target;
	const target_id = evt.target.id;
	let parentNode = target.parentNode;

	let flag = true;
	switch (target_id) {
		case '' : {
			if (overlay === undefined) {}
			else if ( overlay != undefined ) {
				while (parentNode) {
					if (parentNode.id === "popup1") {
						flag = false;
						break;
					}
					parentNode = parentNode.parentNode;
				}
				
				if (flag) {
					let basemap_oberlays = baseMap.getOverlays().getArray();
					basemap_oberlays.forEach(function(overlay) {
						baseMap.removeOverlay(overlay);
					});
					let infomap_oberlays = traffic_map._getMap().getOverlays().getArray();
					infomap_oberlays.forEach(function(overlay) {
						 traffic_map._getMap().removeOverlay(overlay);
					});
				}
			}
			break;
		}
		case 'pop1_x': {
			document.getElementById("popup1").remove();
			break;
		}
	}
}

