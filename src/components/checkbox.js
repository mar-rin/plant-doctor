import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxLabels() {
    return (
        <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Monstera deliciosa" />
            <FormControlLabel control={<Checkbox />} label="Ficus elastica" />
            <FormControlLabel control={<Checkbox />} label="Epipremnum aureum" />
            <FormControlLabel control={<Checkbox />} label="Hoya carnosa" />
            <FormControlLabel control={<Checkbox />} label="Aloe vera" />
        </FormGroup>
    );
}