import React, { useState } from 'react'
import { Modal, Button, Form, Spinner } from 'react-bootstrap'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Jokes.css'
import { iconMap } from './icons'

const Jokes = () => {
  const [showModal, setShowModal] = useState(true)
  const [formData, setFormData] = useState({
    text: 'Can you tell a joke?',
    topics: '',
    age: 7,
    gender: 'boy',
    qualities: '',
    language: 'English', // Default language
  })
  const [joke, setJoke] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleGenderChange = (gender: string) => {
    setFormData((prev) => ({
      ...prev,
      gender,
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    const payload = {
      text: formData.text,
      topics: formData.topics.split(',').map((topic) => topic.trim()),
      age: formData.age,
      gender: formData.gender,
      qualities: formData.qualities.split(',').map((quality) => quality.trim()),
      language: formData.language, // Include language in the payload
    }

    try {
      const response = await axios.post('http://localhost:8000/joke/create_joke', payload)
      const rawJoke = response.data.joke_request.joke
      setJoke(addIconsToJoke(rawJoke))
      handleClose()
    } catch (error) {
      console.error('Error creating joke:', error)
    } finally {
      setLoading(false)
    }
  }

  const addIconsToJoke = (rawJoke: string): string => {
    let updatedJoke = rawJoke
    Object.keys(iconMap).forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
      updatedJoke = updatedJoke.replace(regex, `${keyword} ${iconMap[keyword]}`)
    })

    return updatedJoke
  }

  return (
    <div className="jokes-container">
      <h1>Jokes</h1>
      {joke ? (
        <div className="joke-content">
          <ReactMarkdown>{joke}</ReactMarkdown>
        </div>
      ) : (
        <p>Welcome to the Jokes page! Let's create a fun joke together.</p>
      )}
      <Button className="new-joke-button" onClick={handleShow}>
        Start a New Joke
      </Button>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create a Joke</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>What’s the joke about?</Form.Label>
              <Form.Control
                type="text"
                name="text"
                value={formData.text}
                onChange={handleChange}
                className="fun-input"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pick some funny words (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                name="topics"
                placeholder="e.g., banana, chicken, clown"
                value={formData.topics}
                onChange={handleChange}
                className="fun-input"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>How old is the adventurer?</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="fun-input"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Who is the hero?</Form.Label>
              <div className="gender-selection">
                <Button
                  variant={formData.gender === 'boy' ? 'primary' : 'outline-primary'}
                  onClick={() => handleGenderChange('boy')}
                  className="gender-button"
                >
                  👦 Boy
                </Button>
                <Button
                  variant={formData.gender === 'girl' ? 'primary' : 'outline-primary'}
                  onClick={() => handleGenderChange('girl')}
                  className="gender-button"
                >
                  👧 Girl
                </Button>
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>What makes the hero funny? (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                name="qualities"
                placeholder="e.g., silly, happy, clever"
                value={formData.qualities}
                onChange={handleChange}
                className="fun-input"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Language</Form.Label>
              <Form.Select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="fun-input"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Telugu">Telugu</option>
                <option value="Tamil">Tamil</option>
                <option value="Kannada">Kannada</option>
                <option value="Malayalam">Malayalam</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} className="fun-cancel-button" disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} className="fun-submit-button" disabled={loading}>
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Creating...
              </>
            ) : (
              'Create Joke'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Jokes