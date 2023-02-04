import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';

const StepUI = (props) => {

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
                        repitition: <strong>{props.step.repetition}</strong>
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

export default StepUI