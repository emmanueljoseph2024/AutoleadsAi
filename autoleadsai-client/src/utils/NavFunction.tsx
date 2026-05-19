import { useNavigate } from 'react-router-dom'

export const navFunction = () => {

  const navigate = useNavigate()

  const handleNavigate = (url: string) => {
    navigate(url)
  }

  return handleNavigate
}
