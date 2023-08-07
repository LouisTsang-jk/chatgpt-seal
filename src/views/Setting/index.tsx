import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import useStorage from '@/hooks/useStorage'
import { useTranslation } from 'react-i18next'
import RouteBreadcrumbs from '@/views/components/RouteBreadcrumbs'

const Setting = () => {
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useStorage('language')

  const onLanguageChange = (event: SelectChangeEvent) => {
    const language = event.target.value
    setLanguage(language)
    i18n.changeLanguage(language)
  };
  
  return (
    <div>
      <RouteBreadcrumbs text={t('Import')} />
      <h1>{t('Setting')}</h1>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="language-select-label">Language</InputLabel>
          <Select
            labelId="language-select-label"
            id="demo-simple-select"
            value={(language || 'zh') as string}
            label={t('Language')}
            onChange={onLanguageChange}
          >
            <MenuItem value="zh">中文</MenuItem>
            <MenuItem value="en">English</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  )
}

export default Setting
