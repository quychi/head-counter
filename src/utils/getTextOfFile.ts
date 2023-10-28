import { FILE_TYPE } from 'constants/file'
import { getTextOfPDFFile } from './getTextOfPDFFile'

const getTextContent = (textFile: File) =>
  new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsText(textFile)
    reader.onload = () => {
      resolve(reader.result as string)
    }
  })

// Get text content of .pdf and .txt file
export const getTextOfFile = async (file: File) => {
  let textContent = ''
  if (file.type === FILE_TYPE.pdf) {
    const fileUrl = URL.createObjectURL(file)
    textContent = await getTextOfPDFFile(fileUrl)
  }
  if (file.type === FILE_TYPE.txt) {
    textContent = (await getTextContent(file)) as string
  }
  return textContent
}
