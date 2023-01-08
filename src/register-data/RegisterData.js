

export const inputFields = [
  {
    fullWidth: true,
    type: "text",
    id: "firstName",
    placeholder: 'Maria',
    sx: { marginBottom: 4 },
    label: 'firstName',
    registerOptions: {required: true, }
  },
  {
    fullWidth: true,
    type: "text",
    id: "lastName",
    placeholder: 'Doe',
    sx: { marginBottom: 4 },
    label: 'lastName',
    registerOptions: {required: true, }
  },
  {
    bigLabel: "Date of Birth",
    fullWidth: true,
    type: "date",
    id: "birthDate",
    placeholder: 'MM-DD-YYYY',
    sx: { marginBottom: 4 },
    registerOptions: {
      required: true,
      validate: (date) => {

        // calculate the age and check if it's 13 <= age <= 72
        const age = Math.floor((new Date() - new Date(date).getTime()) / 3.15576e+10)
        if(13 > age || age > 72)
        {
          return "Age must be between 13 and 72 ans"; 
        }
      } 
    }
  },
  {
    fullWidth: true,
    type: "email",
    id: "email",
    placeholder: 'example@exa.com',
    sx: { marginBottom: 4 },
    label: 'Email',
    registerOptions: {required: true, pattern: /^\S+@\S+$/i}
  },
  {
    fullWidth: true,
    type: "number",
    id: "height",
    placeholder: 'Height',
    sx: { marginBottom: 4 },
    label: 'height in meters (ex: 1.67)',
    registerOptions: {required: true, min: 1, max: 2.50}
 },
  {
    fullWidth: true,
    type: "number",
    id: "weight",
    placeholder: 'Weight',
    sx: { marginBottom: 4 },
    label: 'weight in KG (ex: 67)',
    registerOptions: {required: true, min: 20, max: 120}
  },
  {
    bigLabel: "CV", 
    fullWidth: true,
    type: 'file',
    id: 'cv',
    placeholder: 'Add Your CV',
    sx:{ marginBottom: 4 },
    registerOptions: {required: true}
  },

  {
    bigLabel: "Certificates", 
    fullWidth: true,
    type: 'file',
    id: 'certificates',
    placeholder: 'Add Certificates',
    inputProps: { multiple: true },
    sx: { marginBottom: 4 },
    registerOptions: {required: true}
  }
]
