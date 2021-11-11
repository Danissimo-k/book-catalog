import React from 'react';
import BookGroup from "./BookGroup";
import {Stack} from "@mui/material";

const WorkSpace = (props) => (
    <Stack
        sx={{
            mt: 2
        }}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        position='static'
    >
        <BookGroup/>
    </Stack>
);

export default WorkSpace;