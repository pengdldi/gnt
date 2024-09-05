/**
 * Version : 1.0 
 * 파일명: spdMapEvent.js 
 * 작성일자 : 2023-10-06
 * 설명 : linkSpdMap.jsp 작동이벤트 정의
 */
document.addEventListener("DOMContentLoaded", function() {
	func_ajaxGetInfo(URL_GET_WAITING_LINE);
	executeAtNextHour();
	func_showBaseMap();
	func_showWaitingLineMap();
});

/*document.getElementById('map').addEventListener('click', (evt) => {
	let properties = 0;
	baseMap.on('click', function(evt) {
		coordinate = evt.coordinate;
		//console.log("$$$$$$$$$$$$$$$$", coordinate)
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
						} else {
							properties = tmp.features[0].properties;
							console.log("link_id : ",properties.link_id)
							console.log("node : ",properties.node_id)
							console.log("lane : ",properties.lane_no)
							console.log("way : ",properties.way)
						}
					});
				}
	});
});*/


document.getElementById('map').addEventListener('pointermove',(evt) =>{
	//document.getElementById("popup").style.display = 'none';
	func_waitingLineMouseOver(evt);
});