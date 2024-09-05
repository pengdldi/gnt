<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko" xmlns:th="http://www.thymeleaf.org">
<!--headerFragment ì ì¸-->
<th:block th:fragment="headerFragment">
<head>
<meta charset="utf-8">
<title>음영구간 운영 시스템</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/openlayers_v6.4.3.css" type="text/css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/bootstrap.min.css" type="text/css">
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/openlayers_v6.4.3.js"></script>
<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
<script src="${pageContext.request.contextPath}/js/common/proj4.js"></script>
<script src="${pageContext.request.contextPath}/js/common/bootstrap.bundle.min.js"></script>
<script type="text/javascript" src="//map.ngii.go.kr/openapi/wmts_ngiiMap_v6.4.3.js?apikey=598499CCD3240E8AF39197A252D90FDF"></script>
</head>
</th:block>
</html>