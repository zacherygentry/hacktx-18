import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { CardContent, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// CSS
import '../App.css';


const styles = {
	header: {
		display: 'flex',
		flexDirection: 'row',
	},
	headerTitle: {
		marginLeft: '2%'
	},
	body: {
		marginTop: '4%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	list: {
		marginLeft: '3%',
		marginTop: '1%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start'

	}

};

class trendinghashtags extends Component {

	constructor(props) {
		super(props);

		this.state = {
			hashTags: [{ key: 1, value: "AustinPride", link: 'https://twitter.com/search?q=%23austinpride&src=typd' }, 
			{ key: 2, value: "Beyonce", link: 'https://twitter.com/search?q=%23beyonce&src=typd' }, 
			{ key: 3, value: "DogParade", link: 'https://twitter.com/search?q=%23dogparade&src=typd'}],
		};
	}


	render() {

		const hashTags = this.state.hashTags;


		let hashTagsContent = hashTags && hashTags.map((hashtag, key) => {

			return (
				<a href={hashtag.link} target='_blank'>
					<Button key={hashtag.key} size="small" color="primary">
						#{hashtag.value}
					</Button>
				</a>
			);
		});

		return (
			<Card className='Card'>
				<CardContent>
					<Typography variant="h6" component="h5">
						Trending Hashtags For Austin
				</Typography>
					<div style={styles.list}>
						{hashTagsContent}
					</div>

				</CardContent>

			</Card>
		);
	}
}
export default withStyles(styles)(trendinghashtags);

