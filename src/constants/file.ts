const ONE_KILOBYTE = 1000
export const MAX_5MB_UPLOAD = 5 * ONE_KILOBYTE * ONE_KILOBYTE

export const FILE_TYPE = {
  pdf: 'application/pdf',
  txt: 'text/plain',
  word: 'application/msword',
}

// feature read text of .doc file still developing
export const CVFileFormat = {
  [FILE_TYPE.pdf]: [],
  [FILE_TYPE.txt]: ['.txt'],
  [FILE_TYPE.word]: [],
}
