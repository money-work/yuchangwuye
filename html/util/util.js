function calcIDCardCode(isShenFenZheng, idCardBody) {
	if (idCardBody.length != 17) {
		return '';
	}
	// 加权因子
	var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
	// 校验码对应值
	var code = isShenFenZheng ? ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'] : ['1', '0', '5', '9', '8', '7', '6', '5', '4', '3', '2'];
	var checksum = 0;
	for (var i = 0; i < idCardBody.length; i++) {
		checksum += idCardBody.substr(i, 1) * factor[i];
	}
	return code[checksum % 11];
}

function check18IDCard(isShenFenZheng, idCard) {

	if (isShenFenZheng && idCard.length != 18) {
		return false;
	} else if (!isShenFenZheng && idCard.length != 14) {
		return false;
	}
	var idCardBody = idCard.substr(0, 17);
	var idCardCode = idCard.substr(17, 1).toUpperCase();
	if (calcIDCardCode(isShenFenZheng, idCardBody) != idCardCode) {
		return false;
	}
	return true;
}


function toast(str) {
	$(".toast").remove();
	var element = '<div  class="toast font-normal"><div class="toast-text">' + str + '</div></div>';
	$("body").append(element);
	setTimeout(function () {
		$(".toast").remove();
	}, 1500);
}