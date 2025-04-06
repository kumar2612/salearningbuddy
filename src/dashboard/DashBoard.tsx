import { Container, Row, Col, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './DashBoard.css'

// Import images
import storiesImg from '../assets/images/stories.png'
import rhymesImg from '../assets/images/rhymes.png'
import gamesImg from '../assets/images/games.png'
import jokesImg from '../assets/images/jokes.png'
import learningImg from '../assets/images/learning.png'
import moreFunImg from '../assets/images/morefun.png'

const DashBoard = () => {
  const navigate = useNavigate()

  const tiles = [
    { title: 'Stories', image: storiesImg, path: '/stories' },
    { title: 'Rhymes', image: rhymesImg, path: '/rhymes' },
    { title: 'Games', image: gamesImg, path: '/games' },
    { title: 'Jokes', image: jokesImg, path: '/jokes' },
    { title: 'Learning', image: learningImg, path: '/learning' },
    { title: 'More Fun', image: moreFunImg, path: '/morefun' },
  ]

  return (
    <Container className="dashboard-container">
      <Row>
        {tiles.map((tile, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4">
            <Card onClick={() => navigate(tile.path)} className="dashboard-tile">
              <Card.Img variant="top" src={tile.image} />
              <Card.Body>
                <Card.Title>{tile.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default DashBoard