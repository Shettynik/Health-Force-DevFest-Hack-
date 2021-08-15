import { Col, Container, Row, Card} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectActiveUser } from '../../features/userSlice';
import { Link } from 'react-router-dom';
import './Home.css';
import { axiosInstance } from '../../AxiosSetup';

const Home = () => {
    const checkActiveUser = useSelector(selectActiveUser);
    const [doctors, setdoctors] = useState([]);

    useEffect(() => {
        axiosInstance.get('/doctor').then((data) => {
            console.log(data.data)
            setdoctors(data.data)
        }).catch((error) => {
            console.log(error)
        })
    })

    return (
        <Container style={{ marginTop: "50px" }}>
            <Row>
                {doctors && doctors.map((doctor) => (
                    <Col xs={12} md={6} lg={4} >
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={doctor.image} />
                            <Card.Body>
                                <Card.Title>{doctor.firstname} {doctor.lastname}</Card.Title>
                                <Card.Text>
                                    {doctor.description}
                                </Card.Text>
                                <button className="home__btn" style={{ marginRight: "5px" }}><Link to={checkActiveUser ? `/bookappoinment?doctor=${doctor._id}` : '/login?show=true'} style={{ textDecoration: "None", color: "white" }}>Book An Appointment</Link></button>
                                <button className="home__btn"><Link style={{ textDecoration: "None", color: "white", padding: "3px" }} to={`/doctor/view?doctor=${doctor._id}`} >View</Link></button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Home