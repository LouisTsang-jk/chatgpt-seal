import { Box, Container, IconButton, Link, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import GitHubIcon from "@mui/icons-material/GitHub"
import EmailIcon from "@mui/icons-material/Email"
import HelpIcon from "@mui/icons-material/Help"
import FeedbackIcon from "@mui/icons-material/Feedback"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"

export default function About() {
  return (
    <Container sx={{ overflowY: "auto", maxHeight: "100vh", padding: '8px 16px' }}>
      <RouterLink to="/">
        <IconButton color="secondary" aria-label="back" sx={{padding: '0 0 16px 0'}}>
          <KeyboardBackspaceIcon />
        </IconButton>
      </RouterLink>
      <Typography variant="h4" gutterBottom>
        关于
      </Typography>

      <Box my={1}>
        <Typography variant="h6">Version</Typography>
        <Typography variant="body1">0.0.1(2023/07/30)</Typography>
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
          href="mailto:chiyamakagami@foxmail.com"
          target="_blank"
          rel="noopener"
        >
          <Box display="flex" alignItems="center">
            <EmailIcon />
            <Box ml={1}>chiyamakagami@foxmail.com</Box>
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
          href="mailto:chiyamakagami@foxmail.com?subject=Feedback"
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
