
import { Button, CardContent, Dialog, Select, MenuItem, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, InputLabel, Stack, TextField, Typography, Snackbar, Alert, Modal } from '@mui/material'
import Card from '@mui/material/Card'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { getAllPrograms, storeProgram } from 'src/handlers/local-storage/LocalStorageApi'


const step_types = {
    Warmup: "#d63031", 
    Run : "#2d3436", 
    CoolDown : "#0984e3", 
    Recover : "#fdcb6e", 
    Rest : "#e84393"
}

const steps_types = [
    "Warmup", 
    "Run", 
    "CoolDown", 
    "Recover", 
    "Rest"
]


const StepForm = (props) => {


    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    
    const onSubmit = (data) => {

        // test purposes we used local storage 

        const step = {
            type: data.type, 
            duration: data.duration, 
            repitition:data.repitition,
            color: step_types[data.type]
        }

        props.setNewSteps(steps => [
            ...steps, step
        ])

        console.log(props.newSteps)

        // storeProgram(programEntity); 
        // props.setPrograms(getAllPrograms())
        props.handleCloseStepCreation()
        

        reset();
        console.log(step)
    }

    return (
        <>
            <Dialog open={props.openStepCreation} onClose={props.handleCloseStepCreation}>
                <DialogTitle>Add new step</DialogTitle>
                <DialogContent>
                    <Card>
                        <CardContent >

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Stack direction={'column'} spacing={2}>
                                    <FormControl sx={{ m: 5, minWidth: 150 }} size="small">
                                        <InputLabel id="step-type-select">Step type</InputLabel>
                                        <Select
                                            id='step-select'
                                            label="Step type"
                                            {...register("type", { required: true })}
                                        >
                                            {
                                                steps_types.map((type, index) => (
                                                    <MenuItem key={index} value={type}>{type}</MenuItem>
                                                ))
                                            }

                                        </Select>

                                    </FormControl>
                                    <TextField
                                        id="time"
                                        label="duration (min : sec)"
                                        type="time"
                                        defaultValue="00:00"
                                        size='small'
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                        sx={{ m: 5, minWidth: 150 }}
                                        {...register("duration", {
                                            required: true,
                                        })}
                                    />
                                    <TextField
                                        id="repitition"
                                        label="repitition"
                                        type="number"
                                        defaultValue="1"
                                        size='small'
                                        InputProps={{ inputProps: { min: 1, max: 30 } }}
                                        sx={{ m: 5, minWidth: 150 }}
                                        {...register("repitition", { required: true })}
                                    />

                                    <Button type='submit' color='success' variant='contained' size='small'>validate</Button>
                                </Stack>

                            </form>
                        </CardContent>
                    </Card>
                </DialogContent>

                <DialogActions>
                    <Button color='warning' onClick={props.handleCloseStepCreation}>Cancel</Button>
                </DialogActions>

            </Dialog>
        </>
    )
}

export default StepForm