import Companies from "./Components/Companies";
import Guide from "./Components/Guide";
import Hero from "./Components/Hero";
import Properties from "./Components/Properties";
import Details from "./Components/Details";
import GetStarted from "./Components/GetStarted";
import Footer from "./Components/Footer";
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
