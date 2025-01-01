import React, {useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";

function DynamicForm({fields ,onSubmit, title, submitText}) {
    const [formData, setFormData] = useState(
        //initialize the fields of form data to empty string
        fields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
        },{})
    );
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                maxWidth: 400,
                width: "100%",
            }}
        >
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>
            {fields.map((field) => (
                <TextField
                    key={field.name}
                    id={field.name}
                    label={field.label}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    fullWidth
                    margin="normal"
                    type={field.type}
                />
            ))}
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                {submitText}
            </Button>
        </Box>
    )

}
export default DynamicForm;