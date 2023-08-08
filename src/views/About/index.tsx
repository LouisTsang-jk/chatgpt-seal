import { Box, Container, Link, Typography } from "@mui/material"
import GitHubIcon from "@mui/icons-material/GitHub"
import EmailIcon from "@mui/icons-material/Email"
import HelpIcon from "@mui/icons-material/Help"
import FeedbackIcon from "@mui/icons-material/Feedback"
import { useTranslation } from 'react-i18next'
import RouteBreadcrumbs from "@/views/components/RouteBreadcrumbs"

export default function About() {
  const { t } = useTranslation()
  return (
    <Container
      sx={{ maxHeight: "100vh" }}
      style={{ padding: 0 }}
    >
      <RouteBreadcrumbs text={t('About')} />
      <Box my={1}>
        <Typography variant="h6">Version</Typography>
        <Typography variant="body1">0.1.3(2023/08/09)</Typography>
      </Box>

      <Box my={1}>
        <Typography variant="h6">Author</Typography>
        <Typography variant="body1">LouisTsang(ZengJunKun)</Typography>
      </Box>

      <Box my={1}>
        <Typography variant="h6">Github</Typography>
        <Link
          href="https://github.com/LouisTsang-jk/chatgpt-seal"
          target="_blank"
          rel="noopener"
        >
          <Box display="flex" alignItems="center">
            <GitHubIcon />
            <Box ml={1}>chatgpt-seal</Box>
          </Box>
        </Link>
      </Box>

      <Box my={1}>
        <Typography variant="h6">Email</Typography>
        <Link
          href="mailto:louistsangjk@gmail.com"
          target="_blank"
          rel="noopener"
        >
          <Box display="flex" alignItems="center">
            <EmailIcon />
            <Box ml={1}>louistsangjk@gmail.com</Box>
          </Box>
        </Link>
      </Box>

      <Box my={1}>
        <Typography variant="h6">Q&A</Typography>
        <Link
          href="https://github.com/LouisTsang-jk/chatgpt-seal/issues"
          target="_blank"
          rel="noopener"
        >
          <Box display="flex" alignItems="center">
            <HelpIcon />
            <Box ml={1}>Go to Q&A</Box>
          </Box>
        </Link>
      </Box>

      <Box my={1}>
        <Typography variant="h6">Feedback</Typography>
        <Link
          href="mailto:louistsangjk@gmail.com?subject=Feedback"
          target="_blank"
          rel="noopener"
        >
          <Box display="flex" alignItems="center">
            <FeedbackIcon />
            <Box ml={1}>Send Feedback</Box>
          </Box>
        </Link>
      </Box>
    </Container>
  )
}
