import { BehaviorSubject, Observable } from 'rxjs';
export declare class NgI18nAotService {
    protected localeMap: {
        [key: string]: string;
    };
    protected locale: string;
    protected locale$: BehaviorSubject<string>;
    protected forceLocaleExists: boolean;
    protected translationIdMap: {
        [key: string]: {
            [key: string]: (display: boolean) => void;
        };
    };
    constructor(locales?: {
        [key: string]: string;
    }, forceLocaleExists?: boolean);
    setForceLocaleExists(forceLocaleExists?: boolean): void;
    getForceLocaleExists(): boolean;
    registerLocales(locales: {
        [key: string]: string;
    }): void;
    registerLocale(code: string, name: string): void;
    hasLocale(code: string): boolean;
    getLocaleName(code: string): string | null;
    getLocales(): {
        [key: string]: string;
    };
    unregisterLocale(code: string): void;
    clearLocales(): void;
    setLocale(locale?: string | null): void;
    getLocale(): string;
    getLocaleStream(): Observable<string>;
    isDefaultLocale(locale?: string): boolean;
    subscribe(id: string, locale: string, isDefault: boolean, renderer: (display: boolean) => void): () => void;
    protected renderAll(locale: string): void;
    protected render(id: string, locale: string): void;
    protected renderPartial(id: string, targetLocale: string, currentLocale: string): void;
}
