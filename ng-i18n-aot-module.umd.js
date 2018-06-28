(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('ngI18nAotModule', ['exports', '@angular/core', 'rxjs'], factory) :
    (factory((global.ngI18nAotModule = {}),global.ng.core,null));
}(this, (function (exports,core,rxjs) { 'use strict';

    var DefaultLocaleIdentifier = '_____default-$$$-locale_____';
    var NgI18nAotService = (function () {
        function NgI18nAotService(locales, forceLocaleExists) {
            if (locales === void 0) { locales = {}; }
            if (forceLocaleExists === void 0) { forceLocaleExists = false; }
            this.localeMap = {};
            this.locale = DefaultLocaleIdentifier;
            this.locale$ = new rxjs.BehaviorSubject(DefaultLocaleIdentifier);
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
            { type: undefined, decorators: [{ type: core.Optional },] },
            { type: undefined, decorators: [{ type: core.Optional },] },
        ]; };
        return NgI18nAotService;
    }());

    var NgI18nAotDirective = (function () {
        function NgI18nAotDirective(ngI18nAotService, templateReference, viewContainerReference, changeDetectorReference) {
            this.isDefault = false;
            this.ngI18nAotService = ngI18nAotService;
            this.templateReference = templateReference;
            this.viewContainerReference = viewContainerReference;
            this.changeDetectorReference = changeDetectorReference;
            this.viewContainerReference.clear();
        }
        NgI18nAotDirective.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.ngI18nAotServiceUnsubscribeCallback = this.ngI18nAotService.subscribe(this.id, this.locale, this.isDefault, function (display) {
                _this.viewContainerReference.clear();
                if (display) {
                    _this.viewContainerReference.createEmbeddedView(_this.templateReference);
                }
                _this.changeDetectorReference.detectChanges();
            });
        };
        NgI18nAotDirective.prototype.ngOnDestroy = function () {
            if (this.ngI18nAotServiceUnsubscribeCallback) {
                this.ngI18nAotServiceUnsubscribeCallback();
            }
        };
        Object.defineProperty(NgI18nAotDirective.prototype, "ngI18nAot", {
            set: function (id) {
                this.id = id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgI18nAotDirective.prototype, "ngI18nAotLocale", {
            set: function (locale) {
                this.locale = locale;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NgI18nAotDirective.prototype, "ngI18nAotIsDefault", {
            set: function (isDefault) {
                this.isDefault = isDefault;
            },
            enumerable: true,
            configurable: true
        });
        NgI18nAotDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[ngI18nAot]'
                    },] },
        ];
        NgI18nAotDirective.ctorParameters = function () { return [
            { type: NgI18nAotService, },
            { type: core.TemplateRef, },
            { type: core.ViewContainerRef, },
            { type: core.ChangeDetectorRef, },
        ]; };
        NgI18nAotDirective.propDecorators = {
            "ngI18nAot": [{ type: core.Input },],
            "ngI18nAotLocale": [{ type: core.Input },],
            "ngI18nAotIsDefault": [{ type: core.Input },],
        };
        return NgI18nAotDirective;
    }());

    var NgI18nAotOptionsToken = new core.InjectionToken('NgI18nAotOptions');
    function NgI18nAotServiceFactory(options) {
        return new NgI18nAotService(options.hasOwnProperty('locales') ? options.locales : {}, options.hasOwnProperty('forceLocaleExists') ? options.forceLocaleExists : false);
    }
    var NgI18nAotModule = (function () {
        function NgI18nAotModule() {
        }
        NgI18nAotModule.forRoot = function (options) {
            return {
                ngModule: NgI18nAotModule,
                providers: [
                    {
                        provide: NgI18nAotOptionsToken,
                        useValue: (options || {})
                    },
                    {
                        provide: NgI18nAotService,
                        useFactory: NgI18nAotServiceFactory,
                        deps: [NgI18nAotOptionsToken]
                    }
                ]
            };
        };
        NgI18nAotModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [NgI18nAotDirective],
                        exports: [NgI18nAotDirective]
                    },] },
        ];
        return NgI18nAotModule;
    }());

    exports.NgI18nAotDirective = NgI18nAotDirective;
    exports.NgI18nAotOptionsToken = NgI18nAotOptionsToken;
    exports.NgI18nAotServiceFactory = NgI18nAotServiceFactory;
    exports.NgI18nAotModule = NgI18nAotModule;
    exports.NgI18nAotService = NgI18nAotService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
