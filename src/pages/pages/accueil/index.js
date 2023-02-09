import Companies from "../../../views/acceuil/Components/Companies";
import Guide from "../../../views/acceuil/Components/Guide";
import Hero from "../../../views/acceuil/Components/Hero";
import Properties from "../../../views/acceuil/Components/Properties";
import Details from "../../../views/acceuil/Components/Details";
import GetStarted from "../../../views/acceuil/Components/GetStarted";
import Footer from "../../../views/acceuil/Components/Footer";
import BlankLayout from 'src/@core/layouts/BlankLayout';
import { getSession } from "next-auth/react";



export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session) {
      return {
          redirect: {
              destination: '/account-settings',
              permanent: false
          }
      }
  }
  
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/`)
  // const body = await res.json();


  return {
      props: {
          message: "Hello"
      }
  }
}

function App(props) {
  return (
    <>
      <Hero />
      <Companies />
      <Properties />      
      <Guide />
      <Details />
      <GetStarted />
      <Footer />
    </>
  );
}
App.getLayout = page => <BlankLayout>{page}</BlankLayout>


export default App;
