import { useEffect, useId } from "react"
import { Link, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { Grid } from "@mui/material"
import useStorage from "@/hooks/useStorage"
import { useSnackbar } from "@/common/SnackbarContext"
import useKey from "react-use/lib/useKey"
import { useNavigate } from "react-router-dom"
import { StorageKey } from "@/DataContext"

interface FormValues {
  title: string
  template: string
}

export default function Editor() {
  const { id } = useParams()

  const newId = useId()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormValues>()

  useKey(
    (event) => event.code === "Enter" && (event.ctrlKey || event.metaKey),
    (event) => {
      console.log("Command + Enter or Ctrl + Enter was pressed")
      // 这里是你的提交表单的逻辑
      event.preventDefault()
      const values = getValues();
      onSubmit(values)
    },
    {},
    []
  )

  useKey(
    (event) => event.code === "Escape",
    (event) => {
      event.preventDefault()
      console.log("Esc Press")
      navigate(-1)
    },
    {},
    []
  )

  const [template, setTemplate] = useStorage<Template[]>(StorageKey)
  const { openSnackbar } = useSnackbar()

  function createTemplate(title: string, body: string) {
    const newTemplate: Template = {
      id: newId,
      title,
      body
    }
    console.log("标记:", template)
    const updatedTemplate = template
      ? [...template, newTemplate]
      : [newTemplate]
    setTemplate(updatedTemplate)
    openSnackbar("Create Template Success")
    location.reload()
    navigate(-1)
  }

  function onSubmit(data: FormValues) {
    createTemplate(data.title, data.template)
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1, height: "100%" }}
    >
      <Grid item>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          autoFocus
          {...register("title", { required: "Title is required." })}
          error={Boolean(errors.title)}
          helperText={errors.title?.message || ""}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Template"
          id="template"
          multiline
          rows={4}
          {...register("template", { required: "Template is required." })}
          error={Boolean(errors.template)}
          helperText={errors.template?.message || ""}
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
            Cancel(Esc)
          </Button>
        </Grid>
        <Grid item>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Save( ⌘ + ↵ )
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
