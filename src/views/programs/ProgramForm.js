
import { Button, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, InputLabel, Stack, TextField, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import React from 'react'
import { useForm } from 'react-hook-form'
import { createProgramGroup } from 'src/handlers/fetchers/ProgramGroupFetchers'
import { getAllPrograms, storeProgram } from 'src/handlers/local-storage/LocalStorageApi'


import useSWRMutation from 'swr/mutation'


const MAX_ATHLETES_PER_PROGRAM = 40
const MIN_ATHLETES_PER_PROGRAM = 0

const ProgramForm = (props) => {


    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const {
        trigger,
        isMutating
    } = useSWRMutation('/groups/create', createProgramGroup)

    const onSubmit = async (data) => {

        // test purposes we used local storage 
        const programEntity = {
            program_id: crypto.randomUUID(),
            program_description: data.program_description,
            program_name: data.program_name,
            program_category: props.category,
            athletes_count: Math.floor(Math.random() * (MAX_ATHLETES_PER_PROGRAM - MIN_ATHLETES_PER_PROGRAM + 1) + MIN_ATHLETES_PER_PROGRAM)
        }

        const programEn = {
            name: data.program_name,
            bio: data.program_description,
            creator: props.creator,
            category: props.category
        }

        console.log(programEn)

        /**
         * program creation object: 
         * 
         * {
         *  name: ".....", 
         *  bio:  ".....", 
         *  creator:  ".....", 
         *  category ".....": 
         * }
         */

        
        try {
            trigger(programEn)
            
        } catch (err) {
            console.log(err)
        }

        // props.handleCloseProgramCreation()

        reset();

        props.router.reload(window.location.pathname)
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
                                <TextField
                                    {...register("program_name", { required: true })}
                                    aria-invalid={errors.program_name ? "true" : "false"}
                                    id="outlined-error"
                                />
                                {errors.program_name?.type === 'required' && <Typography color={'red'}>Program name is required</Typography>}

                                <Divider />

                                <InputLabel id="program-description-s">Program description</InputLabel>
                                <TextField
                                    aria-label="Description"
                                    multiline
                                    placeholder="Type something…"
                                    {...register("program_description", { required: true })}

                                />
                                {errors.program_description?.type === 'required' && <Typography color={'red'}>Program description is required</Typography>}
                            </Stack>
                            <Button 
                                sx={{ m: 1 }} 
                                disabled={isMutating} 
                                type='submit' 
                                color='success' 
                                variant='contained' 
                                size='small'>
                                    {isMutating ? 'Creating ...' : 'Validate'}
                                </Button>
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