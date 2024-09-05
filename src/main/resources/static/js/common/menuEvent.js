/**
 * Version : 1.0 
 * 파일명: menuEvent.js 
 * 작성일자 : 2023-09-22
 * 설명 : top.jsp 메뉴이벤트 정의
 */ 
document.addEventListener("DOMContentLoaded",function(){
	func_changeMenuIcon();
});

function func_menuClickevt(URL_NUM) {
	func_ajaxMoveMenu(URL_NUM);
}

function func_timeClickevt() {
	func_changeProgress();
}