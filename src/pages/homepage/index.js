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
          Nombre d'athl??tes: {program.athleteCount}
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
        <DialogTitle id="alert-dialog-title">{"Demande de participation envoy??e"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Votre demande de participation au programme "{program.name}" a ??t?? envoy??e au coach {program.coach.name}.
            Vous recevrez une r??ponse dans les prochains jours.
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
      "name": "Programme de musculation avanc??",
      "description": "Ce programme de musculation est con??u pour ceux qui cherchent ?? atteindre des niveaux de performance sup??rieurs. Il comprend des exercices de musculation avanc??s et un plan de nutrition adapt??.",
      "athleteCount": 35
    },
    {
      "id": 2,
      "coach": { "name": "Jane Doe", "photo": "https://www.google.com/images/jane-doe.jpg" },
      "name": "Programme de course ?? pied pour d??butants",
      "description": "Ce programme de course ?? pied est destin?? aux d??butants et vise ?? am??liorer la forme physique et la condition physique. Il comprend des entra??nements en endurance et en vitesse, ainsi qu'un plan de nutrition ??quilibr??.",
      "athleteCount": 15
    },
    {
      "id": 3,
      "coach": { "name": "Jane Doe", "photo": "https://www.google.com/images/jane-doe.jpg" },
      "name": "Programme de yoga pour la relaxation",
      "description": "Ce programme de yoga vous aidera ?? vous d??tendre et ?? vous relaxer gr??ce ?? une s??rie de poses de yoga et de techniques de respiration. Il inclut ??galement des conseils de nutrition pour soutenir votre pratique de yoga.",
      "athleteCount": 10
    },
    {
      "id": 4,
      "coach": { "name": "John Smith", "photo": "https://www.google.com/images/john-smith.jpg" },
      "name": "Programme de musculation pour d??butants",
      "description": "Ce programme de musculation est id??al pour les d??butants qui souhaitent d??velopper leur force et leur endurance musculaire. Il comprend des exercices de base de musculation et un plan de nutrition adapt?? aux besoins des d??butants.",
      "athleteCount": 20
    },
    {
      "id": 5,
      "coach": { "name": "John Smith", "photo": "https://www.google.com/images/john-smith.jpg" },
      "name": "Programme de fitness en circuit",
      "description": "Ce programme de fitness en circuit vous permettra de travailler tout votre corps gr??ce ?? une s??rie d'exercices de haute intensit??. Il comprend ??galement un plan de nutrition pour vous aider ?? atteindre vos objectifs de forme physique.",
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
