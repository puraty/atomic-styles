// src/types.ts

// Utility types: Defining shorthand CSS property values
export type SpacingScale = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10;
export type ColorKeys = 'primary' | 'secondary' | 'neutral' | 'error';
export type DisplayKeys = 'none' | 'flex' | 'block' | 'inline-block';

// -----------------------------------------------------------
// Supported Style Properties Type Definition (The core interface)
// -----------------------------------------------------------

/**
 * Defines all supported atomic CSS properties and their allowed values.
 */
export type StyleProps = {
    // Spacing (Padding/Margin)
    m?: SpacingScale;       // Margin
    p?: SpacingScale;       // Padding
    mx?: SpacingScale;      // Margin-X (left/right)
    py?: SpacingScale;      // Padding-Y (top/bottom)

    // Color
    bg?: ColorKeys;         // Background Color
    c?: ColorKeys;          // Foreground Color

    // Layout
    d?: DisplayKeys;        // Display (flex, block, none, etc.)
    flex?: 'row' | 'col';   // Flex direction
};

// -----------------------------------------------------------
// Utility Maps (Used by the generator logic)
// -----------------------------------------------------------

// Maps numeric scale to pixel values (e.g., 1 => 4px)
export const SpacingMap: Record<SpacingScale, string> = {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '24px',
    6: '32px',
    8: '48px',
    10: '64px',
};

// Maps color keys to actual CSS values
export const ColorMap: Record<ColorKeys, string> = {
    primary: '#0070f3',
    secondary: '#16a34a',
    neutral: '#475569',
    error: '#ef4444',
};

// Maps shorthand property keys to actual CSS property names
export const PropMap: Record<keyof StyleProps, string | string[]> = {
    m: 'margin',
    p: 'padding',
    mx: ['margin-left', 'margin-right'],
    py: ['padding-top', 'padding-bottom'],
    bg: 'background-color',
    c: 'color',
    d: 'display',
    flex: 'flex-direction',
};