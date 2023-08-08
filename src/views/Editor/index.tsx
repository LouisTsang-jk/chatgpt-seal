import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Grid } from '@mui/material'
import useStorage from '@/hooks/useStorage'
import { useSnackbar } from '@/common/SnackbarContext'
import useKey from 'react-use/lib/useKey'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { StorageKey } from '@/globalState'
import { v4 as uuidv4 } from 'uuid'

interface FormValues {
  title: string
  template: string
}

export default function Editor() {
  const [templates, setTemplates] = useStorage<Template[]>(StorageKey)
  const { t } = useTranslation()
  const { id } = useParams()

  const newId = uuidv4()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors }
  } = useForm<FormValues>()

  useEffect(() => {
    if (id && templates) {
      const template = templates.find((template) => template.id === id)
      if (template) {
        setValue('title', template.title)
        setValue('template', template.body)
      }
    }
  }, [id, templates])

  useKey(
    (event) => event.code === 'Enter' && (event.ctrlKey || event.metaKey),
    (event) => {
      event.preventDefault()
      const values = getValues()
      onSubmit(values)
    },
    {},
    [templates]
  )

  useKey(
    (event) => event.code === 'Escape',
    (event) => {
      event.preventDefault()
      navigate(-1)
    },
    {},
    []
  )

  const { openSnackbar } = useSnackbar()

  function createTemplate(title: string, body: string) {
    const newTemplate: Template = {
      id: newId,
      title,
      body
    }
    const updatedTemplate = templates
      ? [...templates, newTemplate]
      : [newTemplate]
    setTemplates(updatedTemplate)
    openSnackbar(t('Create Template Success'))
    location.reload()
    navigate(-1)
  }

  function editTemplate(id: string, title: string, body: string) {
    if (!templates) return
    const updatedTemplates = templates.map((template) =>
      template.id === id ? { ...template, title, body } : template
    )
    setTemplates(updatedTemplates)
    openSnackbar(t('Edit Template Success'))
    location.reload()
    navigate(-1)
  }

  function onSubmit(data: FormValues) {
    id
      ? editTemplate(id, data.title, data.template)
      : createTemplate(data.title, data.template)
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1, height: '100%' }}
    >
      <Grid item>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label={t('Title')}
          autoFocus
          {...register('title', { required: t('Title is required') })}
          error={Boolean(errors.title)}
          helperText={errors.title?.message || ''}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label={t('Template content')}
          id="template"
          multiline
          rows={4}
          {...register('template', { required: t('Template content') })}
          error={Boolean(errors.template)}
          helperText={errors.template?.message || ''}
        />
      </Grid>
      <Grid
        container
        item
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Button fullWidth component={Link} to="/">
            {t('Cancel')}(Esc)
          </Button>
        </Grid>
        <Grid item>
          <Button type="submit" fullWidth variant="contained" color="primary">
            {t('Save')}( ⌘ + ↵ )
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
