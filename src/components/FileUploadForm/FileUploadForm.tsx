import { Accept, DropEvent, FileRejection, useDropzone } from 'react-dropzone'

import { IconUploadFile } from 'components/icons/components/IconUploadFile'

type Props = {
  onDrop: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent,
  ) => void
  accept: Accept
  wrapperClassName?: string
  maxSize: number
  title?: string
}

export const FileUploadForm = ({
  onDrop,
  accept,
  wrapperClassName,
  maxSize,
  title = 'Upload file',
}: Props) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxSize,
  })

  return (
    <div
      {...getRootProps()}
      className={`w-full h-[100px] cursor-pointer ${
        wrapperClassName && wrapperClassName
      }`}
    >
      <input {...getInputProps()} />
      <div className="bg-gray-100 hover:opacity-70 border border-dashed border-gray-300 h-full flex justify-center items-center rounded-lg gap-2">
        <IconUploadFile />
        <p className="text-gray-400 text-xs underline underline-offset-2">
          {title}
        </p>
      </div>
    </div>
  )
}
