$(function () {

	var parms = {
		opt: {
			date: {preset: 'date'},
			datetime: {preset: 'datetime'},
			time: {preset: 'time'},
			defaultConfig: {
				theme: 'android-ics light', //皮肤样式
				display: 'modal', //显示方式
				mode: 'scroller', //日期选择模式
				dateFormat: 'yyyy-mm-dd',
				lang: 'zh',
				showNow: true,
				nowText: "今天",
				startYear: (new Date()).getFullYear() - 50, //开始年份
				endYear: (new Date()).getFullYear() + 1 //结束年份}
			}
		},
		startTime: "",
		endTime: ""
	};
	startTimer();
	endTimer();
	addEvent();

	function startTimer() {
		var opt = JSON.parse(JSON.stringify(parms.opt));
		// var opt = parms.opt;
		opt.defaultConfig.onClose = function (event, inst) {
			if (inst == "set") {
				parms.startTime = event;
			}
		};
		$("#startTime").mobiscroll($.extend(opt['date'], opt['defaultConfig']));
	}

	function endTimer() {
		var opt = JSON.parse(JSON.stringify(parms.opt));
		opt.defaultConfig.onClose = function (event, inst) {
			if (inst == "set") {
				parms.endTime = event;
			}
		};
		$("#endTime").mobiscroll($.extend(opt['date'], opt['defaultConfig']));
	}

	function addEvent() {
		$(".payment-history-info-page").on("click", ".search-btn", function (e) {
			e.stopPropagation();
			var startTime = new Date(Date.parse(parms.startTime));
			var endTime = new Date(Date.parse(parms.endTime));
			if (!parms.startTime || !parms.endTime) {
				toast('请选择时间范围');
				return false;
			}
			if (startTime > endTime) {
				toast('结束时间不能小于开始时间');
				return false;
			}
			console.log(parms.startTime, parms.endTime);
		})
	}
});