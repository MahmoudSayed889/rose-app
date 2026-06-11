# reusable-components

## Overview

`reusable-components` is a shared Angular library in this workspace that provides standalone UI components for use across applications. It currently exports `InputComponent`, a form-aware text input that implements `ControlValueAccessor` and works with Angular Reactive Forms and `ngModel`.

## Installation/Import

Within this workspace, the library is consumed via a TypeScript path mapping in the root `tsconfig.json`:

```json
"paths": {
  "reusable-components": ["./dist/reusable-components"]
}
```

Build the library first, then import from the package name:

```typescript
import { InputComponent } from 'reusable-components';
```

Add `InputComponent` to the `imports` array of any standalone component that uses it.

## InputComponent Usage

`InputComponent` (`selector: lib-input`) integrates with reactive forms via `formControlName`.

**Component:**

```typescript
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from 'reusable-components';

@Component({
  selector: 'app-example',
  imports: [ReactiveFormsModule, InputComponent],
  template: `
    <form [formGroup]="form">
      <lib-input
        formControlName="username"
        label="Username"
        placeholder="Enter your username"
        [errorMessage]="
          form.get('username')?.invalid && form.get('username')?.touched
            ? 'Username is required'
            : undefined
        "
      />
    </form>
  `,
})
export class ExampleComponent {
  form = new FormGroup({
    username: new FormControl('', { validators: Validators.required }),
  });
}
```

**Inputs:**

| Input | Type | Description |
|---|---|---|
| `label` | `string` | Label text shown above the input (hidden when empty) |
| `placeholder` | `string` | Native input placeholder |
| `errorMessage` | `string` | Validation message shown below the input (hidden when empty) |
| `disabled` | `boolean` | Disables the input when `true` (also respects form control `disable()`) |

## Theming

`InputComponent` styles can be customized using CSS custom properties. Each property has a fallback value, so the component renders correctly even when variables are not defined.

| Variable | Controls | Default fallback |
|---|---|---|
| `--lib-font-family` | Font family for the component | `system-ui, -apple-system, sans-serif` |
| `--lib-color-label` | Label text color | `#333` |
| `--lib-spacing-input` | Input padding | `0.5rem 0.75rem` |
| `--lib-color-border` | Input border color | `#ccc` |
| `--lib-border-radius` | Input border radius | `0.25rem` |
| `--lib-color-error` | Error message text color | `#d32f2f` |

Override these in the host app's global styles (e.g. `src/styles.css`):

```css
:root {
  --lib-font-family: 'Inter', sans-serif;
  --lib-color-label: #1a1a2e;
  --lib-spacing-input: 0.625rem 1rem;
  --lib-color-border: #94a3b8;
  --lib-border-radius: 0.5rem;
  --lib-color-error: #e11d48;
}
```

Variables cascade to all `lib-input` instances on the page.

## Development Notes

This library must be built before the app can import from it. The path mapping points to `./dist/reusable-components`, not the source files.

During development, run the library in watch mode:

```bash
ng build reusable-components --watch
```

In a separate terminal, run the app:

```bash
ng serve
```

Changes to library source files are picked up on rebuild; restart or refresh the app if updates do not appear immediately.
