(function() {
 	// 路径配置
	require.config({
	    paths: {
	        echarts: 'js/echartsDist/'
	    }
	});

	var otheme;
	require(['echarts/theme'], function(theme) {otheme = theme;});

	var idChart1 = document.getElementById('chart1');
	var idChart2 = document.getElementById('chart2');
	var idChart3 = document.getElementById('chart3');
	
	if (!idChart1.style.width || !idChart1.style.height ||
		!idChart2.style.width || !idChart2.style.height ||
		!idChart3.style.width || !idChart3.style.height
		) {
		var chartWidth = (
			window.innerWidth || 
			document.documentElement.clientWidth || 
			document.body.clientWidth
		    ) * 0.7 + "px",
			chartHeight = (
			window.innerHeight || 
			document.documentElement.clientHeight || 
			document.body.clientHeight
		    ) * 0.65 + "px";

		idChart1.style.width = chartWidth;
		idChart1.style.height = chartHeight;
		idChart2.style.width = chartWidth;
		idChart2.style.height = chartHeight;
		idChart3.style.width = chartWidth;
		idChart3.style.height = chartHeight;
	}
	
		window.qcLib.addEvent(window, 'resize', function() {
			chartWidth = (
				window.innerWidth || 
				document.documentElement.clientWidth || 
				document.body.clientWidth
			    ) * 0.7 + "px";
			chartHeight = (
				window.innerHeight || 
				document.documentElement.clientHeight || 
				document.body.clientHeight
			    ) * 0.65 + "px";
		    idChart1.style.width = chartWidth;
			idChart1.style.height = chartHeight;
			idChart2.style.width = chartWidth;
			idChart2.style.height = chartHeight;
			idChart3.style.width = chartWidth;
			idChart3.style.height = chartHeight;     	
		});

		require(
		    [
		        'echarts',
		        'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
		    ],

		    function (ec) {
		        // 基于准备好的dom，初始化echarts图表
		        
		        var ecChart1 = ec.init(idChart1, otheme); 	  
		        window.qcLib.addEvent(window, 'resize', ecChart1.resize);
		        
				option = {
					backgroundColor: 'rgba(255,255,255,0.5)',
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    legend: {
				        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎','百度','谷歌','必应','其他']
				    },
				    toolbox: {
				        show : true,
				        orient: 'vertical',
				        x: 'right',
				        y: 'center',
				        feature : {
				            mark : {show: true},
				            dataView : {show: true, readOnly: false},
				            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            data : ['周一','周二','周三','周四','周五','周六','周日']
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:'直接访问',
				            type:'bar',
				            data:[320, 332, 301, 334, 390, 330, 320]
				        },
				        {
				            name:'邮件营销',
				            type:'bar',
				            stack: '广告',
				            data:[120, 132, 101, 134, 90, 230, 210]
				        },
				        {
				            name:'联盟广告',
				            type:'bar',
				            stack: '广告',
				            data:[220, 182, 191, 234, 290, 330, 310]
				        },
				        {
				            name:'视频广告',
				            type:'bar',
				            stack: '广告',
				            data:[150, 232, 201, 154, 190, 330, 410]
				        },
				        {
				            name:'搜索引擎',
				            type:'bar',
				            data:[862, 1018, 964, 1026, 1679, 1600, 1570],
				            markLine : {
				                itemStyle:{
				                    normal:{
				                        lineStyle:{
				                            type: 'dashed'
				                        }
				                    }
				                },
				                data : [
				                    [{type : 'min'}, {type : 'max'}]
				                ]
				            }
				        },
				        {
				            name:'百度',
				            type:'bar',
				            barWidth : 5,
				            stack: '搜索引擎',
				            data:[620, 732, 701, 734, 1090, 1130, 1120]
				        },
				        {
				            name:'谷歌',
				            type:'bar',
				            stack: '搜索引擎',
				            data:[120, 132, 101, 134, 290, 230, 220]
				        },
				        {
				            name:'必应',
				            type:'bar',
				            stack: '搜索引擎',
				            data:[60, 72, 71, 74, 190, 130, 110]
				        },
				        {
				            name:'其他',
				            type:'bar',
				            stack: '搜索引擎',
				            data:[62, 82, 91, 84, 109, 110, 120]
				        }
				    ]
				};

		        // 为echarts对象加载数据 
		        ecChart1.setOption(option); 
		    }
		);

	

		require(
		    [
		        'echarts',
		        'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
		    ],
		    function (ec) {
		        // 基于准备好的dom，初始化echarts图表
		        
		        var ecChart2 = ec.init(idChart2, otheme); 	  
		        window.qcLib.addEvent(window, 'resize', ecChart2.resize);
				option = {
					backgroundColor: 'rgba(255,255,255,0.5)',
				    title : {
				        text: '未来一周气温变化',
				        subtext: '纯属虚构'
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
				    legend: {
				        data:['最高气温','最低气温']
				    },
				    toolbox: {
				        show : true,
				        feature : {
				            mark : {show: true},
				            dataView : {show: true, readOnly: false},
				            magicType : {show: true, type: ['line', 'bar']},
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            boundaryGap : false,
				            data : ['周一','周二','周三','周四','周五','周六','周日']
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value',
				            axisLabel : {
				                formatter: '{value} °C'
				            }
				        }
				    ],
				    series : [
				        {
				            name:'最高气温',
				            type:'line',
				            data:[11, 11, 15, 13, 12, 13, 10],
				            markPoint : {
				                data : [
				                    {type : 'max', name: '最大值'},
				                    {type : 'min', name: '最小值'}
				                ]
				            },
				            markLine : {
				                data : [
				                    {type : 'average', name: '平均值'}
				                ]
				            }
				        },
				        {
				            name:'最低气温',
				            type:'line',
				            data:[1, -2, 2, 5, 3, 2, 0],
				            markPoint : {
				                data : [
				                    {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
				                ]
				            },
				            markLine : {
				                data : [
				                    {type : 'average', name : '平均值'}
				                ]
				            }
				        }
				    ]
};

		        // 为echarts对象加载数据 
		        ecChart2.setOption(option); 
		    }
		);



		require(
		    [
		        'echarts',
		        'echarts/chart/pie' // 使用柱状图就加载bar模块，按需加载
		    ],
		    function (ec) {
		        // 基于准备好的dom，初始化echarts图表
		        
		        var ecChart3 = ec.init(idChart3, otheme); 	  
		        window.qcLib.addEvent(window, 'resize', ecChart3.resize);
				option = {
					backgroundColor: 'rgba(255,255,255,0.5)',
				    title : {
				        text: '南丁格尔玫瑰图',
				        subtext: '纯属虚构',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        x : 'center',
				        y : 'bottom',
				        data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
				    },
				    toolbox: {
				        show : true,
				        feature : {
				            mark : {show: true},
				            dataView : {show: true, readOnly: false},
				            magicType : {
				                show: true, 
				                type: ['pie', 'funnel']
				            },
				            restore : {show: true},
				            saveAsImage : {show: true}
				        }
				    },
				    calculable : true,
				    series : [
				        {
				            name:'半径模式',
				            type:'pie',
				            radius : [20, 110],
				            center : ['25%', 200],
				            roseType : 'radius',
				            width: '40%',       // for funnel
				            max: 40,            // for funnel
				            itemStyle : {
				                normal : {
				                    label : {
				                        show : false
				                    },
				                    labelLine : {
				                        show : false
				                    }
				                },
				                emphasis : {
				                    label : {
				                        show : true
				                    },
				                    labelLine : {
				                        show : true
				                    }
				                }
				            },
				            data:[
				                {value:10, name:'rose1'},
				                {value:5, name:'rose2'},
				                {value:15, name:'rose3'},
				                {value:25, name:'rose4'},
				                {value:20, name:'rose5'},
				                {value:35, name:'rose6'},
				                {value:30, name:'rose7'},
				                {value:40, name:'rose8'}
				            ]
				        },
				        {
				            name:'面积模式',
				            type:'pie',
				            radius : [30, 110],
				            center : ['75%', 200],
				            roseType : 'area',
				            x: '50%',               // for funnel
				            max: 40,                // for funnel
				            sort : 'ascending',     // for funnel
				            data:[
				                {value:10, name:'rose1'},
				                {value:5, name:'rose2'},
				                {value:15, name:'rose3'},
				                {value:25, name:'rose4'},
				                {value:20, name:'rose5'},
				                {value:35, name:'rose6'},
				                {value:30, name:'rose7'},
				                {value:40, name:'rose8'}
				            ]
				        }
				    ]
				};

		        // 为echarts对象加载数据 
		        ecChart3.setOption(option); 
		    }
		);


})();

 