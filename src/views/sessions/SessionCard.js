import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {



    return (
        <div>

            <Dialog
                fullScreen
                open={props.open}
                onClose={props.handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={props.handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Sessions
                        </Typography>

                    </Toolbar>
                </AppBar>
                <List>
                    {
                        props.sessions.map((sess, index) => (
                            <ListItem button key={index}>
                                <ListItemText
                                    primary={sess.title}
                                    secondary={"Steps count: "+sess.listSteps.length}
                                />
                            </ListItem>
                        ))
                    }
                    {/* <ListItem button>
                        <ListItemText primary="Phone ringtone" secondary="Titania" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText
                            primary="Default notification ringtone"
                            secondary="Tethys"
                        />
                    </ListItem> */}
                </List>
            </Dialog>
        </div>
    );
}