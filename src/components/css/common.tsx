import {  createStyles } from '@material-ui/core/styles';
export const DARK_PRIMARY_COLOR = '#0097A7'
export const DEFAULT_PRIMARY_COLOR = '#00BCD4'
export const LIGHT_PRIMARY_COLOR = '#B2EBF2'
export const TEXT_PRIMARY_COLOR = '#FFFFFF'
export const ACCENT_COLOR = '#CDDC39'
export const PRIMARY_TEXT_COLOR = '#212121'
export const SECONDARY_TEXT_COLOR = '#757575'
export const DIVIDER_COLOR = '#BDBDBD'
export const DRAWER_WIDTH = 320
export const HEADER_HEIGHT = 64
export const ERROR_COLOR = '#ff1744'
export const MAX_WIDTH = 900


export const styles = (theme: any) => createStyles({
    wrap: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    item: {
        flexBasis: '46%',
        height: 120,
        margin: 2,
        padding: 4,
    },
    img: {
        width: '100%',
        height: 100,
    },
    icon: {
        width: 16,
        height: 16,
    },
    iconWrap: {
        marginTop: -30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    hits: {
        color: '#fff',
        fontSize: '1rem',
        margin: '0 0 0 4px',
    },
    title: {
        color: 'black',
        fontSize: '0.5rem',
        fontWeight: 700,
        margin: '4px 0 0 0',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: 100,
    }
})