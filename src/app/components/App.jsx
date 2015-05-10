const React = require('react');
const SpotActions = require('../actions/SpotActions');
const SpotStore = require('../stores/SpotStore');
const TripStore = require('../stores/TripStore');

const {
	Button,
	Grid,
	Row,
	Col,
	Table,
	Glyphicon
} = require('react-bootstrap');

let styles = {
	td: {
		width: 20
	}
};

let App = React.createClass({

	getLatestData() {
		return {
			spots: SpotStore.getAll(),
			trip: TripStore.getCurrentTrip()
		};
	},

	_onChange() {
		this.setState(this.getLatestData());
	},

	getInitialState() {
    return this.getLatestData();
	},

	componentWillMount() {
		TripStore.addChangeListener(this._onChange);
		SpotStore.addChangeListener(this._onChange);
	},

	componentWillUnmount() {
		TripStore.removeChangeListener(this._onChange);
	  SpotStore.removeChangeListener(this._onChange);    
	},

	addSpotToTrip(spot) {
		SpotActions.addSpot(spot);
	},

	removeSpotFromTrip(id) {
		SpotActions.removeSpot(id);
	},

	renderSpots() {
		let that = this;
		let spotElements = [];
		_.each(this.state.spots, function(spot, index) {
			spotElements.push(
				<tr key={index}>
		  		<td><b>{spot.name}</b></td>
		  		<td style={styles.td}>
		  			<Button onClick={that.addSpotToTrip.bind(that, spot)} className='right-aligned'>add</Button>
		  		</td>
		  	</tr>
			);
		});

		return spotElements;
	},

	renderTripSpots() {
		let that = this;
		let tripSpotElements = [];
		_.each(this.state.trip.spots, function(spot, index) {
			tripSpotElements.push(
				<tr key={index}>
		  		<td><b>{spot.name}</b></td>
		  		<td style={styles.td}>
		  			<Button onClick={that.removeSpotFromTrip.bind(that, spot.id)} className='right-aligned'>remove</Button>
		  		</td>
		  	</tr>
			);
		});

		return tripSpotElements;
	},

	render() {
		return (
			<Grid>
				<Row>

				  <Col lg={6}>
					  <Table striped bordered>
					  	<tbody>
						  	{this.renderSpots()}
					  	</tbody>
					  </Table>
				  </Col>

				  <Col lg={6}>
				  	<Table striped bordered>
					  	<tbody>
						  	{this.renderTripSpots()}
					  	</tbody>
					  </Table>
				  </Col>

				</Row>
			</Grid>
		)
	}
});

module.exports = App;
