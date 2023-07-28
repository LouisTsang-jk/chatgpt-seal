import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import KeyboardCommandKeyIcon from '@mui/icons-material/KeyboardCommandKey';
import { Grid } from "@mui/material"

interface FormValues {
  title: string
  template: string
}

export default function Editor() {
  const { id } = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>()

  useEffect(() => {
    console.log("id:", id)
  }, [])

  const onSubmit = (data: FormValues) => {
    console.log(`Title: ${data.title}`)
    console.log(`Template: ${data.template}`)
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
          <Button fullWidth component={Link} to="/"> Cancel </Button>
        </Grid>
        <Grid item>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Save
            <KeyboardCommandKeyIcon />
            <KeyboardReturnIcon />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
