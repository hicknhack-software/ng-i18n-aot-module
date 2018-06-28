import { Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
var DefaultLocaleIdentifier = '_____default-$$$-locale_____';
var NgI18nAotService = (function () {
    function NgI18nAotService(locales, forceLocaleExists) {
        if (locales === void 0) { locales = {}; }
        if (forceLocaleExists === void 0) { forceLocaleExists = false; }
        this.localeMap = {};
        this.locale = DefaultLocaleIdentifier;
        this.locale$ = new BehaviorSubject(DefaultLocaleIdentifier);
        this.forceLocaleExists = false;
        this.translationIdMap = {};
        this.registerLocales(locales);
        this.setForceLocaleExists(forceLocaleExists);
    }
    NgI18nAotService.prototype.setForceLocaleExists = function (forceLocaleExists) {
        if (forceLocaleExists === void 0) { forceLocaleExists = false; }
        this.forceLocaleExists = forceLocaleExists;
    };
    NgI18nAotService.prototype.getForceLocaleExists = function () {
        return this.forceLocaleExists;
    };
    NgI18nAotService.prototype.registerLocales = function (locales) {
        for (var code in locales) {
            if (!locales.hasOwnProperty(code)) {
                continue;
            }
            this.registerLocale(code, locales[code]);
        }
    };
    NgI18nAotService.prototype.registerLocale = function (code, name) {
        this.localeMap[code] = name;
    };
    NgI18nAotService.prototype.hasLocale = function (code) {
        return !!(this.localeMap.hasOwnProperty(code) && 'string' === typeof this.localeMap[code]);
    };
    NgI18nAotService.prototype.getLocaleName = function (code) {
        return this.hasLocale(code) ? this.localeMap[code] : null;
    };
    NgI18nAotService.prototype.getLocales = function () {
        return this.localeMap;
    };
    NgI18nAotService.prototype.unregisterLocale = function (code) {
        delete this.localeMap[code];
    };
    NgI18nAotService.prototype.clearLocales = function () {
        this.localeMap = {};
    };
    NgI18nAotService.prototype.setLocale = function (locale) {
        if (locale === void 0) { locale = null; }
        if ('string' === typeof locale && this.getForceLocaleExists() && !this.hasLocale(locale)) {
            return;
        }
        this.locale = locale || DefaultLocaleIdentifier;
        this.locale$.next(this.locale);
        this.renderAll(locale);
    };
    NgI18nAotService.prototype.getLocale = function () {
        return this.locale;
    };
    NgI18nAotService.prototype.getLocaleStream = function () {
        return this.locale$.asObservable();
    };
    NgI18nAotService.prototype.isDefaultLocale = function (locale) {
        return DefaultLocaleIdentifier === (locale ? locale : this.getLocale());
    };
    NgI18nAotService.prototype.subscribe = function (id, locale, isDefault, renderer) {
        var _this = this;
        if (!(id in this.translationIdMap)) {
            this.translationIdMap[id] = {};
        }
        this.translationIdMap[id][isDefault ? DefaultLocaleIdentifier : locale] = renderer;
        this.renderPartial(id, isDefault ? DefaultLocaleIdentifier : locale, this.getLocale());
        return function () { delete _this.translationIdMap[id][isDefault ? DefaultLocaleIdentifier : locale]; };
    };
    NgI18nAotService.prototype.renderAll = function (locale) {
        var _this = this;
        Object.keys(this.translationIdMap).forEach(function (id) {
            _this.render(id, locale);
        });
    };
    NgI18nAotService.prototype.render = function (id, locale) {
        var _this = this;
        var setLocale = Object.keys(this.translationIdMap[id]).filter(function (checkLocale) { return !!(checkLocale === locale); }).length ? locale : DefaultLocaleIdentifier;
        Object.keys(this.translationIdMap[id]).every(function (checkLocale) {
            _this.translationIdMap[id][checkLocale]((setLocale === checkLocale));
            return true;
        });
    };
    NgI18nAotService.prototype.renderPartial = function (id, targetLocale, currentLocale) {
        var setLocale = Object.keys(this.translationIdMap[id]).filter(function (checkLocale) { return !!(checkLocale === currentLocale); }).length ? currentLocale : DefaultLocaleIdentifier;
        var renderer = this.translationIdMap[id][targetLocale];
        if (renderer) {
            renderer((setLocale === targetLocale));
        }
    };
    NgI18nAotService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional },] },
        { type: undefined, decorators: [{ type: Optional },] },
    ]; };
    return NgI18nAotService;
}());
export { NgI18nAotService };
//# sourceMappingURL=ng-i18n-aot.service.js.map