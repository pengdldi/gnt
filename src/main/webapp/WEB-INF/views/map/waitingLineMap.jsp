<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

</head>
<body>
	<div class="pop_wrap pop02 pop_wait" id="popup02">
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
						<th id="waiting_line">대기행렬길이</th>
					</tr>
				</table>
			</div>
		</div>
		<div class="pop_down"></div>
	</div>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/common.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/map/waitingMapFunc.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/map/waitingMapEvent.js"></script>
</body>
</html>

