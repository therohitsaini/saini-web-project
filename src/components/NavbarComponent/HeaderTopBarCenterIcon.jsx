import { useState } from 'react';
import IconifyPicker from '@zunicornshift/mui-iconify-picker';
import { TextField, Button, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function HeaderTopBarCenterIcon() {
    const [iconFields, setIconFields] = useState([
        { item_Title: "", icon: '', url: '' }
    ]);

    // Handle input changes
    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updatedFields = [...iconFields];
        updatedFields[index][name] = value;
        setIconFields(updatedFields);
    };

    // Add new field set
    const addNewField = () => {
        const inistialState = {
            item_Title: "",
            icon: '',
            url: ''
        }
        setIconFields([...iconFields, inistialState]);
    };

    // Remove a field set
    const removeField = (index) => {
        const updatedFields = iconFields.filter((_, i) => i !== index);
        setIconFields(updatedFields);
    };

    return (
        <form className='flex justify-center flex-col items-center'>

            <div className="flex flex-col gap-4  ">
                <h1 className='flex justify-start w-full'>Header To Bar Center Icone</h1>

                {
                      iconFields.map((field, index) => (
                        <div
                            key={index}
                            className="border border-slate-400/20 rounded-md p-5 w-[100%] relative"
                        >
                            <div className="flex justify-between gap-2 mb-3">
                                <TextField
                                    label={`Title ${index + 1}`}
                                    size="small"
                                    variant="outlined"
                                    name="item_Title"
                                    value={field.item_Title}
                                    onChange={(e) => handleChange(index, e)}
                                    fullWidth
                                />
                                <TextField
                                    label={`Icon ${index + 1}`}
                                    size="small"
                                    variant="outlined"
                                    name="icon"
                                    value={field.icon}
                                    onChange={(e) => handleChange(index, e)}
                                    fullWidth
                                />
                                <TextField
                                    label={`URL ${index + 1}`}
                                    size="small"
                                    variant="outlined"
                                    name="url"
                                    value={field.url}
                                    onChange={(e) => handleChange(index, e)}
                                    fullWidth
                                />
                                <Tooltip title="Delete">
                                    <IconButton
                                        onClick={() => removeField(index)}
                                        color="error"
                                        disabled={iconFields.length === 1}
                                    >
                                        <DeleteIcon />
                                    </IconButton >
                                </Tooltip>
                            </div>
                        </div>
                    ))}

                <div className='button-wrraper flex justify-end'>
                    <Button
                        onClick={addNewField}
                        variant="contained"
                        className="w-fit"
                    >
                        + Add More
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default HeaderTopBarCenterIcon;



