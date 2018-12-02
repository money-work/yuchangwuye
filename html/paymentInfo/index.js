$(function () {
	var params = {
		ele: ".payment-info-page",
		allMoney: 0.0,
		allIDs: [],
		checkedBoxEle: $(".payment-info-page .checkbox-group li .ant-checkbox.ant-checkbox-checked"),
		checkBoxEle: $(".payment-info-page .checkbox-all .ant-checkbox")
	};
	checkekAllState();
	getAllMoney();
	addEvent();

	function addEvent() {
		$(params.ele).on("click", ".checkbox-group li", function (e) {
			e.preventDefault();
			if ($(this).attr("data-type") == "disabled") {
				return false
			}
			if ($(this).find(".ant-checkbox").hasClass("ant-checkbox-checked")) {
				$(this).find(".ant-checkbox").removeClass("ant-checkbox-checked");
			} else {
				$(this).find(".ant-checkbox").addClass("ant-checkbox-checked");
			}
			checkekAllState();
			getAllMoney();
		});

		$(params.ele).on("click", ".checkbox-all .ant-checkbox-wrapper", function (e) {
			e.preventDefault();
			var disabledCheckedLen = $(".payment-info-page .checkbox-group li[data-type='disabled']").length;
			if ($(".payment-info-page .checkbox-group li").length == disabledCheckedLen) {
				return false;
			}

			if ($(this).find(".ant-checkbox").hasClass("ant-checkbox-checked")) {
				if (disabledCheckedLen > 0 && disabledCheckedLen < $(params.ele + " .checkbox-group li").length) {
					$(this).find(".ant-checkbox").removeClass("ant-checkbox-checked").addClass("ant-checkbox-indeterminate");
				} else {
					$(this).find(".ant-checkbox").removeClass("ant-checkbox-checked");
				}
				$(params.ele).find(".checkbox-group li[data-type!='disabled']").each(function () {
					$(this).find(".ant-checkbox-checked").removeClass("ant-checkbox-checked");
				})
			} else {

				$(this).find(".ant-checkbox").removeClass("ant-checkbox-indeterminate").addClass("ant-checkbox-checked");
				$(params.ele).find(".checkbox-group li[data-type!='disabled']").each(function () {
					$(this).find(".ant-checkbox").addClass("ant-checkbox-checked");
				})
			}
			getAllMoney();
		});
	};

	function getAllMoney() {
		params.allIDs = [];
		params.allMoney = "0.0";
		var allMoney = 0;
		$(params.ele).find(".checkbox-group li .ant-checkbox-checked").each(function () {
			var money = parseFloat($(this).parent().find(".money").attr("data-money"));
			var id = parseFloat($(this).parent().find(".money").attr("data-id"));
			allMoney += money;
			params.allIDs.push(id);
		});
		params.allMoney = allMoney > 0 ? allMoney : "0.0";
		$(params.ele + " .statistics-content span.all-money").text(params.allMoney);

	};

	function checkekAllState() {
		var checkedBoxEle = params.checkedBoxEle,
			checkBoxEle = params.checkBoxEle;
		if ($(params.ele + " .checkbox-group li").length != 0) {
			if (checkedBoxEle.length > 0 && checkedBoxEle.length < $(params.ele + " .checkbox-group li").length) {
				checkBoxEle.removeClass("ant-checkbox-checked");
				checkBoxEle.addClass("ant-checkbox-indeterminate");
			} else if (checkedBoxEle.length == $(params.ele + " .checkbox-group li").length) {
				checkBoxEle.removeClass("ant-checkbox-indeterminate");
				checkBoxEle.addClass("ant-checkbox-checked");
			} else {
				checkBoxEle.removeClass("ant-checkbox-checked").removeClass("ant-checkbox-indeterminate");
			}
		}

	}

});