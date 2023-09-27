import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Redirecter = ({route, status} : {route: string, status: boolean}) => {
    const navigate = useNavigate()

    useEffect(() => {
        if(status) navigate(route)
    }, [route, status])

    return null
}

export default Redirecter
