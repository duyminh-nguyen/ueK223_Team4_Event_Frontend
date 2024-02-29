import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() =>
    createStyles({
        contentBox: {
            height: '90vh', textAlign: 'center',  overflow: 'auto', marginBottom: "20%"
        }
    })
);