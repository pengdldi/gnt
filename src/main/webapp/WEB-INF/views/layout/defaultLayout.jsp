<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib prefix="decorator" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<%@ taglib prefix="page" uri="http://www.opensymphony.com/sitemesh/page" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<% response.setHeader("Access-Control-Allow-Origin","*"); %>

<html>
<head>
	<title><decorator:title default="교통정보 음영구간 정보생성 시스템"/></title>
	<!-- jquery -->
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/jquery-2.1.1.min.js"></script>
	<!-- 공통 js --> 
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/openlayers_v6.4.3.js"></script>
	<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
	<script src="${pageContext.request.contextPath}/js/common/proj4.js"></script>
	<script src="${pageContext.request.contextPath}/js/common/bootstrap.bundle.min.js"></script>
	<script type="text/javascript" src="//map.ngii.go.kr/openapi/wmts_ngiiMap_v6.4.3.js?apikey=598499CCD3240E8AF39197A252D90FDF"></script>
	<!-- css -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/openlayers_v6.4.3.css" type="text/css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/bootstrap.min.css" type="text/css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/menu.css" type="text/css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/common/tmp.css" type="text/css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/normalize8.0.1.css" type="text/css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/reset.css" type="text/css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/common.css" type="text/css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css" type="text/css">

	
	<!-- 파비콘 -->
	<link rel="icon" href="${pageContext.request.contextPath}/img/favicon.jpg">
	<decorator:head />
</head>
<body>
	<form name="pageNum" method="post">
		<input type="hidden" id="pageNum" name="pageNum" value="${pageNum}" />
	</form> 
	<input type="hidden" id="hour" name="hour" value="${hour}" />
	<div id="wrap">
		<page:applyDecorator name="top" />
		
		<decorator:body />
	</div>
	<page:applyDecorator name="footer" />
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/menuEvent.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/menuFunc.js"></script>
</body>
</html>