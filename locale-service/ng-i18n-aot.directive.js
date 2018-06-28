import { ChangeDetectorRef, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgI18nAotService } from './ng-i18n-aot.service';
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
        { type: Directive, args: [{
                    selector: '[ngI18nAot]'
                },] },
    ];
    NgI18nAotDirective.ctorParameters = function () { return [
        { type: NgI18nAotService, },
        { type: TemplateRef, },
        { type: ViewContainerRef, },
        { type: ChangeDetectorRef, },
    ]; };
    NgI18nAotDirective.propDecorators = {
        "ngI18nAot": [{ type: Input },],
        "ngI18nAotLocale": [{ type: Input },],
        "ngI18nAotIsDefault": [{ type: Input },],
    };
    return NgI18nAotDirective;
}());
export { NgI18nAotDirective };
//# sourceMappingURL=ng-i18n-aot.directive.js.map