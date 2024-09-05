/**
 * Version : 1.0 
 * 파일명: common.js 
 * 작성일자 : 2023-10-06
 * 설명 : 지도 jsp의 기본지도 표시
 */

let backgroudLayer;

let baseMap;
let mapView; //맵 뷰 선언 : 보여지는 지도 부분 설정

const geoserverURL = 'http://115.68.163.11:20003/geoserver/szone/wms'; //개발
//const geoserverURL = 'http://192.168.1.159:8088/geoserver/szone/wms'; //로컬

const centerX = 932305;
const centerY = 1928917;
//페이지 변수
const CROSS_TRAFFIC_PAGE = 0;
const WATING_LINE_PAGE = 1;
const LINK_SPD_PAGE = 2;
const LINK_VOL_PAGE = 3;
const SZONE_PAGE = 4;

//팝업 조회 URL 변수
const URL_CROSS_TRAFFIC_INFO = 0;
const URL_WAITING_LINE_INFO = 1;
const URL_GET_LINK_SPD_INFO = 2;
const URL_GET_LINK_VOL_INFO = 3;
const URL_GET_SZONE_ROAD = 4;
const URL_GET_SZONE_UNIT_INFO = 5;
const URL_GET_SZONE_EACH_INFO = 6;
const URL_GET_DEVICE_INFO = 7;
const URL_GET_CROSS_NODE_INFO = 8;
const URL_GET_WAITING_LINE = 9;
//장치 데이터 변수
/*const GET_SMTL_INFO = 8;
const GET_VDS_INFO = 9;
const GET_CCTV_INFO = 10;
const GET_LIDAR_INFO = 11;*/

//URL배열 처리 선언된 상수로 직접 URL 가져옴 
const arrUrlList = [
	"/getTrafficInfo.do",		//0
	"/getWaitingLineInfo.do",		//1
	"/getLinkSpdInfo.do",		//2
	"/getLinkVolInfo.do",		//3
	"/getSzoneRoad.do",			//4
	"/getSzoneUnitInfo.do",		//5
	"/getSzoneEachInfo.do",		//6
	"/getDeviceInfo.do",		//7
	"/getCrossNodeInfo.do",		//8
	"/insertWaitingLine.do"		//9
];

//지도클릭하고 팝업 띄울 때 사용
let link_id;
let gubun;

let hour = document.getElementById("hour").value;;

function func_showBaseMap() {
	//배경지도. 국토정보플랫폼
	backgroudLayer = new ol.layer.Tile(wmtEmapOption2('korean_map', true));
}

function zoomSlider() {
	let zoomslider = new ol.control.ZoomSlider();
	baseMap.addControl(zoomslider);
}
function func_ajaxSzoneRoad(URL_NUM) {
		$.ajax({
		url: arrUrlList[URL_NUM],
		type: "POST",
		async: false,
		contentType: "application/json",
		data : func_createHourParmater(URL_NUM),
		success: function (result) {
		},
		error: function (request, status, error) {
			console.log(status);
			console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
		}
	});
}

function func_createHourParmater(URL_NUM){
	var obj = {};
	
	obj = {
		'timelevel' : hour
	};
	return JSON.stringify(obj);
}

function func_mapClickEvt(evt, mapNum) {
	coordinate = evt.coordinate;
	switch(mapNum) {
		case CROSS_TRAFFIC_PAGE : {
			func_CrossTrafficMapClickEvt(evt);
			break;
		}
		case WATING_LINE_PAGE : {
			func_waitingMapClickEvt(evt);
			break;
		}
		case LINK_SPD_PAGE : { //3
			func_spdMapClickEvt(evt);
			break;
		}
		case LINK_VOL_PAGE : { //4
			func_volMapClickEvt(evt);
			break;
		}
		case SZONE_PAGE : {
			func_szoneMapClickEvt(evt);
			break;
		}
		
	}
}