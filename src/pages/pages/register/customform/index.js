
import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const CustomForm = () => {


    const {register, handleSubmit, watch, formState : {errors}} = useForm(); 
    const onSubmit = data => console.log(data); 


    console.log(watch("example"))
    return (
        <Box className='content-center'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    fullWidth
                    type='text'
                    label='firstName'
                    placeholder='Mohamed'
                    {...register("firstName", {required: true, maxLength: 20, pattern: /^[A-Za-z]+$/i})}

                />
                <TextField
                    fullWidth
                    type='text'
                    label='lastName'
                    placeholder='Ahrrass'
                    {...register("lastName", {required: true, maxLength: 20, pattern: /^[A-Za-z]+$/i})}

                />
                <TextField
                    defaultValue={""}
                    fullWidth
                    type='email'
                    label='email'
                    placeholder='asdf@example.com'
                    {...register("example")}
                />
                <TextField
                    fullWidth
                    type='password'
                    label='password'
                    placeholder='password'

                />
                <Button
                    fullWidth
                    size='small'
                    type='submit'
                >
                    SUBMIT

                </Button>
            </form>
        </Box>
    )
}

CustomForm.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default CustomForm