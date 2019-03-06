import React from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { withStyles, createStyles } from '@material-ui/core/styles';
import NewPage from './New';
import Recreation from '../containers/Recreation';
import Popular from '../containers/Popular';

const styles = (theme:any) => createStyles({
    
    cardHeader: {
      backgroundColor: theme.palette.grey[200],
    },
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing.unit * 2,
    },
    cardActions: {
      [theme.breakpoints.up('sm')]: {
        paddingBottom: theme.spacing.unit * 2,
      },
    },
    footer: {
      marginTop: theme.spacing.unit * 8,
      borderTop: `1px solid ${theme.palette.divider}`,
      padding: `${theme.spacing.unit * 6}px 0`,
    },
    container: {
      width: '96%',
      margin: '0 auto',
    }
  });
  
  const tiers = [
    {
      title: 'Free',
      price: '0',
      description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
      buttonText: 'Sign up for free',
      buttonVariant: 'outlined',
    },
    {
      title: 'Pro',
      subheader: 'Most popular',
      price: '15',
      description: [
        '20 users included',
        '10 GB of storage',
        'Help center access',
        'Priority email support',
      ],
      buttonText: 'Get started',
      buttonVariant: 'contained',
    },
    {
      title: 'Enterprise',
      price: '30',
      description: [
        '50 users included',
        '30 GB of storage',
        'Help center access',
        'Phone & email support',
      ],
      buttonText: 'Contact us',
      buttonVariant: 'outlined',
    },
  ];
  const footers = [
    {
      title: 'Company',
      description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
      title: 'Features',
      description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
    },
    {
      title: 'Resources',
      description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    },
    {
      title: 'Legal',
      description: ['Privacy policy', 'Terms of use'],
    },
  ];


  

interface IHomePageProps {
      classes: any
}

class HomePage extends React.Component<IHomePageProps> {
    
    render(){
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
               
                <main className={classes.container}>
                    <div>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Pricing
                    </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" component="p">
                        Quickly build an effective pricing table for your potential customers with this layout.
                        It&apos;s built with default Material-UI components with little customization.
                    </Typography>
                    </div>
                    {/* End hero unit */}
                    <Grid container spacing={40} alignItems="flex-end">
                    {tiers.map((tier:any) => (
                        <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                        <Card>
                            <CardHeader
                            title={tier.title}
                            subheader={tier.subheader}
                            titleTypographyProps={{ align: 'center' }}
                            subheaderTypographyProps={{ align: 'center' }}
                            action={tier.title === 'Pro' ? <StarIcon /> : null}
                            className={classes.cardHeader}
                            />
                            <CardContent>
                            <div className={classes.cardPricing}>
                                <Typography component="h2" variant="h3" color="textPrimary">
                                ${tier.price}
                                </Typography>
                                <Typography variant="h6" color="textSecondary">
                                /mo
                                </Typography>
                            </div>
                            {tier.description.map((line:any) => (
                                <Typography variant="subtitle1" align="center" key={line}>
                                {line}
                                </Typography>
                            ))}
                            </CardContent>
                            <CardActions className={classes.cardActions}>
                            <Button fullWidth variant={tier.buttonVariant} color="primary">
                                {tier.buttonText}
                            </Button>
                            </CardActions>
                        </Card>
                        </Grid>
                    ))}
                    </Grid>
                    <NewPage />
                    <Recreation />
                    <Popular />
                </main>
                {/* Footer */}
                <footer className={classNames(classes.footer, classes.layout)}>
                    <Grid container spacing={32} justify="space-evenly">
                    {footers.map(footer => (
                        <Grid item xs key={footer.title}>
                        <Typography variant="h6" color="textPrimary" gutterBottom>
                            {footer.title}
                        </Typography>
                        {footer.description.map(item => (
                            <Typography key={item} variant="subtitle1" color="textSecondary">
                            {item}
                            </Typography>
                        ))}
                        </Grid>
                    ))}
                    </Grid>
                </footer>
                {/* End footer */}
            </React.Fragment>
        )
    }

}

export default withStyles(styles)(HomePage);