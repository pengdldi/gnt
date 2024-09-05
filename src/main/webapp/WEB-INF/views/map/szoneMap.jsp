<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<!-- 팝업 영역(통합차로)-->
	<div class="pop_wrap pop01 pop_szone1" id="popup01">
		<div class="pop_bs">
			<div class="pop_top d_flex d_jcsb">
				<span id="road_name"></span>
				<div id="pop1_x" class="pop_x"></div>			
			</div>
			<div class="btn_r_wrap">
				<div class="txt_c">
					<button id="btn_device" class="btn_detail btn-class"onclick="func_ajaxGetInfo(URL_GET_DEVICE_INFO)">수집장치 확인</button>
				</div>
			</div>
			<div class="pop_tabl txt_c word_b">
				<table>
					<tr>
						<th id="lane_no">차로 위치</th>
					</tr>
					<tr>
						<td id="slevel">음영유형</td>
					</tr>
					<tr>
						<td id="note">내용</td>
					</tr>
				</table>
			</div>
		</div>
	<div class="pop_down"></div>
	</div>
	
<!-- 팝업 영역(통합차로-수집장치 확인)-->
	<div class="pop_wrap pop01" id="detail01">
		<div class="pop_bs">
			<div class="pop_top d_flex d_jcsb">
				<span id="device_name"></span>
				<div id="popdetail1_x" class="pop_x"></div>			
			</div>
			<div id="smtl" class="device">
				<div class="name">				
						<label>장 치 명</label>
						<span id="smtl_name"></span>				
					
						<label>ID</label>
						<span id="smtl_id"></span>				
				</div>
				<div class="pop_tabl txt_c word_b">
					<table>
						<tr>
							<th id="lane_no">차로 위치</th>
						</tr>
						<tr>
							<td id="slevel">유형</td>
						</tr>
						<tr>
							<td id="spd">속도(km/h)</td>
						</tr>
						<tr>
							<td id="vol">교통량</td>
						</tr>
						<tr>
							<td id="waiting_line">대기행렬</td>
						</tr>
					</table>
				</div>
			</div>
			
			<div id="vdsl" class="device">
				<div class="name">				
						<label>장 치 명</label>
						<span id="vdsl_name"></span>				
					
						<label>ID</label>
						<span id="vdsl_id"></span>				
				</div>
				<div class="pop_tabl txt_c word_b">
					<table>
						<tr>
							<th id="lane_no">차로 위치</th>
						</tr>
						<tr>
							<td id="slevel">유형</td>
						</tr>
						<tr>
							<td id="spd">속도(km/h)</td>
						</tr>
						<tr>
							<td id="vol">교통량</td>
						</tr>
						<tr>
							<td id="occ">점유시간(msec)</td>
						</tr>
						<tr>
							<td id="waiting_line">대기행렬</td>
						</tr>
					</table>
				</div>
			</div>
			
			<div id="cctv" class="device">
				<div class="name">				
						<label>장 치 명</label>
						<span id="cctv_name"></span>				
					
						<label>ID</label>
						<span id="cctv_id"></span>				
				</div>
				<div class="pop_tabl txt_c word_b">
					<table>
						<tr>
							<th id="lane_no">차로 위치</th>
						</tr>
						<tr>
							<td id="slevel">유형</td>
						</tr>
						<tr>
							<td id="spd">속도(km/h)</td>
						</tr>
					</table>
				</div>
			</div>
			
			<div id="lidar" class="device">
				<div class="name">				
						<label>장 치 명</label>
						<span id="lidar_name"></span>				
					
						<label>ID</label>
						<span id="lidar_id"></span>				
				</div>
				<div class="pop_tabl txt_c word_b">
					<table>
						<tr>
							<th id="lane_no">차로 위치</th>
						</tr>
						<tr>
							<td id="slevel">유형</td>
						</tr>
						<tr>
							<td id="spd">속도(km/h)</td>
						</tr>
						<tr>
							<td id="inout">inout</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
