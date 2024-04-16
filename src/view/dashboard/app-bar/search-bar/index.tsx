import { yupResolver } from "@hookform/resolvers/yup"
import { Search } from "@mui/icons-material"
import { TextField } from "@mui/material"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { Controller, useForm } from "react-hook-form"
import { object, string } from "yup"

interface formData {
  searchTerm: string
}

const defaultValues: formData = {
  searchTerm: '',
}

const schema = object({
  searchTerm: string().required(),
})

const SearchBar = () => {
  const router = useRouter()
  const { control, handleSubmit } = useForm({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = useCallback((data: formData) => {
    router.push(`/search/all?searchTerm=${data.searchTerm}`)
  }, [router])

  return (
    <Controller
      control={control}
      name='searchTerm'
      render={({ field: { onChange, value } }) => (
        <TextField
          fullWidth
          size='small'
          variant='standard'
          value={value}
          onChange={onChange}
          InputProps={{
            startAdornment: <Search sx={{ width: 20, height: 20, mr: 0.5 }} />,
            disableUnderline: true,
          }}
          placeholder='Type to search'
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSubmit(onSubmit)()
              event.preventDefault()
            }
          }}
        />
      )}
    />
  )
}

export default SearchBar