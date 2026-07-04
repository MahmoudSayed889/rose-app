# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Build Commands (Non-Standard)

**Library watch mode** (from README, not in package.json):
```bash
ng build reusable-components --watch
ng build auth-library --watch
```

Libraries must be built to `dist/` before main app can import them (see tsconfig paths).

## Code Style (Project-Specific)

**Custom decorator**: Use `@Service()` instead of `@Injectable({ providedIn: 'root' })` for all services
- Found in: [`src/app/shared/services/helper.service.ts`](src/app/shared/services/helper.service.ts:5), [`projects/auth-library/src/lib/services/auth.service.ts`](projects/auth-library/src/lib/services/auth.service.ts:21)

**Component naming**: Angular schematics configured with `addTypeToClassName: true`
- Components: `*.component.ts` (e.g., `LoginComponent`)
- Services: `*.service.ts` (e.g., `AuthService`)
- Directives: `*.directive.ts`
- Guards/Interceptors: Use dot separator (e.g., `error.interceptor.ts`)

**Base class pattern**: Components extend [`AppComponentBase`](src/app/shared/app-component-base.ts:6) for shared utilities
- Provides: `_toastService`, `_cookieService`, `currentUser` signal, `formSubmited` signal, `errorsMsg` signal, `paginator` signal
- User stored in cookies as JSON string

**Library imports**: Use bare imports from built libraries
```typescript
import { AuthService } from 'auth-library';
import { InputComponent, ButtonComponent } from 'reusable-components';
```

## Architecture (Non-Obvious)

**Adaptor pattern**: [`auth-library`](projects/auth-library/src/lib/services/adaptor/auth-adapt.service.ts:10) uses adaptor service to transform backend responses
- Backend interfaces in `interfaces/back-interfaces/`
- Frontend interfaces in `interfaces/`
- Adaptor transforms between them

**Abstract API pattern**: [`AuthAPI`](projects/auth-library/src/lib/base/AuthAPI.ts:13) abstract class defines contract, [`AuthService`](projects/auth-library/src/lib/services/auth.service.ts:21) implements it

**Signal-based state**: Project uses Angular signals extensively (not reactive forms for state)
- Theme stored in cookies, managed via signals
- User state in `AppComponentBase.currentUser` signal

## Testing

Uses Vitest (not Karma/Jasmine) - configured in [`tsconfig.spec.json`](tsconfig.spec.json:8) with `vitest/globals`

Run tests: `npm test` (or `ng test`)