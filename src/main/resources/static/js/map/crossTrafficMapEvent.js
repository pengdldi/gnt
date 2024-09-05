/**
 * Version : 1.0 
 * 파일명: spdMapEvent.js 
 * 작성일자 : 2023-10-06
 * 설명 : linkSpdMap.jsp 작동이벤트 정의
 */ 
document.addEventListener("DOMContentLoaded",function(){
	func_showBaseMap();
	func_showTrafficMap();
});

document.getElementById('map').addEventListener('click',(evt) =>{
	func_resetPopup(evt);
	func_mapClickEvt(evt, CROSS_TRAFFIC_PAGE);
});

document.getElementById('btn_time').addEventListener('click',(evt) =>{
	func_timeClickEvt(evt, URL_GET_CROSS_NODE_INFO);
});
document.getElementById('btn_timer').addEventListener('click',(evt) =>{
	func_timeClickEvt(evt, URL_GET_CROSS_NODE_INFO);
});
document.getElementById('btn_timel').addEventListener('click',(evt) =>{
	func_timeClickEvt(evt, URL_GET_CROSS_NODE_INFO);
});

/* range 마우스로 끌어서 변경 못하게 */
document.getElementById('time_range').addEventListener('mousedown', (evt) => {
  evt.preventDefault();
});
document.getElementById('time_range').addEventListener('click', (evt) => {
  evt.preventDefault();
});