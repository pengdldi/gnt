<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

</head>
<body>
<!-- 팝업 영역-->
	<div class="pop_wrap pop_big" id="popup01">
		<div class="pop_bs">
			<div class="pop_top d_flex d_jcsb">
				<span>교차로 교통량</span>
				<div class="pop_x" id="pop1_x"></div>			
			</div>
			<div class="pop_big_in" id="crosspMap"></div>
		</div>
	</div>

    <!-- 팝업 영역-->
	<div class="pop_wrap pop01 pop_cross" id="popup02">
		<div class="pop_bs">
			<div class="pop_top d_flex d_jcsb pop_top_cro">
				<span>스마트 교차로</span>		
			</div>
			<div class="pop_tabl txt_c word_b pop_tabl_cro">
				<table>
					<tr>
						<th id="lane_no">차로 위치</th>
						<!-- <th>1차로</th> -->
					</tr>
					<tr>
						<td id="vol">교통량</td>
					</tr>
					<tr>
						<td id="spd">속도</td>
					</tr>
					<tr>
						<td id="waiting_line">대기행렬</td>
					</tr>
					<tr>
						<td id="turn">이동방향</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
	
	<input type="hidden" id="playstop" name="timebar" value="stop" />
	<div class="time_bg">
		<div class="time_up">
			<input type="range" class="time_bar" id="time_range" min="1" max="100" value="${hour*4.35}" disabled>
			<div class="time_txt gap10">00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23</div>
		</div>	
	
		<div class="time_bot d_flex gap35">
			<div class="img_all ico_time ico_l" id="btn_timel"></div>
			<div class="img_all ico_time ico_play" id="btn_time"></div>
			<div class="img_all ico_time ico_r" id="btn_timer"></div>
		</div>
	</div>

<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/common.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/map/crossTrafficMapFunc.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/map/crossTrafficMapEvent.js"></script>
</body>
</html>

