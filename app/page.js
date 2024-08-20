'use client'
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Head from "next/head";
import { Grid, Container, AppBar, Toolbar, Typography,Button, Userbutton, Box } from "@mui/material";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from 'next/link'; 

export default function Home() {
  const router = useRouter();
  const handleSubmit = async (planType) =>{
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000/',
      },
      body: JSON.stringify({ planType }), // Send the plan type
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }

  }
  return (
    <Container maxWidth={false} disableGutters>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content='Create flashcards from your text'/>
      </Head>

      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>Flashcard SaaS</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Log in</Button>
            <Button color="inherit" href="/sign-up">Sign up</Button>
          </SignedOut>
          <SignedIn>
          <Button color="inherit" component={Link} href="/flashcards" sx={{ mr: 2 }}>
            My Flashcards
          </Button>
          <UserButton />
        </SignedIn>
        </Toolbar>
      </AppBar>
      
      <Box
        sx={{
          backgroundImage: 'url(/hero-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '70vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" gutterBottom>Welcome to Flashcard SaaS</Typography>
          <Typography variant="h5" gutterBottom>
            The easiest way to make flashcards from your text
          </Typography>
          <Button
            variant='contained'
            color='primary'
            size="large"
            sx={{ mt: 2 }}
            onClick={() => router.push('/generate')}
          >
            Get Started
          </Button>
        </motion.div>
      </Box>
      <Box sx={{my:6, mx:6}}>
        <Typography variant = "h4" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
        <Grid item xs ={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Easy Text input
          </Typography>
          <Typography>
            {' '}
            Simply input your text and let our software do the rest. Creating 
            flashcards has never been easier.
          </Typography>
        </Grid>
        <Grid item xs ={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Smart Flashcards
          </Typography>
          <Typography>
            {' '}
            Our AI intelligently breaks down your text into concise
            flashcards, perfect for studying
          </Typography>
        </Grid>
        <Grid item xs ={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Accessible Anywhere
          </Typography>
          <Typography>
            {' '}
            Access your flashcards from any device, at anytime, Study on the go with ease.
          </Typography>
        </Grid>
        </Grid>
      </Box>
      <Box sx={{my:6,textAlign: 'center'}}>
        <Typography variant = "h4" sx={{my:4}}>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs ={12} md={6}>
            <Box sx={{
              p:3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
              <Typography variant="h5" gutterBottom>
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom>
                $0 / Month
              </Typography>
              <Typography>
                Access to basic flashcard features and limited storage
              </Typography>
              <Button variant='contained' color='primary' sx={{mt:2}} onClick={() => handleSubmit('basic')}>
                Choose basic
              </Button>
            </Box>
          </Grid>

          <Grid item xs ={12} md={6}>
            <Box sx={{
              p:3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
            }}>
              <Typography variant="h5" gutterBottom>
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom>
                $5 / Month
              </Typography>
              <Typography>
                Unlimited flashcards and storage, with priority support
              </Typography>
              <Button 
                  variant='contained' 
                  color='primary' 
                  sx={{mt:2}}
                  onClick={() => handleSubmit('pro')}
                >
                  Choose pro
                </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
