import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Card } from '@mui/material';


export const StepUI = (props) => {



    return (

        <AppBar position='static'>
            <Container maxWidth='xl' sx={{backgroundColor: props.step.color}}>

                <Box sx={{
                    flexGrow: 1, display: { md: 'flex' }, backgroundColor: '#dfe6e9',
                    
                }}>

                    <Button

                        sx={{ my: 2, color: '#2d3436', display: 'block' }}
                    >
                        {props.step.type}
                    </Button>
                    <Button

                        sx={{ my: 2, color: '#2d3436', display: 'block' }}
                    >
                        {props.step.duration}
                    </Button>
                    <Button

                        sx={{ my: 2, color: '#2d3436', display: 'block' }}
                    >
                        {props.step.repitition}
                    </Button>
                </Box>

            </Container>
        </AppBar>
    )
}
