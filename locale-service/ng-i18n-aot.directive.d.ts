import { AfterViewInit, ChangeDetectorRef, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgI18nAotService } from './ng-i18n-aot.service';
export declare class NgI18nAotDirective implements AfterViewInit, OnDestroy {
    protected ngI18nAotService: NgI18nAotService;
    protected ngI18nAotServiceUnsubscribeCallback: () => void;
    protected templateReference: TemplateRef<any>;
    protected viewContainerReference: ViewContainerRef;
    protected changeDetectorReference: ChangeDetectorRef;
    protected id: string;
    protected locale: string;
    protected isDefault: boolean;
    constructor(ngI18nAotService: NgI18nAotService, templateReference: TemplateRef<any>, viewContainerReference: ViewContainerRef, changeDetectorReference: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngI18nAot: string;
    ngI18nAotLocale: string;
    ngI18nAotIsDefault: boolean;
}
