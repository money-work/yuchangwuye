$(function () {

	$(".payment-history-list-page .payment-list-collapse").css("height", $("body").height() - $("header").height() - $(".owner-information").height() - 70);
	addEvent();

	function addEvent() {

		$(".payment-history-list-page").on("click", ".ant-collapse-item", function () {
			if ($(this).hasClass("ant-collapse-item-active")) {
				$(this).removeClass("ant-collapse-item-active");
				$(this).find(".ant-collapse-header").attr("aria-expanded", false);
				$(this).find(".ant-collapse-content").removeClass("ant-collapse-item-active");
			} else {
				//如果可以同时打开多个小区的房产列表可以去掉以下三行
				$(".payment-history-list-page").find(".ant-collapse-item-active").removeClass("ant-collapse-item-active");
				$(".payment-history-list-page").find(".ant-collapse-header").attr("aria-expanded", false);
				$(".payment-history-list-page").find(".ant-collapse-content").removeClass("ant-collapse-item-active");

				$(this).addClass("ant-collapse-item-active");
				$(this).find(".ant-collapse-header").attr("aria-expanded", true);
				$(this).find(".ant-collapse-content").addClass("ant-collapse-item-active");
			}
		});
		$(".payment-history-list-page").on("click", ".ant-collapse-content-box a", function () {
			// 跳转到缴费历史详情页；
			e.stopPropagation();
		})
	}

});