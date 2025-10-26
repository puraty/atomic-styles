# `@puraty/atomic-styles`

[![npm version](https://badge.fury.io/js/%40puraty%2Fatomic-styles.svg)](https://badge.fury.io/js/%40puraty%2Fatomic-styles)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A **zero-runtime, type-safe** library for generating atomic CSS classes at build time. Eliminate the overhead of traditional CSS-in-JS solutions while gaining full TypeScript type enforcement for every style property and value.

## Features

* **Zero Runtime**: No JavaScript code is executed to process styles in the browser, resulting in maximum performance.
* **Compile-Time Type Safety**: Guarantees that only valid, predefined style properties (like `m`, `bg`) and valid scale values (like `4`, `'primary'`) are used.
* **Atomic CSS**: Generates highly reusable, single-purpose CSS classes to minimize the final bundle size.
* **Modern TypeScript**: Built from the ground up to integrate perfectly with modern ESM projects.

## Installation

```bash
npm install @puraty/atomic-styles
```

## Usage

The library is designed to be integrated into your project's build step (e.g., a simple Node script or custom build task).

### 1. Define and Generate Styles

Use the `createStyles` method to generate class names and collect the necessary CSS definitions.

```typescript
// build-styles.ts

import { AtomicStyles, StyleProps } from '@puraty/atomic-styles';
import * as fs from 'fs';

// --- Application Code Simulation ---
// In a real app, this would be called many times across components:

const headerStyles: StyleProps = {
    d: 'flex',      // display: flex
    bg: 'primary',  // background-color: #0070f3
    p: 4,           // padding: 16px
    mx: 5           // margin-left/right: 24px
};

const buttonStyles: StyleProps = {
    p: 2,           // padding: 8px (already generated, no duplicate CSS)
    bg: 'secondary',
    c: 'neutral'
};

// 1. Generate class names
const headerClassNames = AtomicStyles.createStyles(headerStyles); 
// Output: "d-flex bg-primary p-4 mx-5"

const buttonClassNames = AtomicStyles.createStyles(buttonStyles);
// Output: "p-2 bg-secondary c-neutral"

// 2. At the end of the build, retrieve the unique CSS output
const finalCSS = AtomicStyles.getCssOutput();

// 3. Write the CSS to a file
fs.writeFileSync('app.atomic.css', finalCSS);

console.log('CSS generation complete. File written with unique classes.');
```

### 2. Resulting CSS (`app.atomic.css`)

The output file will contain only the unique definitions used across your entire application:

```css
/* app.atomic.css */
.d-flex { display: flex; }
.bg-primary { background-color: #0070f3; }
.p-4 { padding: 16px; }
.mx-5 { margin-left: 24px; margin-right: 24px; }
.p-2 { padding: 8px; }
.bg-secondary { background-color: #16a34a; }
.c-neutral { color: #475569; }
/* ... and so on */
```

## API Reference

| Function | Description |
| :--- | :--- |
| **`createStyles(styles: StyleProps)`** | Generates atomic CSS classes and collects unique definitions. **Returns the class name string.** |
| **`getCssOutput()`** | Returns a string containing all unique CSS definitions generated so far. Call this once at the end of the build. |
| **`StyleProps`** | TypeScript type defining the valid properties (`m`, `bg`) and values (`4`, `'primary'`). |

## License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to open issues or submit pull requests to improve this utility!
