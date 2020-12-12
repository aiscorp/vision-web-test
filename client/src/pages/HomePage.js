import React, {useEffect, useState} from 'react'
import {Container} from 'react-bootstrap'
import axios from "axios";
import withAuth from "../hoc/WithAuth";

const HomePage = props => {
    const {user} = props
    const [info, setInfo] = useState()

    //http://erp.apptrix.ru/api/clients/RU-000000/
    useEffect(() => {
        axios.get(`http://erp.apptrix.ru/api/clients/${user.client_id}/`)
            .then(res => {
                if (res.status === 200) {
                    const data = res.data
                    setInfo(data)
                }
                console.log('response', res)
            })
            .catch(e => console.log('error', e))
    }, [])

    return (
        <Container className="my-2">
            <h2>Home page</h2>
            <p>{!!info && JSON.stringify(info)}</p>
        </Container>
    )
}

export default withAuth(HomePage)
