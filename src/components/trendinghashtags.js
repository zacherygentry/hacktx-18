import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class trendinghashtags extends Component {
	render() {
		return (
			<Card>
      <CardContent>

        <Typography gutterBottom variant="h5" component="h2">
					Trending Hashtags
				</Typography>

				<Typography color="textSecondary" gutterBottom>
          #BeyonceConcert
        </Typography>

				<Typography color="textSecondary" gutterBottom>
          #PrideParade2018
        </Typography>

				<Typography color="textSecondary" gutterBottom>
          #HackTX
        </Typography>

      </CardContent>
      
    </Card>
		);
	}
}

export default trendinghashtags;