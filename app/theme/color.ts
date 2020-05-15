import { palette } from "./palette"

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const color = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  palette,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The screen background.
   */
  background: palette.surface_main,
  /**
   * The main tinting color.
   */
  primary: palette.primary,
  /**
   * The main tinting color, but darker.
   */
  primaryDarker: palette.primary_dark,
   /**
   * The main tinting color, but light.
   */
  primaryLight: palette.primary_light,
  /**
   * A subtle color used for borders and lines.
   */
  line: palette.gray44,
  /**
   * The default color of text in many components.
   */
  text: palette.black,
  /**
   * Secondary information.
   */
  dim: palette.lightGrey,
  /**
   * Error messages and icons.
   */
  error: palette.status_error,

  /**
   * Storybook background for Text stories, or any stories where
   * the text color is color.text, which is white by default, and does not show
   * in Stories against the default white background
   */
  storybookDarkBg: palette.black,

  /**
   * Storybook text color for stories that display Text components against the
   * white background
   */
  storybookTextColor: palette.black,

  // Additional
  activeColor: palette.vividPink,
  inActiveColor: palette.toreaBay,
  darkBackground: palette.mirrage,
  darkBackground2: palette.dualBlue,
  placeHolderColor: palette.darkBlue,
  disabled: palette.gray70,
  warning: palette.yellow,
  success: palette.green2
}
