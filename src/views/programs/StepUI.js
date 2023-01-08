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
import ClearIcon from '@mui/icons-material/Clear';

export const StepUI = (props) => {

    return (

        <AppBar position='static' sx={{ borderRadius: '12px' }}>
            <Container maxWidth='xl' sx={{ backgroundColor: props.step.color, borderRadius: '12px' }}>

                <Box sx={{
                    flexGrow: 1, display: { md: 'flex' }, backgroundColor: '#dfe6e9',

                }}>

                    <Button

                        sx={{ my: 2, color: '#2d3436', display: 'block' }}
                    >
                        <strong>{props.step.type}</strong>
                    </Button>
                    <Button

                        sx={{ my: 2, color: '#2d3436', display: 'block' }}
                    >
                        Duration (mm:ss): <strong>{props.step.duration}</strong>
                    </Button>
                    <Button

                        sx={{ my: 2, color: '#2d3436', display: 'block' }}
                    >
                        repitition: <strong>{props.step.repitition}</strong>
                    </Button>
                    <Button
                        sx={{ ml: 'auto' }}
                        startIcon={<ClearIcon />}
                        onClick={(event) => {
                            var array = [...props.newSteps];
                            array.splice(props.index, 1)
                            props.setNewSteps(array)
                        }}
                    />
                </Box>

            </Container>
        </AppBar>
    )
}
