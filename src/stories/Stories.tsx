import React, { useState } from 'react'
import { Modal, Button, Form, Spinner } from 'react-bootstrap'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Stories.css'
import { iconMap } from './icons' // Import the icon map

const Stories = () => {
  const [showModal, setShowModal] = useState(true)
  const [formData, setFormData] = useState({
    text: 'Can you tell a story?',
    topics: '',
    age: 7,
    gender: 'boy',
    qualities: '',
    language: 'English', // Default language
  })
  const [story, setStory] = useState<string | null>(null)
  const [loading, setLoading] = useState(false) // State to track loading
  const [isReading, setIsReading] = useState(false) // State to track if the story is being read aloud

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
    setLoading(true) // Start loading
    const payload = {
      text: formData.text,
      topics: formData.topics.split(',').map((topic) => topic.trim()),
      age: formData.age,
      gender: formData.gender,
      qualities: formData.qualities.split(',').map((quality) => quality.trim()),
      language: formData.language, // Include language in the payload
    }

    try {
      const response = await axios.post('http://localhost:8000/story/create_story', payload)
      const rawStory = response.data.story_request.story
      setStory(addIconsToStory(rawStory)) // Add icons to the story
      handleClose()
    } catch (error) {
      console.error('Error creating story:', error)
    } finally {
      setLoading(false) // Stop loading
    }
  }

  // Function to add icons dynamically to the story
  const addIconsToStory = (rawStory: string): string => {
    let updatedStory = rawStory
    Object.keys(iconMap).forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi') // Match whole words, case-insensitive
      updatedStory = updatedStory.replace(regex, `${keyword} ${iconMap[keyword]}`)
    })

    return updatedStory
  }

  // Function to read the story aloud
  const readStoryAloud = () => {
    if (!story) return

    // Remove emojis from the story
    const storyWithoutEmojis = story.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')

    const utterance = new SpeechSynthesisUtterance(storyWithoutEmojis)
    const languageCode = getLanguageCode(formData.language)

    // Set the language for the utterance
    utterance.lang = languageCode

    // Check if the selected language is supported
    const voices = speechSynthesis.getVoices()
    const voice = voices.find((v) => v.lang === languageCode)

    if (voice) {
      utterance.voice = voice
    } else {
      console.warn(`No voice found for language: ${formData.language} (${languageCode})`)
    }

    utterance.onstart = () => setIsReading(true)
    utterance.onend = () => setIsReading(false)

    speechSynthesis.speak(utterance)
  }

  // Function to stop reading the story
  const stopStoryReading = () => {
    speechSynthesis.cancel()
    setIsReading(false)
  }

  // Helper function to map language to language codes
  const getLanguageCode = (language: string): string => {
    const languageMap: { [key: string]: string } = {
      English: 'en-US',
      Hindi: 'hi-IN',
      Spanish: 'es-ES',
      French: 'fr-FR',
      German: 'de-DE',
      Telugu: 'te-IN',
      Tamil: 'ta-IN',
      Kannada: 'kn-IN',
      Malayalam: 'ml-IN',
    }
    return languageMap[language] || 'en-US' // Default to English if language is not found
  }

  return (
    <div className="stories-container">
      <h1>Stories</h1>
      {story ? (
        <div className="story-content">
          <Button
            className={`read-aloud-button ${isReading ? 'reading' : ''}`}
            onClick={isReading ? stopStoryReading : readStoryAloud}
          >
            {isReading ? 'Stop Reading' : 'Read Aloud'}
          </Button>
          <ReactMarkdown>{story}</ReactMarkdown>
        </div>
      ) : (
        <p>Welcome to the Stories page! Let's create a fun story together.</p>
      )}
      <Button className="new-story-button" onClick={handleShow}>
        Start a New Story
      </Button>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create a Story</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>What’s the story about?</Form.Label>
              <Form.Control
                type="text"
                name="text"
                value={formData.text}
                onChange={handleChange}
                className="fun-input"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pick some magical words (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                name="topics"
                placeholder="e.g., sea, beach, sand"
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
              <Form.Label>What makes the hero special? (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                name="qualities"
                placeholder="e.g., curious, adventurous"
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
              'Create Story'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Stories