import { Button, Container, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

type LoginForm = {
  username: string
  password: string
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>()
  const navigate = useNavigate()

  const onSubmit = (data: LoginForm) => {
    if (data.username === 'admin' && data.password === 'admin') {
      navigate('/dashboard')
    } else {
      alert('Noto‘g‘ri login yoki parol!')
    }
  }

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField fullWidth label="Username" margin="normal" {...register('username')} />
        <TextField fullWidth label="Password" type="password" margin="normal" {...register('password')} />
        <Button variant="contained" fullWidth sx={{ mt: 2 }} type="submit">
        Kirish
        </Button>
      </form>
    </Container>
  )
}
