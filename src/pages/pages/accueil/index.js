import Companies from "../../../views/acceuil/Components/Companies";
import Guide from "../../../views/acceuil/Components/Guide";
import Hero from "../../../views/acceuil/Components/Hero";
import Properties from "../../../views/acceuil/Components/Properties";
import Details from "../../../views/acceuil/Components/Details";
import GetStarted from "../../../views/acceuil/Components/GetStarted";
import Footer from "../../../views/acceuil/Components/Footer";
import BlankLayout from 'src/@core/layouts/BlankLayout';


function App() {
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
