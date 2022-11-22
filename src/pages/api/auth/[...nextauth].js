import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {

    // Configure one or more authentication providers
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
            // email: {label: "Email", type: "text", placeholder:"enter your email"},
            // password: {label: "Password", type: "password" }
        },

        // async authorize(credentials, req) {
        //     const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`,{
        //         method: 'POST',
        //         body: JSON.stringify(credentials),
        //         headers: {"Content-Type": "application/json"}
        //     })
        //     const profile = await res.json()

        //     if(res.ok && profile){
                
        //         return profile
        //     }

        //     return null
        // }
        async authorize(credentials, req) {
            const {email, password} = credentials;
            if(email === "omar@gmail.com" && password === "123")
              return { id: "1", name: "omar"} 
        }

      })
    ],
    pages: {
      signIn: "/pages/login"
    }
  }

  export default NextAuth(authOptions)