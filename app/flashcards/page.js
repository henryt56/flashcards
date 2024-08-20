'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"
import { Card, CardActionArea, CardContent, Grid, Typography, Container, TextField, Box, Paper, Button } from "@mui/material"
import { motion } from "framer-motion"

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return
      const docRef = doc(collection(db, 'users'), user.id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || []
        setFlashcards(collections)
      } else {
        await setDoc(docRef, { flashcards: [] })
      }
    }
    getFlashcards()
  }, [user])

  if (!isLoaded || !isSignedIn) {
    return null
  }

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`)
  }

  const filteredFlashcards = flashcards.filter(flashcard =>
    flashcard.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, mt: 2 }}>
      <Button color="inherit" onClick={() => router.push('/')}>Home</Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => router.push('/generate')}
          sx={{mx:2}}
        >
          Generate Flashcards
        </Button>
      </Box>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#333' }}>
          My Flashcard Sets
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search flashcard sets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4 }}
        />
        <Grid container spacing={3}>
          {filteredFlashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  sx={{ 
                    borderRadius: 2, 
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    transition: '0.3s',
                    '&:hover': {
                      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      handleCardClick(flashcard.name)
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ color: '#1976d2' }}>
                        {flashcard.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Click to view flashcards
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  )
} 