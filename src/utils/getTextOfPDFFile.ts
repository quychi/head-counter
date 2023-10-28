import { GlobalWorkerOptions, getDocument, version } from 'pdfjs-dist'
import {
  DocumentInitParameters,
  PDFDataRangeTransport,
  TypedArray,
} from 'pdfjs-dist/types/src/display/api'

export const getTextOfPDFFile = async (
  srcUrl: string | TypedArray | DocumentInitParameters | PDFDataRangeTransport,
): Promise<string> => {
  GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.js`

  const pdf = await getDocument(srcUrl).promise

  const pageList = await Promise.all(
    Array.from({ length: pdf.numPages }, (_, i) => pdf.getPage(i + 1)),
  )

  const textList = await Promise.all(pageList.map((p) => p.getTextContent()))

  return textList
    .map(({ items }) =>
      items
        .map((item) => {
          if ('str' in item) {
            const { str } = item
            return str
          }
          return ''
        })
        .join(''),
    )
    .join('')
}
