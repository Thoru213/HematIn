import { Container, Row, Col } from "react-bootstrap"
import { semuaFitur } from "../data/index";

const FiturePage = () => {
    return (
        <div className="fitur-page">
            <div className="fitur min-vh-100">
            <Container>
                <Row>
                    <Col>
                    <h1 className="fw-bold text-center">Semua Fitur</h1>
                    <p className="text-center">Lorem Ipsum sir amet consectetur, adipisicing elit</p>
                    </Col>
                </Row>
                <Row>
                    {semuaFitur.map((fitur) => {
                    return(
                        <Col key={fitur.id} className="shadow">
                            <img src={fitur.image} alt="unplash.com" className="w-100 mb-5 rounded-top" />
                            <h5 className="mb-5 px-2">
                                {fitur.title}
                            </h5>
                        </Col>
                    );
                })}
                </Row>
            </Container>
        </div>
        </div>
    );
}

export default FiturePage
