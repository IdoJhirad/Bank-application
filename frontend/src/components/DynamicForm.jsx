import React, {useState} from "react";

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
        <>
            <h1>{title}</h1>
            <form onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <div key={field.name}>
                        <label>{field.label}</label>
                        <input type={field.type}
                               name={field.name}
                               placeholder={field.placeholder}
                               value={formData[field.name]}
                               onChange={handleChange}
                               required={field.required}
                        />
                    </div>
                ))}
                <button type="submit">{submitText}</button>
            </form>
        </>
    )

}
export default DynamicForm;