const ONE_KILOBYTE = 1000
export const MAX_5MB_UPLOAD = 5 * ONE_KILOBYTE * ONE_KILOBYTE

// feature read text of .pdf, .doc file still developing
export const CVFileFormat = {
  'application/pdf': [],
  'application/msword': [],
  'text/plain': ['.txt'],
}
