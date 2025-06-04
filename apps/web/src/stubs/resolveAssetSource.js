// src/stubs/resolveAssetSource.js
export default function resolveAssetSource(source) {
  if (typeof source === 'object' && source !== null) {
    return source;
  }
  return { uri: source };
}
