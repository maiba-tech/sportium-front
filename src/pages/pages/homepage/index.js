import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const ProgramCard = ({ program }) => {
  const classes = useStyles();
  const [isJoined, setIsJoined] = useState(false);

  const handleJoin = () => {
    // Rejoindre le programme ici
    setIsJoined(true);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Avatar src={program.coach.photo} alt={program.coach.name} width={60} height={60} />
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Coach: {program.coach.name}
        </Typography>
        <Typography variant="h5" component="h2">
          {program.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
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
    </Card>
  );
};

const ProgramList = () => {

  const programs = [
    {
      "id": 1,
      "coach": {"name": "Jane Doe", "photo": "https://www.google.com/images/jane-doe.jpg"},
      "name": "Programme de musculation avancé",
      "description": "Ce programme de musculation est conçu pour ceux qui cherchent à atteindre des niveaux de performance supérieurs. Il comprend des exercices de musculation avancés et un plan de nutrition adapté.",
      "athleteCount": 35
    },
    {
      "id": 2,
      "coach": {"name": "Jane Doe", "photo": "https://www.google.com/images/jane-doe.jpg"},
      "name": "Programme de course à pied pour débutants",
      "description": "Ce programme de course à pied est destiné aux débutants et vise à améliorer la forme physique et la condition physique. Il comprend des entraînements en endurance et en vitesse, ainsi qu'un plan de nutrition équilibré.",
      "athleteCount": 15
    },
    {
      "id": 3,
      "coach": {"name": "Jane Doe", "photo": "https://www.google.com/images/jane-doe.jpg"},
      "name": "Programme de yoga pour la relaxation",
      "description": "Ce",
      "athleteCount": 15
    }]

      return (
    <div>
      {programs.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </div>
  );
};

export default ProgramList;
