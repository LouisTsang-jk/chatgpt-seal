import useStorage from "@/hooks/useStorage"
import React, { useCallback } from "react"
import { useDropzone, DropzoneOptions } from "react-dropzone"

const Import: React.FC = () => {
  const [, setTemplates] = useStorage<Template[]>("templates")

  const onDrop: DropzoneOptions["onDrop"] = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file: File) => {
        const reader = new FileReader()

        reader.onabort = () => console.log("file reading was aborted")
        reader.onerror = () => console.log("file reading has failed")
        reader.onload = () => {
          const binaryStr = reader.result as string
          const templatesFromFile: Template[] = JSON.parse(binaryStr)
          console.log("binaryStr:", binaryStr)
          setTemplates(templatesFromFile)
        }
        reader.readAsText(file)
      })
    },
    [setTemplates]
  )
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>拖拽上传，支持多个文件同时上传</p>
    </div>
  )
}

export default Import
