import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import React from "react";

const FormInput = ({
    label,
    key,
    onChange,
    options = [],
    value,
    isAutoComplete,
}) => {
    return (
        <Box className="!flex !flex-col !gap-2 !p-5">
            <Typography variant="subtitle1">{label} *</Typography>
            {console.log(label, 2101019)}
            {isAutoComplete ? (
                <Autocomplete
                    options={options}
                    getOptionLabel={(option) => `${option}`}
                    value={value || null}
                    isOptionEqualToValue={(option, val) => option === val}
                    onChange={(event, newValue) => {
                        onChange(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} required variant="outlined" />
                    )}
                />
            ) : (
                <TextField
                    value={value}
                    fullWidth
                    onChange={(e) => onChange(e.target.value)}
                    required
                    variant="outlined"
                />
            )}
        </Box>
    );
};

export default FormInput;
