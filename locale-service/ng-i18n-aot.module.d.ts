import { InjectionToken, ModuleWithProviders } from '@angular/core';
import { NgI18nAotService } from './ng-i18n-aot.service';
export declare type NgI18nAotOptions = {
    locales?: {
        [key: string]: string;
    };
    forceLocaleExists?: boolean;
};
export declare const NgI18nAotOptionsToken: InjectionToken<NgI18nAotOptions>;
export declare function NgI18nAotServiceFactory(options: NgI18nAotOptions): NgI18nAotService;
export declare class NgI18nAotModule {
    static forRoot(options?: {
        locales?: {
            [key: string]: string;
        };
        forceLocaleExists?: boolean;
    }): ModuleWithProviders;
}
