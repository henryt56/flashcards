import { SignIn } from "@clerk/nextjs";
import { Box, AppBar, Button, Container,Link,Toolbar, Typography } from "@mui/material";

export default function SignUpPage() {
  return <Container maxWidth="100vw">
    <AppBar position="static" sx={{}}> 
     <Toolbar>
      <Typography variant='h6' sx={{
        flexGrow:1,
      }}>
        Flashcard SaaS
      </Typography>
      <Button color="inherit">
        <Link href="/sign-in" passHref>
        Login
        </Link>
      </Button>
      <Button color="inherit">
        <Link href="/sign-up" passHref>
        Sign up
        </Link>
      </Button>
     </Toolbar>
    </AppBar>

    <Box
    display= "flex"
    flexDirection={"column"}
    alignItems={"center"}
    justifyContent={"center"}
    >
      <Typography variant="h4" align="center">
        Sign In
        <SignIn/>
      </Typography>
    </Box>
  </Container>


}