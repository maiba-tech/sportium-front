import React, { useState } from 'react';
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
import { Stack } from '@mui/material';
import { getSession } from 'next-auth/react';




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
  else if (!session.user.roles.some(e => e.name === 'COACH')) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      session: session
    }
  }
}



// const useStyles = makeStyles({
//   root: {
//     minWidth: 275,
//   },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });

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
        <Avatar src={program.coach.photo} alt={program.coach.name} width={60} height={60} />
        <Typography color="textSecondary" gutterBottom>
          Coach: {program.coach.name}
        </Typography>
        <Typography variant="h5" component="h2">
          {program.name}
        </Typography>
        <Typography
          color="textSecondary">
          {program.description}
        </Typography>
        <Typography variant="body2" component="p">
          Nombre d'athlètes: {program.athleteCount}
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
            coach {program.coach.name}?
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
            Votre demande de participation au programme "{program.name}" a été envoyée au coach {program.coach.name}.
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

const ProgramList = () => {

  const programs = [
    {
      "id": 1,
      "coach": { "name": "Jane Doe", "photo": "https://www.google.com/images/jane-doe.jpg" },
      "name": "Programme de musculation avancé",
      "description": "Ce programme de musculation est conçu pour ceux qui cherchent à atteindre des niveaux de performance supérieurs. Il comprend des exercices de musculation avancés et un plan de nutrition adapté.",
      "athleteCount": 35
    },
    {
      "id": 2,
      "coach": { "name": "Jane Doe", "photo": "https://www.google.com/images/jane-doe.jpg" },
      "name": "Programme de course à pied pour débutants",
      "description": "Ce programme de course à pied est destiné aux débutants et vise à améliorer la forme physique et la condition physique. Il comprend des entraînements en endurance et en vitesse, ainsi qu'un plan de nutrition équilibré.",
      "athleteCount": 15
    },
    {
      "id": 3,
      "coach": { "name": "Jane Doe", "photo": "https://www.google.com/images/jane-doe.jpg" },
      "name": "Programme de yoga pour la relaxation",
      "description": "Ce programme de yoga vous aidera à vous détendre et à vous relaxer grâce à une série de poses de yoga et de techniques de respiration. Il inclut également des conseils de nutrition pour soutenir votre pratique de yoga.",
      "athleteCount": 10
    },
    {
      "id": 4,
      "coach": { "name": "John Smith", "photo": "https://www.google.com/images/john-smith.jpg" },
      "name": "Programme de musculation pour débutants",
      "description": "Ce programme de musculation est idéal pour les débutants qui souhaitent développer leur force et leur endurance musculaire. Il comprend des exercices de base de musculation et un plan de nutrition adapté aux besoins des débutants.",
      "athleteCount": 20
    },
    {
      "id": 5,
      "coach": { "name": "John Smith", "photo": "https://www.google.com/images/john-smith.jpg" },
      "name": "Programme de fitness en circuit",
      "description": "Ce programme de fitness en circuit vous permettra de travailler tout votre corps grâce à une série d'exercices de haute intensité. Il comprend également un plan de nutrition pour vous aider à atteindre vos objectifs de forme physique.",
      "athleteCount": 25
    }]

  return (
    <Stack direction='column' spacing={2}>
      {programs.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </Stack>
  );
};

export default ProgramList;
