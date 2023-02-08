import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack, TextField } from '@mui/material';
import { getSession } from 'next-auth/react';
import { ContentSavePlus, Label } from 'mdi-material-ui';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material';
import { FormControl } from '@mui/material';


const ProgramCard = ({ program }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [openRequest, setOpenRequest] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const handleJoin = () => {
    setOpenRequest(true);
  };

  const handleSendRequest = () => {
    // Envoyer la demande de participation ici
    setIsJoined(true);
    setOpenRequest(false);
    setOpenConfirmation(true);
  };

  const handleCloseRequest = () => {
    setOpenRequest(false);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  return (
    <Card >
      <CardContent>
        {/* <Avatar src={program.coach.photo} alt={program.coach.name} width={60} height={60} /> */}
        <Typography color="textSecondary" gutterBottom>
          Coach: {program.creatorName}
        </Typography>
        <Typography variant="h5" component="h2">
          {program.name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Category : {program.category}
        </Typography>
        <Typography
          color="textSecondary">
          {program.bio}
        </Typography>
        <Typography variant="body2" component="p">
          Nombre d'athlètes: {program.numAthletes}
        </Typography>
      </CardContent>
      <CardActions>
        {isJoined ? (
          <Button size="small" color='secondary' disabled>
            Request sent
          </Button>
        ) : (
          <Button size="small" color='primary' onClick={handleJoin}>
            Rejoindre
          </Button>
        )}
      </CardActions>
      <Dialog
        open={openRequest}
        onClose={handleCloseRequest}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Demande de participation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voulez-vous vraiment envoyer une demande de participation au programme "{program.name}" au
            coach {program.creatorName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRequest} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSendRequest} color="primary" autoFocus>
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openConfirmation}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Demande de participation envoyée"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Votre demande de participation au programme "{program.name}" a été envoyée au coach {program.creatorName}.
            Vous recevrez une réponse dans les prochains jours.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

// const DropboxFilter = ({ filterItem, menuItems, label }) => {
//   const [selectedValue, setSelectedValue] = useState('all');
//   const handleCategorieChange = (event) => {
//     setSelectedValue(event.target.value)
//     filterItem(event.target.value)
//   }
//   return (
//     <div>
//       <Select
//           id='categorie-select'
//           value={selectedValue}
//           label="categorie"
//           onChange={handleCategorieChange}
//       >
//         {menuItems.map(option => (
//             <MenuItem value={option}>{option}</MenuItem>
//           ))}
//       </Select>
//     </div>
//   );
// };

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/pages/login',
        permanent: false
      }
    }
  }
  
  return {
    props: {
      programs: body,
      session: session
    }
  }
}




const ProgramList = () => {
  const [programs, setPrograms] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [dataFiltredByCat, setDataFiltredByCat] = useState(programs)
  const [data, setData] = useState(programs)
  const [menuItems, setMenuItems] = useState(['all']);
  const [{ min, max }, setRangeValues] = useState({ min: -1, max: Infinity })
  const [selectedValue, setSelectedValue] = useState('all');


  // const filterItem = (curcat) => {
  //   if(curcat === 'all') {
  //     setData(programs)
  //     setDataFiltredByCat(programs)
  //   }
  //   else {
  //     const filtredData = programs.filter((newVal) => {
  //       return newVal.category.name === curcat;
  //     });
  //     setData(filtredData)
  //     setDataFiltredByCat(filtredData)
  //   }

  // };
  // const filterItemMinMax = (min,max) => {
  //   const filtredData = data.filter((newVal) => {
  //     return (newVal.numAthletes >= min) && (newVal.numAthletes <= max);
  //   });
  //   setDataFiltredByCat(filtredData);
  // };

  const filterAll = (category, min, max) => {
    if (category === 'all') {
      const filtredData = programs.filter((newVal) => {
        return (newVal.numAthletes >= min) && (newVal.numAthletes <= max)
      });
      setData(filtredData)
    }
    else {
      const filtredData = programs.filter((newVal) => {
        return (newVal.category.name === category) && (newVal.numAthletes >= min) && (newVal.numAthletes <= max)
      });
      setData(filtredData)
    }
  }

  const handleCategorieChange = (event) => {
    setSelectedValue(event.target.value)
    filterAll(event.target.value, min, max)
  }

  const handleMinChange = (event) => {
    var newMin
    if (event.target.value === '') {
      newMin = -1
    }
    else {
      newMin = parseInt(event.target.value)
    }
    setRangeValues({ min: newMin, max: max })
    filterAll(selectedValue, newMin, max)
  }

  const handleMaxChange = (event) => {
    var newMax
    if (event.target.value === '') {
      newMax = Infinity
    }
    else {
      newMax = parseInt(event.target.value)
    }
    setRangeValues({ min: min, max: newMax })
    filterAll(selectedValue, min, newMax)
  }

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/groups/`)
      .then(res => res.json())
      .then(data => {
        data.map(
          element => {
            element.numAthletes = Math.floor(Math.random() * 300)
          }
        )
        setPrograms(data)
        setData(data)
        setLoading(false)
        setMenuItems(['all', ...new Set(data.map((Val) => Val.category.name))])
      })
  }, [])


  if (isLoading) return <p>Loading...</p>


  if (!data) return <p>No profile data</p>


  return (
    <Stack direction='column' spacing={2}>
      <FormControl>
        <Stack direction="row" spacing={2}>
          {/* <InputLabel id="categorie-select-label">Categorie</InputLabel> */}
          <Select
            id='categorie-select'
            value={selectedValue}
            labelId="categorie-select-label"
            label="categorie"
            onChange={handleCategorieChange}
          >
            {menuItems.map((option, index) => (
              <MenuItem key={index} value={option}>{option}</MenuItem>
            ))}
          </Select>
          <TextField id='min-number' label="Min" type="Number" onChange={handleMinChange} />
          <TextField id='max-number' label="Max" type="Number" onChange={handleMaxChange} />
        </Stack>
      </FormControl>
      {data.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </Stack>
  );
};

export default ProgramList;
