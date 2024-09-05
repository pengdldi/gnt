/**
 * Version : 1.0 
 * 파일명: spdMapEvent.js 
 * 작성일자 : 2023-10-06
 * 설명 : linkSpdMap.jsp 작동이벤트 정의
 */ 
document.addEventListener("DOMContentLoaded",function(){
	func_ajaxSzoneRoad(URL_GET_SZONE_ROAD);
	executeAtNextHour();
	func_showBaseMap();
	func_showVolMap();
});

document.getElementById('map').addEventListener('click',(evt) =>{
	func_resetPopup(evt);
	func_mapClickEvt(evt, LINK_VOL_PAGE);
});