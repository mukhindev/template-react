export declare module "react" {
  // Support custom property in style props
  interface CSSProperties {
    [key: `--${string}`]: unknown;
  }
}
