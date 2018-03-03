exports.hasTarget = function(arr, target) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i]['target'] === target){
			return true;
		}
	}
	return false;
};

exports.findPivot = function(sourceArr, targetArr) {
	for (var i = 0; i < sourceArr.length; i++) {
		for (var j = 0; j < targetArr.length; j++) {
			if (sourceArr[i]['target'] === targetArr[j]['target']) {
				return sourceArr[i]['target'];
			}
		}
	}

	return '';
};