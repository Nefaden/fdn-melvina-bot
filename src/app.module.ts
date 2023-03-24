import 'reflect-metadata';
import { Provider, ReflectiveInjector } from "injection-js";
import { OutingsService } from './infra/outing.service';

export class AppModule {
    private static injector: ReflectiveInjector;
    private static providers: Provider[] = [
        OutingsService
    ]

    private constructor() { }

    public static getInjector(): ReflectiveInjector {
        if (!AppModule.injector) {
            AppModule.injector = ReflectiveInjector.resolveAndCreate(this.providers);
        }

        return AppModule.injector;
    }
}
