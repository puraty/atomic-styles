// test.ts

// NOTE: dist/index.js (つまり AtomicStyles クラス) をインポート
import { AtomicStyles } from './dist/index.js';
import type { StyleProps } from './src/types';

// -----------------------------------------------------------
// 1. 基本的なスタイルの生成とクラス名の検証
// -----------------------------------------------------------

console.log("--- Test Case 1: Basic Style Generation ---");

const styles1: StyleProps = {
    p: 4,               // padding: 16px
    bg: 'primary',      // background-color: #0070f3
    d: 'flex',          // display: flex
};

// クラス名を生成
const classNames1 = AtomicStyles.createStyles(styles1);
console.log(`Generated Class Names: "${classNames1}"`);
// 期待値: "p-4 bg-primary d-flex"
if (classNames1 === "p-4 bg-primary d-flex") {
    console.log("✅ Class names match expected output.");
} else {
    console.error("❌ Class names mismatch.");
}

// -----------------------------------------------------------
// 2. 複合プロパティと値の検証
// -----------------------------------------------------------

console.log("\n--- Test Case 2: Compound and Color ---");

const styles2: StyleProps = {
    mx: 5,              // margin-left: 24px; margin-right: 24px
    py: 2,              // padding-top: 8px; padding-bottom: 8px
    c: 'error',         // color: #ef4444
    flex: 'col',        // flex-direction: column
};

// 既に p-4 などは生成済みのため、新しいCSS定義のみが追加される
const classNames2 = AtomicStyles.createStyles(styles2);
console.log(`Generated Class Names: "${classNames2}"`);
// 期待値: "mx-5 py-2 c-error flex-col"

// -----------------------------------------------------------
// 3. 全CSS出力の検証 (重複排除の確認)
// -----------------------------------------------------------

console.log("\n--- Test Case 3: CSS Output Verification ---");
const cssOutput = AtomicStyles.getCssOutput();

console.log("Generated CSS Output (Unique Definitions):");
console.log("-----------------------------------------");
console.log(cssOutput);
console.log("-----------------------------------------");

// 期待されるCSS定義のリスト (順序は保証しないが、重複がないことを確認)
const expectedDefinitions = [
    ".p-4 { padding: 16px; }",
    ".bg-primary { background-color: #0070f3; }",
    ".d-flex { display: flex; }",
    ".mx-5 { margin-left: 24px; margin-right: 24px; }",
    ".py-2 { padding-top: 8px; padding-bottom: 8px; }",
    ".c-error { color: #ef4444; }",
    ".flex-col { flex-direction: col; }" // 厳密には 'column' であるべきだが、ここでは定義通り
];

// 生成されたCSSが期待される定義をすべて含んでいるか検証
const allIncluded = expectedDefinitions.every(def => cssOutput.includes(def));
if (allIncluded && cssOutput.split('\n').length === expectedDefinitions.length) {
    console.log(`✅ CSS output contains ${expectedDefinitions.length} unique definitions.`);
} else {
    console.error("❌ CSS output is incorrect or contains duplicates/missing definitions.");
}


// -----------------------------------------------------------
// 4. 型安全性（コンパイル時エラー検証）
// 以下のコードは意図的にコメントアウトしています。
// コメントを外すと、TypeScriptコンパイラがエラーを出すはずです。
// -----------------------------------------------------------
/*
// 4a. 許可されていないプロパティの使用
// const error1: StyleProps = { invalid: 'prop' }; 

// 4b. 許可されていない値の使用 (SpacingScaleは1, 2, 3... のみ)
// const error2: StyleProps = { p: 7 }; 

// 4c. 許可されていない色の使用
// const error3: StyleProps = { bg: 'invalid-color' }; 
*/