<!-- 팝업 영역(개별차로)-->
	<div class="pop_wrap pop02 pop_szone2" id="popup02">
		<div class="pop_bs">
			<div class="pop_top d_flex d_jcsb">
				<span id="road_name"></span>
				<div id="pop2_x" class="pop_x"></div>			
			</div>
			
			<div class="pop_tabl2 txt_c word_b">
				<table>
					<tr>
						<td colspan="2" class="bold" id="lane_no"></td>			
					</tr>
					<tr>
						<th id="slevel">유형</th>
						<!-- <td>유형2</td>	 -->				
					</tr>
					<tr>
						<th id="note">내용</th>
<!-- 						<td>센서고장</td>	 -->				
					</tr>
				</table>
				<div class="btn_r_detail">
					<div class="txt_c">
						<button id="btn_device" class="btn_detail btn-class"onclick="func_ajaxGetInfo(URL_GET_DEVICE_INFO)">수집장치 확인</button>
					</div>
				</div>
			</div>
		</div>
		<div class="pop_down"></div>
	</div>
<!-- 팝업 영역(개별차로-수집장치 확인)-->
	<div class="pop_wrap pop03" id="detail02">
		<div class="pop_bs">
			<div class="pop_top d_flex d_jcsb">
				<span id="lane"></span>
				<div id="popdetail2_x" class="pop_x"></div>			
			</div>
			<div id="smtl" class="device">
				<div class="name">				
					<label>장 치 명</label>
					<p id="smtl_name"></p>				
					
					<label>ID</label>
					<p id="smtl_id"></p>				
				</div>
	
				<div class="pop_tabl txt_c word_b">
					<table>
						<tr>
							<th colspan="2" id="lane_no"></th>
						</tr>
						<tr>
							<td id="slevel">유형</td>
							<!-- <td>유형2</td>	 -->				
						</tr>
						<tr>
							<td id="spd">속도(km/h)</td>			
						</tr>
						<tr>
							<td id="vol">교통량</td>
						</tr>
						<tr>
							<td id="waiting_line">대기행렬</td>
						</tr>
					</table>
				</div>
			</div>
			
			<div id="vdsl" class="device">
				<div class="name">				
					<label>장 치 명</label>
					<p id="vdsl_name"></p>				
					
					<label>ID</label>
					<p id="vdsl_id"></p>				
				</div>
	
				<div class="pop_tabl txt_c word_b">
					<table>
						<tr>
							<th colspan="2" id="lane_no"></th>
						</tr>
						<tr>
							<td id="slevel">유형</td>
							<!-- <td>유형2</td>	 -->				
						</tr>
						<tr>
							<td id="spd">속도(km/h)</td>			
						</tr>
						<tr>
							<td id="vol">교통량</td>
						</tr>
						<tr>
							<td id="occ">점유시간(msec)</td>
						</tr>
						<tr>
							<td id="waiting_line">대기행렬</td>
						</tr>
					</table>
				</div>
			</div>
			
			<div id="cctv" class="device">
				<div class="name">				
					<label>장 치 명</label>
					<p id="cctv_name"></p>				
					
					<label>ID</label>
					<p id="cctv_id"></p>				
				</div>
	
				<div class="pop_tabl txt_c word_b">
					<table>
						<tr>
							<th colspan="2" id="lane_no"></th>
						</tr>
						<tr>
							<td id="slevel">유형</td>
							<!-- <td>유형2</td>	 -->				
						</tr>
						<tr>
							<td id="spd">속도(km/h)</td>			
						</tr>
					</table>
				</div>
			</div>
			
			<div id="lidar" class="device">
				<div class="name">				
					<label>장 치 명</label>
					<p id="lidar_name"></p>				
					
					<label>ID</label>
					<p id="lidar_id"></p>				
				</div>
	
				<div class="pop_tabl txt_c word_b">
					<table>
						<tr>
							<th colspan="2" id="lane_no"></th>
						</tr>
						<tr>
							<td id="slevel">유형</td>
							<!-- <td>유형2</td>	 -->				
						</tr>
						<tr>
							<td id="spd">속도(km/h)</td>
						</tr>
						<tr>
							<td id="inout">inout</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/common.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/map/szoneMapEvent.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/map/szoneMapFunc.js"></script>
</body>
</html>

