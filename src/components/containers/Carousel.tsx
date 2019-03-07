import React from 'react';
import { Slider } from "react-simple-image-carousel"
import Grid from '@material-ui/core/Grid';

class Carousel extends React.Component {
  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={8} >
          <Slider
            width={400}
            height={250}
            maxSwipeThreshold={250 * 0.15}
            minSwipeThreshold={40}
            swipeTimeThreshold={200}
            images={[
              'https://www.chewy.com/petcentral/wp-content/uploads/2018/05/lucky-corgi-butts-x-596-444x.jpg',
              'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12225919/Pembroke-Welsh-Corgi-On-White-01.jpg',
              'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Welchcorgipembroke.JPG/1200px-Welchcorgipembroke.JPG',
            ]}
            />
        </Grid>
      </Grid>
      
        )
      }
    }
    
export default Carousel;