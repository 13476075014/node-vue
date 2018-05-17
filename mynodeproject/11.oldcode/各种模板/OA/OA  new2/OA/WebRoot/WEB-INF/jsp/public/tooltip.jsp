<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page contentType="text/html;charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<small class="tooltips" <c:if test="${requestScope.errorFlags== null || !requestScope.errorFlags}">style="display:none;"</c:if> >${requestScope.message }</small>