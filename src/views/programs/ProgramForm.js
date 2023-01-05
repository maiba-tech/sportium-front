import { TextareaAutosize } from '@mui/base'
import { Button, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, InputLabel, Stack, TextField, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import React from 'react'
import { useForm } from 'react-hook-form'
import { getAllPrograms, storeProgram } from 'src/handlers/local-storage/LocalStorageApi'
import { CustomInput } from './CustomInput'


const ProgramForm = (props) => {

    const MAX_ATHLETES_PER_PROGRAM = 40
    const MIN_ATHLETES_PER_PROGRAM = 0

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        
        // test purposes we used local storage 
        const programEntity = {
            program_id: crypto.randomUUID(),
            program_description: data.program_description, 
            program_name: data.program_name, 
            program_category: props.category,
            athletes_count: Math.floor(Math.random() * (MAX_ATHLETES_PER_PROGRAM - MIN_ATHLETES_PER_PROGRAM + 1) + MIN_ATHLETES_PER_PROGRAM)
        }

        storeProgram(programEntity); 
        props.setPrograms(getAllPrograms())
        props.handleCloseProgramCreation()

        reset();
    }

    return (
        <Dialog open={props.openProgramCreation} onClose={props.handleCloseProgramCreation}>
            <DialogTitle>Add program</DialogTitle>
            <DialogContent>
                <Card>
                    <CardContent >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack direction="column" spacing={2}>
                                <InputLabel id="program-name-s">Program name</InputLabel>
                                <CustomInput
                                    {...register("program_name", { required: true })}
                                    aria-invalid={errors.program_name ? "true" : "false"}
                                    id="outlined-error"
                                    label="Error"
                                />
                                {errors.program_name?.type === 'required' && <Typography color={'red'}>Program name is required</Typography>}
                                
                                <Divider />
                                
                                <InputLabel id="program-description-s">Program description</InputLabel>
                                <CustomInput
                                    aria-label="Description"
                                    multiline
                                    placeholder="Type something…"
                                    {...register("program_description", { required: true })}

                                />
                                {errors.program_description?.type === 'required' && <Typography color={'red'}>Program description is required</Typography>}
                            </Stack>
                            <Button type='submit' color='success' variant='contained' size='small'>validate</Button>
                        </form>
                    </CardContent>
                </Card>
            </DialogContent>
            <DialogActions>
                <Button color='warning' onClick={props.handleCloseProgramCreation}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ProgramForm