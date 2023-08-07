import { Breadcrumbs, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ReactNode } from 'react'
import styled from 'styled-components'

const RouterLink = styled(Link)`
  text-decoration: none;
`

const RouteBreadcrumbs: React.FC<{
  text: string
  children?: ReactNode
}> = ({ text, children }) => {
  const { t } = useTranslation()
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      <RouterLink to="/">
        <Typography color="text.primary">{t('Template list')}</Typography>
      </RouterLink>
      <Typography color="text.primary">{text}</Typography>
      {children}
    </Breadcrumbs>
  )
}

export default RouteBreadcrumbs
