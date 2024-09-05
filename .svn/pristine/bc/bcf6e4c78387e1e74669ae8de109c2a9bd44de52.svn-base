<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="decorator" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<%@ taglib prefix="page" uri="http://www.opensymphony.com/sitemesh/page" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<% response.setHeader("Access-Control-Allow-Origin","*"); %>

<!-- 상단-->
	<header class="top_wrap d_flex d_jcsb">
		<div class="top_l">
			<a href="#"><div class="logo"></div></a><br>
			<span class="bold">교통정보 음영구간 정보생성 시스템</span>
		</div>
		<div class="top_r">
			<ul class="menu_wrap gap10 d_flex txt_c">
				<a href="javascript:func_menuClickevt(0);"><li class="menu_btn_on menu"><p class="line">교차로 교통량</p></li></a>
				<span></span>		
				<a href="javascript:func_menuClickevt(1);"><li class="menu_btn menu"><p class="line">대기 행렬 길이</p></li></a>
				<span></span>
				<a href="javascript:func_menuClickevt(2);"><li class="menu_btn menu"><p class="line">링크 속도</p></li></a>
				<span></span>
				<a href="javascript:func_menuClickevt(3);"><li class="menu_btn menu"><p class="line">링크 교통량</p></li></a>
				<span></span>
				<a href="javascript:func_menuClickevt(4);"><li class="menu_btn menu"><p class="line">음영 구간</p></li></a>
			</ul>
		</div>
	</header>
	<div id="map" style="width:100%;height:89.5%;"></div>
		<!-- 사이드바 영역-->
	<input type="checkbox" id="pold_r">
	<label for="pold_r">
		<span></span>
	</label>
	<div class="ex_bg">
		<ul class="bold font17">교차로 음영구간 범례
			<li><span class="circle"></span>음영구간 유형1</li>
			<li><span class="circle"></span>음영구간 유형2</li>
			<li><span class="circle"></span>음영구간 유형3</li>
			<li><span class="circle"></span>음영구간 유형4</li>
			<li><span class="circle"></span>음영구간 유형5</li>
			<li><span class="circle"></span>음영구간 유형6</li>
			<li><span class="circle"></span>정상 교차로</li>
		</ul>	
		
		<div class="ex_bottom">
			<ul class="bold font17">차로별 음영구간 범례
				<li><span class="square"></span>음영구간 유형1</li>
				<li><span class="square"></span>음영구간 유형2</li>
				<li><span class="square"></span>음영구간 유형3</li>
				<li><span class="square"></span>음영구간 유형4</li>
				<li><span class="square"></span>음영구간 유형5</li>
				<li><span class="square"></span>음영구간 유형6</li>
				<li><span class="square"></span>정상 차로</li>
			</ul>	
		</div>
	</div>

		
	
