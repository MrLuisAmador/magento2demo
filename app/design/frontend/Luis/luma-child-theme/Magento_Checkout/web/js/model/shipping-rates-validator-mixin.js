define([
    'jquery',
    'mage/utils/wrapper',
    'Magento_Checkout/js/model/postcode-validator',
    'mage/translate'
], function (
    $,
    wrapper,
    postcodeValidator,
    $t
) {
    'use strict';

    return function (shippingRatesValidator) {
        shippingRatesValidator.postcodeValidation = wrapper.wrapSuper(shippingRatesValidator.postcodeValidation, function (postcodeElement) {
            this._super(postcodeElement);

            // add extended functionality here or modify method logic altogether
            var countryId = $('select[name="country_id"]:visible').val(),
                validationResult,
                warnMessage;

            if (postcodeElement == null || postcodeElement.value() == null) {
                return true;
            }

            postcodeElement.warn(null);
            validationResult = postcodeValidator.validate(postcodeElement.value(), countryId);

            if (!validationResult) {
                warnMessage = $t('Simple Postcode example... from theme');
                postcodeElement.warn(warnMessage);
            }
        });

        return shippingRatesValidator;
    };
});
