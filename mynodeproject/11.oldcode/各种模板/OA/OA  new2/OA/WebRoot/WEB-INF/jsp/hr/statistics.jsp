<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page contentType="text/html;charset=UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@taglib uri="/prev-tag" prefix="slp"%>
<!doctype html>
<html>
<head>
<%@include file="/WEB-INF/jsp/public/header.jspf"%>
</head>
<body>
	<%@include file="/WEB-INF/jsp/index/header.jsp"%>
	<%@include file="/WEB-INF/jsp/public/tools.jsp"%>

	<div class="am-cf admin-main">
		<%@include file="/WEB-INF/jsp/index/menu.jsp"%>
		<div class="admin-content">
			<div class="am-cf am-padding">
				<div class="am-fl am-cf">
					<small>位置</small>：<small>人事管理中心</small>/<small>图表统计</small>
				</div>
			</div>
			<div>
				<div id="main"
					style="height:450px;border:1px solid #ccc;padding:10px;float: left;width: 50%;"></div>
				<div id="mainMap"
					style="height:450px;border:1px solid #ccc;padding:10px;float: left;width: 50%;"></div>
			</div>
		</div>

	</div>
	<%@include file="/WEB-INF/jsp/index/foot.jsp"%>
	<script src="${pageContext.request.contextPath}/js/echarts/echarts.js"></script>
	<script type="text/javascript">
		//alert("???ppp");
		// Step:3 conifg ECharts's path, link to echarts.js from current page.
		// Step:3 为模块加载器配置echarts的路径，从当前页面链接到echarts.js，定义所需图表路径
		var ctx = "${pageContext.request.contextPath}";
		require.config({
			paths : {
				echarts : ctx + "/js/echarts"
			}
		});

		// Step:4 require echarts and use it in the callback.
		// Step:4 动态加载echarts然后在回调函数中开始使用，注意保持按需加载结构定义图表路径
		require([ 'echarts', 'echarts/chart/pie','echarts/chart/bar' ], function(ec) {
			var dataMan = "${map.countMan}";
			var dataWman = "${map.countWman}";
			/* var data3 = "[{count:" + dataMan + ",name:'男'},{count:" + dataWman + ",name:'女'}]";
			alert(data3); */
			//[ {value : 20,name : '男'}, {value : 5,name : '女'} ]
			var myChart = ec.init(document.getElementById('main'));
			var option = {
				title : {
					text : '企业员工男女比例',
					x : 'center'
				},
				tooltip : {
					trigger : 'item',
					formatter : "{a} <br/>{b} : {c} ({d}%)"
				},
				legend : {
					orient : 'vertical',
					x : 'left',
					data : [ '男', '女' ]
				},
				toolbox : {
					show : true,
					feature : {
						mark : {
							show : true
						},
						dataView : {
							show : true,
							readOnly : false
						},
						magicType : {
							show : true,
							type : [ 'pie', 'funnel' ],
							option : {
								funnel : {
									x : '25%',
									width : '50%',
									funnelAlign : 'left',
									max : 1548
								}
							}
						},
						restore : {
							show : true
						},
						saveAsImage : {
							show : true
						}
					}
				},
				calculable : true,
				series : [ {
					name : '男女员工比例',
					type : 'pie',
					radius : '55%',
					center : [ '50%', '60%' ],
					data : [ {
						value : dataMan,
						name : '男'
					}, {
						value : dataWman,
						name : '女'
					} ]
				} ]
			};
			myChart.setOption(option);
			//[ {value : 20,name : '男'}, {value : 5,name : '女'} ]
			var myChart2 = ec.init(document.getElementById('mainMap'));
			var option2 = {
				title : {
					text : '某地区蒸发量和降水量',
					subtext : '只做样式'
				},
				tooltip : {
					trigger : 'axis'
				},
				legend : {
					data : [ '蒸发量', '降水量' ]
				},
				toolbox : {
					show : true,
					feature : {
						mark : {
							show : true
						},
						dataView : {
							show : true,
							readOnly : false
						},
						magicType : {
							show : true,
							type : [ 'line', 'bar' ]
						},
						restore : {
							show : true
						},
						saveAsImage : {
							show : true
						}
					}
				},
				calculable : true,
				xAxis : [ {
					type : 'category',
					data : [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月',
							'9月', '10月', '11月', '12月' ]
				} ],
				yAxis : [ {
					type : 'value'
				} ],
				series : [
						{
							name : '蒸发量',
							type : 'bar',
							data : [ 2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6,
									162.2, 32.6, 20.0, 6.4, 3.3 ],
							markPoint : {
								data : [ {
									type : 'max',
									name : '最大值'
								}, {
									type : 'min',
									name : '最小值'
								} ]
							},
							markLine : {
								data : [ {
									type : 'average',
									name : '平均值'
								} ]
							}
						},
						{
							name : '降水量',
							type : 'bar',
							data : [ 2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6,
									182.2, 48.7, 18.8, 6.0, 2.3 ],
							markPoint : {
								data : [ {
									name : '年最高',
									value : 182.2,
									xAxis : 7,
									yAxis : 183,
									symbolSize : 18
								}, {
									name : '年最低',
									value : 2.3,
									xAxis : 11,
									yAxis : 3
								} ]
							},
							markLine : {
								data : [ {
									type : 'average',
									name : '平均值'
								} ]
							}
						} ]
			};
			myChart2.setOption(option2);
		});
	</script>
</body>
</html>