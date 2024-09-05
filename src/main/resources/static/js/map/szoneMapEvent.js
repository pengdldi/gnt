/**
 * Version : 1.0 
 * 파일명: szoneMapEvent.js 
 * 작성일자 : 2023-09-10
 * 설명 : szoneMap.jsp 작동이벤트 정의
 */ 
document.addEventListener("DOMContentLoaded",function(){
	func_ajaxSzoneRoad(URL_GET_SZONE_ROAD);
	executeAtNextHour();
	func_showBaseMap();
	func_showSzoneMap();
});

document.getElementById('map').addEventListener('click',(evt) =>{
	func_resetPopup(evt);
	func_mapClickEvt(evt, SZONE_PAGE);
});
