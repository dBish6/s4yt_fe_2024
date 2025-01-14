import postcssPresetEnv from "postcss-preset-env";
import postcssFlexbugsFixes from "postcss-flexbugs-fixes";
import cssnano from "cssnano";

export default {
  plugins: [
    postcssPresetEnv({
      stage: 3,
      features: {
        "nesting-rules": true,
        "custom-properties": true
      },
      autoprefixer: { grid: true }
    }),
    postcssFlexbugsFixes(),
    cssnano({ preset: "default" })
  ]
};
