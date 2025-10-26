// src/style-generator.ts

import type { StyleProps } from './types.js'; 
import { SpacingMap, ColorMap, PropMap } from './types.js'; 

// Helper function to resolve the actual CSS value from the shorthand key
const resolveValue = (prop: keyof StyleProps, value: any): string => {
    switch (prop) {
        case 'm':
        case 'p':
        case 'mx':
        case 'py':
            // Resolve from SpacingMap (e.g., 4 => '16px')
            return SpacingMap[value as keyof typeof SpacingMap];
        case 'bg':
        case 'c':
            // Resolve from ColorMap (e.g., 'primary' => '#0070f3')
            return ColorMap[value as keyof typeof ColorMap];
        default:
            return String(value);
    }
};

/**
 * Main class for generating zero-runtime atomic CSS.
 * Intended to be used during the build process.
 */
export class AtomicStyles {
    // Static map to store unique CSS definitions already generated
    private static generatedCss: Map<string, string> = new Map();

    /**
     * Generates atomic CSS classes from a StyleProps object.
     * @param styles - The StyleProps object specified by the user.
     * @returns The generated string of class names (e.g., "m-4 bg-primary").
     */
    public static createStyles(styles: StyleProps): string {
        const classNames: string[] = [];

        // Iterate through the style properties, handling the type assertion for Object.entries
        for (const [propKeyStr, propValue] of Object.entries(styles)) {
            
            // Assert string key as a key of StyleProps
            const propKey = propKeyStr as keyof StyleProps;
            
            if (propValue === undefined) continue;

            const value = resolveValue(propKey, propValue);
            
            // Retrieve the corresponding CSS property name(s)
            const cssPropNames = PropMap[propKey];
            
            // Generate the class name (e.g., m-4)
            const className = `${propKey}-${propValue}`;
            classNames.push(className);
            
            // Only generate and store the CSS definition if it's not already in the map
            if (!AtomicStyles.generatedCss.has(className)) {
                let cssDefinition = '';
                
                // If PropMap returns a single string (e.g., m -> margin)
                if (typeof cssPropNames === 'string') {
                    cssDefinition = `${cssPropNames}: ${value};`;
                } 
                // If PropMap returns an array (e.g., mx -> [margin-left, margin-right])
                else if (Array.isArray(cssPropNames)) {
                    cssDefinition = cssPropNames.map(name => `${name}: ${value};`).join(' ');
                }

                AtomicStyles.generatedCss.set(className, `.${className} { ${cssDefinition} }`);
            }
        }

        return classNames.join(' ');
    }

    /**
     * Combines all generated unique CSS definitions into a single string.
     * This output should be written to a CSS file during the final build process.
     */
    public static getCssOutput(): string {
        return Array.from(AtomicStyles.generatedCss.values()).join('\n');
    }
}