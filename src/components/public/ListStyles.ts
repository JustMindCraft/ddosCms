import { createStyles } from "@material-ui/core";

const ListStyles = (theme:any) => createStyles({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        minHeight: 500,
    
      },
      fab: {
        margin: theme.spacing.unit,
        right: 5,
        top: 230,
        zIndex: 999,
        position: 'fixed'
      },
      adminFab: {
        margin: theme.spacing.unit,
        left: 5,
        top: 230,
        zIndex: 999,
        position: 'fixed'
      },
      paper: {
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 100,
        display: 'flex',
        height: 'inherit',
        flexDirection: 'column',
        minHeight: 800,
        alignItems: 'center',
        alignCentent: 'center',
        justifyContent: 'space-around',
      },
      
      toolBar: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyItems: 'center',
            justifyContent: 'space-between',
            fontSize: "1.2rem",
        },
        toolBarButton: {
            fontSize: "1.2rem",
        },
        loading: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            minHeight: 500,
        },
        
        loadingText: {
            textAlign: 'center'
        },
        itemTextSecondary:{
            display: 'flex',
            flexDirection: "row",
            justifyContent: "space-between",
            width: '100%',
            flexWrap: 'wrap'
        },
       
});

export default ListStyles;