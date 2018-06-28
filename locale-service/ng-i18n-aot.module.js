import { InjectionToken, NgModule } from '@angular/core';
import { NgI18nAotDirective } from './ng-i18n-aot.directive';
import { NgI18nAotService } from './ng-i18n-aot.service';
export var NgI18nAotOptionsToken = new InjectionToken('NgI18nAotOptions');
export function NgI18nAotServiceFactory(options) {
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
        { type: NgModule, args: [{
                    declarations: [NgI18nAotDirective],
                    exports: [NgI18nAotDirective]
                },] },
    ];
    return NgI18nAotModule;
}());
export { NgI18nAotModule };
//# sourceMappingURL=ng-i18n-aot.module.js.map