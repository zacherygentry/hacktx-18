import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class trendinghashtags extends Component {

  constructor(props) {
    super(props);
    
    this.state = { 
      hashTags: [{key: 1, value: "AustinPride"}, {key: 2, value: "Beyonce"}, {key: 3, value: "DogWalks"}],
    };
	}

	render() {
			
		const hashTags = this.state.hashTags;


		let hashTagsContent = hashTags && hashTags.map( (hashtag, key ) => {
			return (
				<Typography key={hashtag.key} color="textSecondary" gutterBottom>
					#{hashtag.value}
				</Typography>
				
			);
		});

		return (
			<Card>
      <CardContent>

        <Typography gutterBottom variant="h5" component="h2">
					Trending Hashtags For Austin
				</Typography>

				{hashTagsContent}

      </CardContent>
      
    </Card>
		);
	}
}

export default trendinghashtags;