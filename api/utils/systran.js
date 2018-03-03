var config = require('../../config');
var request = require('request-promise');
var systranUrl = 'https://api-platform.systran.net';
var apiKeyParam = 'key=' + config.apiKey;

exports.getTranslation = function(source, target, input) {
	var reqUrl = systranUrl + '/translation/text/translate?'
					+ apiKeyParam
					+ '&source=' + encodeURIComponent(source)
					+ '&target=' + encodeURIComponent(target)
					+ '&input=' + encodeURIComponent(input);
	return request(reqUrl);
};

exports.getSupportedLanguages = function(source) {
	var reqUrl = systranUrl + '/translation/supportedLanguages?'
					+ apiKeyParam
					+ '&source=' + source;
	return request(reqUrl);
};

exports.extractTranslationFromResponse = function(response) {
	if (typeof response === 'string') {
		response = JSON.parse(response);
	}
	if (response['outputs']
		&& response['outputs'].length
		&& response['outputs'][0]['output']) {
		return response['outputs'][0]['output'];
	}
	return '';
};