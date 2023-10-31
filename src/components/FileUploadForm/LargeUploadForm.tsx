import { Card } from 'components/Card'
import { CVFileFormat, MAX_5MB_UPLOAD } from 'constants/file'
import { UPLOAD_FILE_MAX_5MB } from 'constants/messages'
import React, { useState } from 'react'
import { FileRejection } from 'react-dropzone'
import { Button } from 'components/Button'
import { Text } from 'components/Text'
import { FileUploadForm } from './FileUploadForm'

interface UploadFormProps {
  type: 'jd' | 'cv'
  selectedFile: File | null
  setFile: React.Dispatch<React.SetStateAction<File | null>>
}

export const LargeUploadForm = ({
  type,
  selectedFile,
  setFile,
}: UploadFormProps) => {
  const [errorUploadMessage, setErrorUploadMessage] = useState<string>('')

  const isJDType = type === 'jd'

  const onSelectFile = (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
  ) => {
    const isFileTooLarge = fileRejections
      .flatMap((file) => file.file)
      .some((file) => file.size > MAX_5MB_UPLOAD)

    if (isFileTooLarge) {
      setErrorUploadMessage(UPLOAD_FILE_MAX_5MB)
    } else {
      setErrorUploadMessage('')
    }

    if (acceptedFiles.length) {
      const file = acceptedFiles[0]
      setFile(file)
    } else {
      setFile(null)
    }
  }

  return (
    <Card className="w-[300px] bg-transparent" spacing={false}>
      {!selectedFile ? (
        <FileUploadForm
          accept={CVFileFormat}
          maxSize={MAX_5MB_UPLOAD}
          title={isJDType ? 'Upload JD' : 'Upload CV'}
          wrapperClassName="w-full"
          onDrop={onSelectFile}
        />
      ) : (
        <div className="text-center flex justify-between items-center pl-5">
          <Text className="text-sm text-gray-500">{selectedFile.name}</Text>
          <Button
            className="border-none bg-transparent"
            size="sm"
            type="button"
            onClick={() => setFile(null)}
          >
            <Text className="text-sm text-red-600">x</Text>
          </Button>
        </div>
      )}

      <Text className="text-base text-red-600 text-center w-full">
        {errorUploadMessage}
      </Text>
    </Card>
  )
}
