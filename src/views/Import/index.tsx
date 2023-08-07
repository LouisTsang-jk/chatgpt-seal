import useStorage from '@/hooks/useStorage'
import React, { useCallback } from 'react'
import { useDropzone, DropzoneOptions } from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import RouteBreadcrumbs from '../components/RouteBreadcrumbs'
import { useSnackbar } from '@/common/SnackbarContext'

const Import: React.FC = () => {
  const [templates, setTemplates] = useStorage<Template[]>('templates')
  const { openSnackbar } = useSnackbar()

  const { t } = useTranslation()
  const onDrop: DropzoneOptions['onDrop'] = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file: File) => {
        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
          console.log('reader:', reader)
          const binaryStr = reader.result as string
          try {
            const templatesFromFile: Template[] = JSON.parse(binaryStr)
            console.log('templatesFromFile:', templatesFromFile)
            const updatedTemplate = templates
              ? [...templates, ...templatesFromFile]
              : templatesFromFile
            setTemplates(updatedTemplate)
            openSnackbar(t('Import Template Success'))

          } catch (err) {}
        }
        reader.readAsText(file)
      })
    },
    [setTemplates]
  )
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <>
      <RouteBreadcrumbs text={t('Import')} />
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>{t('Drag and drop to upload, support multiple files')}</p>
        <p>
          {t('The current number of templates is:')} {templates?.length || 0}
        </p>
      </div>
    </>
  )
}

export default Import
