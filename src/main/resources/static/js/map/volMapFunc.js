/**
 * Version : 1.0 
 * 파일명: mainMapFunc.js 
 * 작성일자 : 2023-09-10
 * 설명 : mainbaseMap.jsp 작동함수 정의
 */
let szoneUnitLayer;
let szoneEachLayer;
let laneLayer;
let roadLayer;
let snodeLayer;

let lane_no;
let node_id;
let coordinate;

let tmpPopup1 = document.getElementById("popup01");
let tmpPopup2 = document.getElementById("popup02");

let overlay;
const srsName5179 = 'EPSG:5179';
const defaultzoom = 14;

function func_showVolMap() {
	//표준링크 레이어
	moctlinkLayer = new ol.layer.Tile({
		visible: true,
		name : 'moct_link_224',
		source: new ol.source.TileWMS({
			url: geoserverURL,
			params: {
				'FORMAT': 'image/png', 
				'VERSION': '1.1.0',
				tiled: true,
				"LAYERS": 'szone:moct_link_224'
			},
			crossOrigin: 'anonymous'
		})
	});
	
	//음영구간도로(통합) 레이어
	szoneUnitLayer = new ol.layer.Tile({
		visible: false,
		name : 'szone_unit',
		source: new ol.source.TileWMS({
			url: geoserverURL,
			params: {
				'FORMAT': 'image/png', 
				'VERSION': '1.1.0',
				tiled: true,
				"LAYERS": 'szone:szone_unit'
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
		name : 'road_link',
		source: new ol.source.TileWMS({
			url: geoserverURL,
			params: {
				'FORMAT': 'image/png', 
				'VERSION': '1.1.0',
				tiled: true,
				"LAYERS": 'szone:road_link'
			},
			crossOrigin: 'anonymous'
		})
	});
	
	//교차로 노드
	snodeLayer = new ol.layer.Tile({
		visible: true,
		name : 'smtl_node',
		source: new ol.source.TileWMS({
			url: geoserverURL,
			params: {
				'FORMAT': 'image/png', 
				'VERSION': '1.1.0',
				tiled: true,
				"LAYERS": 'szone:smtl_node'
			},
			crossOrigin: 'anonymous'
		})
	});
	
	//음영구간도로(개별) 레이어
	szoneEachLayer = new ol.layer.Tile({
		visible: true,
		name : 'szone_each',
		source: new ol.source.TileWMS({
			url: geoserverURL,
			params: {
				'FORMAT': 'image/png', 
				'VERSION': '1.1.0',
				tiled: true,
				"LAYERS": 'szone:szone_each'
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
		layers: [backgroudLayer,moctlinkLayer,laneLayer,roadLayer,szoneEachLayer,szoneUnitLayer],
		target: 'map',
		view: mapView
	});
	zoomSlider();;
}


function func_volMapClickEvt(evt) {
	baseMap.on('singleclick', function(evt) {
		let zoom = mapView.getZoom();
		let urlLayer;
		coordinate = evt.coordinate;
		
		if(zoom < 17.5) {
			urlLayer = szoneUnitLayer;
			gubun = URL_GET_SZONE_UNIT_INFO;
		} else {
			urlLayer = szoneEachLayer;
			gubun = URL_GET_SZONE_EACH_INFO;
		}
		const viewResolution = mapView.getResolution();
		const url = urlLayer.getSource().getFeatureInfoUrl(
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
					baseMap.getView().animate({
						center: coordinate,
						duration: 700,
					});
					const properties = tmp.features[0].properties;
					if (properties.lane_no === undefined) {
						
						link_id = properties.link_id;
						node_id = properties.node_id;
					} else {
						link_id = properties.link_id;
						lane_no = properties.lane_no;
						node_id = properties.node_id;
					}
					func_ajaxGetInfo(LINK_VOL_PAGE);
				}
			});
			evt.preventDefault();
		}
	});
}

function func_ajaxGetInfo(URL_NUM) {
		$.ajax({
		url: func_createUrl(URL_NUM),
		type: "POST",
		async: false,
		contentType: "application/json",
		dataType: "json",
		data : func_createParmater(URL_NUM),
		success: function (result) {
			func_resultDataParser(result, gubun);
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
		'link_id' : link_id,
		'lane_no' : lane_no,
		'node_id' : node_id,
		'gubun' : gubun
	};
	return JSON.stringify(obj);
}

function func_resultDataParser(result, gubun) {
	if (gubun == URL_GET_SZONE_UNIT_INFO) {
		drawPopup1(result);	
	} else {
		drawPopup2(result);	
	}
}

function drawPopup1(result) {
	let popupNode = tmpPopup1.cloneNode(true);
	popupNode.id = "popup1";
	tmpPopup1.after(popupNode);
	
	let roadname = popupNode.querySelector("#road_name");
	let laneno = popupNode.querySelector("#lane_no");
	let slevel = popupNode.querySelector("#slevel");
	let note = popupNode.querySelector("#note");
	let vol = popupNode.querySelector("#vol");
	let tmslnote = popupNode.querySelector("#tmsl_note");

	const volList = result.volInfo;
	//도로명 넣기
	roadname.textContent = volList[0].smtl_node_name;
	
	//차로, 음영구간 유형, 음영구간 내용 넣기
	let lanenoTh = '';
	let slevelTd = '';
	let noteTd = '';
	let volTd = '';
	let tmslTd = '';
	let vol_value = '';
	for (let i=0; i<volList.length; i++){
		lanenoTh += '<th>'+volList[i].lane_no+'차로</th>';
		slevelTd += '<td>'+volList[i].slevel+'유형</td>';
		noteTd += '<td>'+volList[i].slevel_note+'</td>';
		
		if (volList[i].vol == '-99999') {
			vol_value = "-";
		} else {
			vol_value = volList[i].vol;
		}
		volTd += '<td>'+vol_value+'</td>';
		tmslTd += '<td >'+volList[i].tmsl_note+'</td>'; //추후수정
	}
	
	laneno.insertAdjacentHTML('afterend',lanenoTh);
	slevel.insertAdjacentHTML('afterend',slevelTd);
	note.insertAdjacentHTML('afterend',noteTd);
	vol.insertAdjacentHTML('afterend',volTd);
	tmslnote.insertAdjacentHTML('afterend',tmslTd);
	popupNode.style.display = 'block';

	overlay = new ol.Overlay({
		element: popupNode,
		autoPan: {
			animation: {
				duration: 400,
			},
		},
	})
	
	overlay.setPosition(coordinate);
	baseMap.addOverlay(overlay);
}

function drawPopup2(result) {
	let popupNode = tmpPopup2.cloneNode(true);
	popupNode.id = "popup2";
	tmpPopup2.after(popupNode);

	let roadname = popupNode.querySelector("#road_name");
	let laneno = popupNode.querySelector("#lane_no");
	let slevel = popupNode.querySelector("#slevel");
	let note = popupNode.querySelector("#note");
	let vol = popupNode.querySelector("#vol");
	let tmslnote = popupNode.querySelector("#tmsl_note");
	
	const volList = result.volInfo;
	//도로명 넣기
	roadname.textContent = volList[0].smtl_node_name;
	
	//차로, 음영구간 유형, 음영구간 내용 넣기
	let lanenoTh = '';
	let slevelTd = '';
	let noteTd = '';
	let volTd = '';
	let tmslTd = '';
	let vol_value = '';
	for (let i=0; i<volList.length; i++){
		lanenoTh += volList[i].lane_no;
		slevelTd += '<td>'+volList[i].slevel+'유형</td>';
		noteTd += '<td>'+volList[i].slevel_note+'</td>';
		
		if (volList[i].vol == '-99999') {
			vol_value = "-";
		} else {
			vol_value = volList[i].vol;
		}
		volTd += '<td>'+vol_value+'</td>';
		tmslTd += '<td >'+volList[i].tmsl_note+'</td>'; //추후수정
	}
	
	laneno.innerHTML = lanenoTh + '차로';
	slevel.insertAdjacentHTML('afterend',slevelTd);
	note.insertAdjacentHTML('afterend',noteTd);
	vol.insertAdjacentHTML('afterend',volTd);
	tmslnote.insertAdjacentHTML('afterend',tmslTd);
	popupNode.style.display = 'block';

	overlay = new ol.Overlay({
		element: popupNode,
		autoPan: {
			animation: {
				duration: 400,
			},
		},
	})
	
	overlay.setPosition(coordinate);
	baseMap.addOverlay(overlay);
}

function executeAtNextHour() {
	 let now = new Date();
  let nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0); // 다음 정각 계산

  let timeToNextHour = nextHour - now; // 현재 시간과 다음 정각까지의 시간 간격 (밀리초)
  
  setTimeout(function() {
	const source1 = szoneUnitLayer.getSource();
	source1.updateParams({'time': Date.now()});
	const source2 = szoneEachLayer.getSource();
	source2.updateParams({'time': Date.now()});
    
    // 정각마다 반복 실행하도록 다시 설정
    executeAtNextHour();
  }, timeToNextHour);
}

function func_resetPopup(evt) {
	let target = evt.target.id;
	switch (target) {
		case '' : {
			if (overlay === undefined) {}
			else if ( overlay != undefined ) {
				let overlays = baseMap.getOverlays().getArray();
				overlays.forEach(function(overlay) {
					baseMap.removeOverlay(overlay);
				});
			}
			break;
		}
		case 'pop1_x': {
			document.getElementById("popup1").remove();
			break;
		}
		case 'pop2_x': {
			document.getElementById("popup2").remove();
			break;
		}
	}
}
