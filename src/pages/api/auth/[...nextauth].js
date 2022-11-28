import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const API_LOGIN_ENDPOINT = `${process.env.NEXT_PUBLIC_BACKEND_URL}/athletes/login`
const FRONT_LOGIN_ENDPOINT = "/pages/login"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'enter your email' },
        password: { label: 'Password', type: 'password' }
      },

      async authorize(credentials, req) {
        const res = await fetch(API_LOGIN_ENDPOINT, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          }),
          headers: { 'Content-Type': 'application/json' }
        })

        const athleteProfile = await res.json()
        
        if (res.ok && athleteProfile) {
          return athleteProfile
        }

        return null
      }
    })
  ],
  pages: {
    signIn: FRONT_LOGIN_ENDPOINT
  },

  jwt: {
    encryption: true
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account }) {
      console.log(token)
      if (account && user) {
        token.name = user.first_name
        token.picture = user.image_url
        token.roles = user.roles
        token.athlete_id = user.athlete_id

        return {
          ...token,
          user

          // accessToken: user.data.token,
          // refreshToken: user.data.refreshToken,
        }
      }

      return token
    },

    async session({ session, token }) {
      console.log({ 'TOken imp': token })
      session.user.name = token.user.firstName
      session.user.id = token.sub
      session.user.image = token.picture
      session.user.roles = token.roles

      // session.user.accessToken = token.accessToken;

      return session
    }
  },

  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development'
}

export default NextAuth(authOptions)
