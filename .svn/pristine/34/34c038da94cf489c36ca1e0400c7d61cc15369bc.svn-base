/**
 * Version : 1.0 
 * 파일명: mainMapFunc.js 
 * 작성일자 : 2023-09-10
 * 설명 : mainbaseMap.jsp 작동함수 정의
 */ 
let moctlinkLayer;
let szoneUnitLayer;
let szoneEachLayer;
let laneLayer;
let roadLayer;
let snodeLayer;

let coordinate;
let overlay;
const srsName5179 = 'EPSG:5179';
const defaultzoom = 14;

let lane_no = 0;
let node_id;

let tmpPopup1 = document.getElementById("popup01");
let tmpPopup2 = document.getElementById("popup02");
let tmpDetail1 = document.getElementById("detail01");
let tmpDetail2 = document.getElementById("detail02");

let smtlDetail;
let vdsDetail;
let cctvDetail;
let lidarDetail;

//let detailNode = document.getElementById("detail");

function func_showSzoneMap() {
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
	zoomSlider();
}

function func_szoneMapClickEvt(evt) {

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
					func_ajaxGetInfo(gubun);
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

function func_createParmater(URL_NUM){
	var obj = {};
	
	if (gubun == URL_GET_SZONE_UNIT_INFO) {
		lane_no = 0;
	} else {
		
	}
	switch (URL_NUM){
		case URL_GET_SZONE_UNIT_INFO: {
			obj = {
				'link_id' : link_id,
				'node_id' : node_id
			};
			break;
		}
		case URL_GET_SZONE_EACH_INFO: {
			obj = {
				'link_id' : link_id,
				'lane_no' : lane_no,
				'node_id' : node_id
			};
			break;
		}
		case URL_GET_DEVICE_INFO: {
			obj = {
				'link_id' : link_id,
				'lane_no' : lane_no,
				'node_id' : node_id
			};
			break;
		}
	}
	return JSON.stringify(obj);
}

function func_resultDataParser(result, URL_NUM) {
	switch (URL_NUM) {
		case URL_GET_SZONE_UNIT_INFO: {
			drawPopup1(result);
			break;
		}
		case URL_GET_SZONE_EACH_INFO: {
			drawPopup2(result);
			break;
		}
		case URL_GET_DEVICE_INFO: {
			if (gubun == URL_GET_SZONE_UNIT_INFO) {
				drawPopupDetail1(result);
			} else {
				drawPopupDetail2(result);
			}
			break;
		}
	}
}

function drawPopup1(result) {
	let popupNode = tmpPopup1.cloneNode(true);
	popupNode.id = "popup1";
	tmpPopup1.after(popupNode);

	const szoneList = result.szoneInfo;
	const device_cnt = result.device_cnt[0].device_cnt;
	
	let roadname = popupNode.querySelector("#road_name");
	let laneno = popupNode.querySelector("#lane_no");
	let slevel = popupNode.querySelector("#slevel");
	let note = popupNode.querySelector("#note");
	/* 음영구간 유형 조회 */
	//도로명 넣기
	roadname.textContent = szoneList[0].road_name;
	//차로, 음영구간 유형, 음영구간 내용 넣기
	let lanenoTh = '';
	let slevelTd = '';
	let noteTd = '';
	for (let i=0; i<szoneList.length; i++){
		lanenoTh += '<th>'+szoneList[i].lane_note+'</th>';
		slevelTd += '<td>'+szoneList[i].slevel+'</td>';
		noteTd += '<td>'+szoneList[i].slevel_note+'</td>';
	}

	laneno.insertAdjacentHTML('afterend',lanenoTh);
	slevel.insertAdjacentHTML('afterend',slevelTd);
	note.insertAdjacentHTML('afterend',noteTd);
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
	
	/* 차로, 장치별 상세보기 조회 */
	if (device_cnt == '0') { //해당 도로, 차로에 장치가 하나도 없으면 [상세보기] 버튼 안 보임
		popupNode.querySelector(".btn_detail").style.display = 'none';
	} else {
		popupNode.querySelector(".btn_detail").style.display = '';
	}
}

function drawPopupDetail1(result) {
	let popupNode = document.getElementById("popup1");
	let detailNode = tmpDetail1.cloneNode(true);
	detailNode.id = "detail1";
	tmpDetail1.after(detailNode);
	
	let smtl = result.smtlInfo;
	let vds = result.vdsInfo;
	let cctv = result.cctvInfo;
	let lidar = result.lidarInfo;
	
	
	/* id=detail 하위 장치별 div, table*/
	let smtldiv = detailNode.querySelector("#smtl");
	let vdsldiv = detailNode.querySelector("#vdsl");
	let cctvdiv = detailNode.querySelector("#cctv");
	let lidardiv = detailNode.querySelector("#lidar");
	
	smtlDetail = result.smtlDetail;
	vdsDetail = result.vdsDetail;
	cctvDetail = result.cctvDetail;
	lidarDetail = result.lidarDetail;
	
	let dname = '';
	if (smtl.length > 0) {
		dname += '스마트교차로 검지기';
		let smtl_lane = '';
		let smtl_slevel = '';
		let smtl_spd = '';
		let smtl_vol = '';
		let smtl_waiting = '';

		let smtl_id = smtl[0].ctv_id;
		smtldiv.querySelector("#smtl_name").innerHTML = '스마트교차로 검지기';
		smtldiv.querySelector("#smtl_id").innerHTML = smtl_id;
	
		for (var i=0; i<smtlDetail.length; i++) {
			if (smtlDetail[i].ctv_id == smtl_id) {
				smtl_lane += '<th>'+smtlDetail[i].lane_no+'</th>';
				smtl_slevel += '<td>'+smtlDetail[i].slevel+'</td>';
				smtl_spd += '<td>'+smtlDetail[i].smtl_spd+'</td>';
				smtl_vol += '<td>'+smtlDetail[i].smtl_vol+'</td>';
				smtl_waiting += '<td>'+smtlDetail[i].smtl_waiting_line+'</td>';
			}
		}
		smtldiv.querySelector("#lane_no").insertAdjacentHTML('afterend',smtl_lane);
		smtldiv.querySelector("#slevel").insertAdjacentHTML('afterend',smtl_slevel);
		smtldiv.querySelector("#spd").insertAdjacentHTML('afterend',smtl_spd);
		smtldiv.querySelector("#vol").insertAdjacentHTML('afterend',smtl_vol);
		smtldiv.querySelector("#waiting_line").insertAdjacentHTML('afterend',smtl_waiting);		
		smtldiv.style.display = 'block';
	}
	
	if (vds.length > 0) {
		if (dname != '' ){
			dname += ','
		}
		dname += 'VDS';
		let vdsl_lane = '';
		let vdsl_slevel = '';
		let vdsl_spd = '';
		let vdsl_vol = '';
		let vdsl_occ = '';
		let vdsl_waiting = '';
		
		let vdsl_id = vds[0].vds_id;
		
		vdsldiv.querySelector("#vdsl_name").innerHTML = 'VDS';
		vdsldiv.querySelector("#vdsl_id").innerHTML = vdsl_id;
		
		for (var i=0; i<vdsDetail.length; i++) {
			if (vdsDetail[i].vds_id == vdsl_id) {
				vdsl_lane += '<td>'+vdsDetail[i].lane_no+'</td>';
				vdsl_slevel += '<td>'+vdsDetail[i].slevel+'</td>';
				vdsl_spd += '<td>'+vdsDetail[i].vds_spd+'</td>';
				vdsl_vol += '<td>'+vdsDetail[i].vds_vol+'</td>';
				vdsl_occ += '<td>'+vdsDetail[i].vds_occ+'</td>';
				vdsl_waiting += '<td>'+vdsDetail[i].vds_waiting_line+'</td>';
			}
		}
		vdsldiv.querySelector("#lane_no").insertAdjacentHTML('afterend',vdsl_lane);
		vdsldiv.querySelector("#slevel").insertAdjacentHTML('afterend',vdsl_slevel);
		vdsldiv.querySelector("#spd").insertAdjacentHTML('afterend',vdsl_spd);
		vdsldiv.querySelector("#vol").insertAdjacentHTML('afterend',vdsl_vol);
		vdsldiv.querySelector("#occ").insertAdjacentHTML('afterend',vdsl_occ);
		vdsldiv.querySelector("#waiting_line").insertAdjacentHTML('afterend',vdsl_waiting);		
		vdsldiv.style.display = 'block';
	}
	
	if (cctv.length > 0) {
		if (dname != '' ){
			dname += ','
		}
		dname += 'CCTV';
		let cctv_lane = '';
		let cctv_slevel = '';
		let cctv_spd = '';
		
		let cctv_id = cctv[0].cctv_id;
		
		cctvdiv.querySelector("#cctv_name").innerHTML = 'CCTV';
		cctvdiv.querySelector("#cctv_id").innerHTML = cctv_id;
		
		for (var i=0; i<cctvDetail.length; i++) {
			if (cctvDetail[i].cctv_id == cctv_id) {
				cctv_lane += '<td>'+cctvDetail[i].lane_no+'</td>';
				cctv_slevel += '<td>'+cctvDetail[i].slevel+'</td>';
				cctv_spd += '<td>'+cctvDetail[i].cctv_spd+'</td>';
			}
		}
		
		cctvdiv.querySelector("#lane_no").insertAdjacentHTML('afterend',cctv_lane);
		cctvdiv.querySelector("#slevel").insertAdjacentHTML('afterend',cctv_slevel);
		cctvdiv.querySelector("#spd").insertAdjacentHTML('afterend',cctv_spd);
		cctvdiv.style.display = 'block';
	}
	
	if (lidar.length > 0) {
		if (dname != '' ){
			dname += ','
		}
		dname += 'LIDAR';
		let lidar_lane = '';
		let lidar_slevel = '';
		let lidar_spd = '';
		let lidar_inout = '';
		
		let lidar_id = lidar[0].lidar_id;
		
		lidardiv.querySelector("#lidar_name").innerHTML = 'LIDAR';
		lidardiv.querySelector("#lidar_id").innerHTML = lidar_id;
		
		for (var i=0; i<lidarDetail.length; i++) {
			if (lidarDetail[i].lidar_id == lidar_id) {
				lidar_lane += '<td>'+lidarDetail[i].lane_no+'</td>';
				lidar_slevel += '<td>'+lidarDetail[i].slevel+'</td>';
				lidar_spd += '<td>'+lidarDetail[i].lidar_spd+'</td>';
				lidar_inout += '<td>'+lidarDetail[i].lidar_in_out+'</td>';
			}
		}
		
		lidardiv.querySelector("#lane_no").insertAdjacentHTML('afterend',lidar_lane);
		lidardiv.querySelector("#slevel").insertAdjacentHTML('afterend',lidar_slevel);
		lidardiv.querySelector("#spd").insertAdjacentHTML('afterend',lidar_spd);
		lidardiv.querySelector("#inout").insertAdjacentHTML('afterend',lidar_inout);		
		lidardiv.style.display = 'block';
	}

	detailNode.querySelector("#device_name").textContent = '수집장치: '+dname;
	popupNode.parentNode.insertBefore(detailNode, popupNode.nextSibling);
	detailNode.style.display = 'block';
}

function drawPopup2(result) {
	let popupNode = tmpPopup2.cloneNode(true);
	popupNode.id = "popup2";
	tmpPopup2.after(popupNode);

	const szoneList = result.szoneInfo;
	const device_cnt = result.device_cnt[0].device_cnt;
	
	let roadname = popupNode.querySelector("#road_name");
	let laneno = popupNode.querySelector("#lane_no");
	let slevel = popupNode.querySelector("#slevel");
	let note = popupNode.querySelector("#note");
	/* 음영구간 유형 조회 */
	//도로명 넣기
	roadname.textContent = szoneList[0].road_name;
	//차로, 음영구간 유형, 음영구간 내용 넣기
	let lanenoTh = '';
	let slevelTd = '';
	let noteTd = '';
	
	lanenoTh = szoneList[0].lane_note;
	slevelTd += '<td>'+szoneList[0].slevel+'</td>';
	noteTd += '<td>'+szoneList[0].slevel_note+'</td>';
	
	laneno.innerHTML = lanenoTh;
	slevel.insertAdjacentHTML('afterend',slevelTd);
	note.insertAdjacentHTML('afterend',noteTd);
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
	
	/* 차로, 장치별 상세보기 조회 */
	if (device_cnt == '0') { //해당 도로, 차로에 장치가 하나도 없으면 [상세보기] 버튼 안 보임
		popupNode.querySelector(".btn_detail").style.display = 'none';
	} else {
		popupNode.querySelector(".btn_detail").style.display = '';
	}
}

function drawPopupDetail2(result) {
	let popupNode = document.getElementById("popup2");
	let detailNode = tmpDetail2.cloneNode(true);
	detailNode.id = "detail2";
	tmpDetail2.after(detailNode);
	
	let smtl = result.smtlInfo;
	let vds = result.vdsInfo;
	let cctv = result.cctvInfo;
	let lidar = result.lidarInfo;
	
	/* id=detail 하위 장치별 div, table*/
	let smtldiv = detailNode.querySelector("#smtl");
	let vdsldiv = detailNode.querySelector("#vdsl");
	let cctvdiv = detailNode.querySelector("#cctv");
	let lidardiv = detailNode.querySelector("#lidar");
	
	smtlDetail = result.smtlDetail;
	vdsDetail = result.vdsDetail;
	cctvDetail = result.cctvDetail;
	lidarDetail = result.lidarDetail;

	let dname = '';
	if (smtl.length > 0) {
		let smtl_lane = '';
		let smtl_slevel = '';
		let smtl_spd = '';
		let smtl_vol = '';
		let smtl_waiting = '';

		let smtl_id = smtl[0].ctv_id;
		smtldiv.querySelector("#smtl_name").innerHTML = '스마트교차로 검지기';
		smtldiv.querySelector("#smtl_id").innerHTML = smtl_id;
		
		for (var i=0; i<smtlDetail.length; i++) {
			if (smtlDetail[i].ctv_id == smtl_id) {
				smtl_lane += smtlDetail[i].lane_no;
				smtl_slevel += '<td>'+smtlDetail[i].slevel+'</td>';
				smtl_spd += '<td>'+smtlDetail[i].smtl_spd+'</td>';
				smtl_vol += '<td>'+smtlDetail[i].smtl_vol+'</td>';
				smtl_waiting += '<td>'+smtlDetail[i].smtl_waiting_line+'</td>';
			}
		}
		smtldiv.querySelector("#lane_no").innerHTML = smtl_lane;
		smtldiv.querySelector("#slevel").insertAdjacentHTML('afterend',smtl_slevel);
		smtldiv.querySelector("#spd").insertAdjacentHTML('afterend',smtl_spd);
		smtldiv.querySelector("#vol").insertAdjacentHTML('afterend',smtl_vol);
		smtldiv.querySelector("#waiting_line").insertAdjacentHTML('afterend',smtl_waiting);		
		smtldiv.style.display = 'block';
	}
	
	if (vds.length > 0) {
		if (dname != '' ){
			dname += ','
		}
		dname += 'VDS';
		let vdsl_lane = '';
		let vdsl_slevel = '';
		let vdsl_spd = '';
		let vdsl_vol = '';
		let vdsl_occ = '';
		let vdsl_waiting = '';
		
		let vdsl_id = vds[0].vds_id;
		
		vdsldiv.querySelector("#vdsl_name").innerHTML = 'VDS';
		vdsldiv.querySelector("#vdsl_id").innerHTML = vdsl_id;
		
		for (var i=0; i<vdsDetail.length; i++) {
			if (vdsDetail[i].vds_id == vdsl_id) {
				vdsl_lane += vdsDetail[i].lane_no;
				vdsl_slevel += '<td>'+vdsDetail[i].slevel+'</td>';
				vdsl_spd += '<td>'+vdsDetail[i].vds_spd+'</td>';
				vdsl_vol += '<td>'+vdsDetail[i].vds_vol+'</td>';
				vdsl_occ += '<td>'+vdsDetail[i].vds_occ+'</td>';
				vdsl_waiting += '<td>'+vdsDetail[i].vds_waiting_line+'</td>';
			}
		}
		vdsldiv.querySelector("#lane_no").innerHTML = vdsl_lane;
		vdsldiv.querySelector("#slevel").insertAdjacentHTML('afterend',vdsl_slevel);
		vdsldiv.querySelector("#spd").insertAdjacentHTML('afterend',vdsl_spd);
		vdsldiv.querySelector("#vol").insertAdjacentHTML('afterend',vdsl_vol);
		vdsldiv.querySelector("#occ").insertAdjacentHTML('afterend',vdsl_occ);
		vdsldiv.querySelector("#waiting_line").insertAdjacentHTML('afterend',vdsl_waiting);		
		vdsldiv.style.display = 'block';
	}
	
	if (cctv.length > 0) {
		if (dname != '' ){
			dname += ','
		}
		dname += 'CCTV';
		let cctv_lane = '';
		let cctv_slevel = '';
		let cctv_spd = '';
		
		let cctv_id = cctv[0].cctv_id;
		
		cctvdiv.querySelector("#cctv_name").innerHTML = 'CCTV';
		cctvdiv.querySelector("#cctv_id").innerHTML = cctv_id;
		
		for (var i=0; i<cctvDetail.length; i++) {
			if (cctvDetail[i].cctv_id == cctv_id) {
				cctv_lane += cctvDetail[i].lane_no;
				cctv_slevel += '<td>'+cctvDetail[i].slevel+'</td>';
				cctv_spd += '<td>'+cctvDetail[i].cctv_spd+'</td>';
			}
		}
		
		cctvdiv.querySelector("#lane_no").innerHTML = cctv_lane;
		cctvdiv.querySelector("#slevel").insertAdjacentHTML('afterend',cctv_slevel);
		cctvdiv.querySelector("#spd").insertAdjacentHTML('afterend',cctv_spd);
		cctvdiv.style.display = 'block';
	}
	
	if (lidar.length > 0) {
		if (dname != '' ){
			dname += ','
		}
		dname += 'LIDAR';
		let lidar_lane = '';
		let lidar_slevel = '';
		let lidar_spd = '';
		let lidar_inout = '';
		
		let lidar_id = lidar[0].lidar_id;
		
		lidardiv.querySelector("#lidar_name").innerHTML = '스마트교차로 검지기';
		lidardiv.querySelector("#lidar_id").innerHTML = smtl_id;
		
		for (var i=0; i<lidarDetail.length; i++) {
			if (lidarDetail[i].lidar_id == lidar_id) {
				lidar_lane += lidarDetail[i].lane_no;
				lidar_slevel += '<td>'+lidarDetail[i].slevel+'</td>';
				lidar_spd += '<td>'+lidarDetail[i].lidar_spd+'</td>';
				lidar_inout += '<td>'+lidarDetail[i].lidar_in_out+'</td>';
			}
		}
		
		lidardiv.querySelector("#lane_no").innerHTML = lidar_lane;
		lidardiv.querySelector("#slevel").insertAdjacentHTML('afterend',lidar_slevel);
		lidardiv.querySelector("#spd").insertAdjacentHTML('afterend',lidar_spd);
		lidardiv.querySelector("#inout").insertAdjacentHTML('afterend',lidar_inout);		
		lidardiv.style.display = 'block';
	}

	detailNode.querySelector("#lane").innerHTML = lane_no + '차로';

	popupNode.parentNode.insertBefore(detailNode, popupNode.nextSibling);
	detailNode.style.display = 'block';
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
			if (document.getElementById("detail1") != undefined) {
				document.getElementById("detail1").remove();
			}
			break;
		}
		case 'pop2_x': {
			document.getElementById("popup2").remove();
			if (document.getElementById("detail2") != undefined) {
				document.getElementById("detail2").remove();
			}
			break;
		}
		case 'popdetail1_x': {
			document.getElementById("detail1").remove();
			break;
		}
		case 'popdetail2_x': {
			document.getElementById("detail2").remove();
			break;
		}
	}
}
