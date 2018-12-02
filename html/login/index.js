// ant-btn-loading

$(function () {

	addEvent();


	function addEvent() {
		$(".ant-btn-primary").on("click", function () {

			login($(this));
		});
	}

	function login($this) {
		if ($this.hasClass("ant-btn-loading")) {
			return;
		}

		var name = $("#name").val().trim(),
			idCardNo = $("#idCardNo").val().trim(),
			phone = $("#phone").val().trim();

		if (!name) {
			toast('请输入业主姓名');
			$("#name").focus();
			return false;
		}

		if (!idCardNo || !check18IDCard(true, idCardNo)) {
			toast("请填写正确的身份证号码");
			$("#idCardNo").focus();
			return false;
		}
		if (!/^1\d{10}$/.test(phone)) {
			toast('请输入正确的手机号');
			$("#phone").focus();
			return false;
		}
		$this.addClass("ant-btn-loading");
		$.ajax({
			url: "",
			type: "post",
			data: {
				"name": name,
				"idCardNo": idCardNo,
				"phone": phone
			},
			success: function (result) {
				$this.removeClass("ant-btn-loading");
			},
			error: function () {
				$this.removeClass("ant-btn-loading");
			}
		});
	}
});