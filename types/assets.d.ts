/**
 * Ambient declarations for static asset imports.
 *
 * Metro resolves `require('./photo.png')` (and the equivalent ES import) to an
 * opaque numeric asset id at build time, which is exactly what React Native's
 * `Image` accepts as a `source`. Nothing in Expo SDK 57 ships these
 * declarations, so the project declares the formats it actually uses.
 */

declare module '*.png' {
  const source: import('react-native').ImageSourcePropType;
  export default source;
}

declare module '*.jpg' {
  const source: import('react-native').ImageSourcePropType;
  export default source;
}

declare module '*.jpeg' {
  const source: import('react-native').ImageSourcePropType;
  export default source;
}

declare module '*.gif' {
  const source: import('react-native').ImageSourcePropType;
  export default source;
}

declare module '*.webp' {
  const source: import('react-native').ImageSourcePropType;
  export default source;
}

declare module '*.svg' {
  const source: import('react-native').ImageSourcePropType;
  export default source;
}