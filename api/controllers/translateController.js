var systran = require('../utils/systran');
var arrayUtils = require('../utils/array');
var errorUtils = require('../utils/error');


exports.translateText = function(req, res) {
	var sourceLanguage = req.query.sourceLanguage;
	var targetLanguage = req.query.targetLanguage;
	var input = req.query.input;

	if (!sourceLanguage || !targetLanguage || !input) {
		res.statusCode = 418;
		res.send('Missing params');
	} else {
		// Get source supported languages
		systran.getSupportedLanguages(sourceLanguage).then(function(data) {
			var sourceLanguagePairs = JSON.parse(data)['languagePairs'];

			if (!sourceLanguagePairs || !sourceLanguagePairs.length) {
				errorUtils.returnError(res, 'Invalid source language', 400);
				return;
			}

			// Don't need pivot? Send translation directly
			if (arrayUtils.hasTarget(sourceLanguagePairs, targetLanguage)) {
				systran.getTranslation(sourceLanguage, targetLanguage, input).then(function(response) {
					res.statusCode = 200;
					res.send(systran.extractTranslationFromResponse(response));
				}).catch(errorUtils.handlePromiseError.bind(null, res));
			} else {
				// Get target pairs
				systran.getSupportedLanguages(targetLanguage).then(function(data) {
					var targetLanguagePairs = JSON.parse(data)['languagePairs'];
					if (!targetLanguagePairs || !targetLanguagePairs.length) {
						errorUtils.returnError(res, 'Invalid target language', 400);
						return;
					}
					// Find common targets in each supported languages
					var pivot = arrayUtils.findPivot(sourceLanguagePairs, targetLanguagePairs);
					if (!pivot) {
						errorUtils.returnError(res, 'Could not find a pivot language', 400);
						return;
					}

					// Translate to pivot
					systran.getTranslation(sourceLanguage, pivot, input).then(function(pivotResponse) {
						// Translate to target
						systran.getTranslation(pivot, targetLanguage, systran.extractTranslationFromResponse(pivotResponse)).then(function(finalResponse) {
							res.statusCode = 200;
							res.send(systran.extractTranslationFromResponse(finalResponse));
						}).catch(errorUtils.handlePromiseError.bind(null, res));
					}).catch(errorUtils.handlePromiseError.bind(null, res));
				}).catch(errorUtils.handlePromiseError.bind(null, res));
			}
		}).catch(errorUtils.handlePromiseError.bind(null, res));
	}
};