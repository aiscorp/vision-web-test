import React, {useEffect, useState} from 'react'
import {Container} from 'react-bootstrap'
import axios from "axios";
import withAuth from "../hoc/WithAuth";

const HomePage = props => {
    const {user} = props
    const [info, setInfo] = useState()

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
            {!!info && userInfo(info)}
        </Container>
    )
}

export default withAuth(HomePage)

const userInfo = (info) => (
    <>
        <img src={info.avatar} style={{height: '128px'}} alt='avatar'/>
        <h3>{`Hello ${info.name} ${info.surname}!`}</h3>
        <p>Hear is information stored in your account:</p>
        <p>{`Name: ${info.name}`}</p>
        <p>{`Surname: ${info.surname}`}</p>
        <p>{`Email: ${info.email}`}</p>
        <p>{`Phone: ${info.phone}`}</p>
        <p>{`Client ID: ${info.client_id}`}</p>
        <p>{`Invited by: ${info.invited_by.name} ${info.invited_by.surname}`}</p>
    </>
)