// react
import React, { Component } from 'react';

// third-libraries
import { Button, Icon, Fab } from 'native-base';

class FABSocial extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			active: true
		};
	}
	
	render() {
		return (
			
				<Fab
					active={this.state.active}
					direction="down"
					containerStyle={{ }}
					style={{ backgroundColor: '#ffc653' }}
					position="topRight"
					onPress={() => this.setState({ active: !this.state.active })}>
					<Icon name="more-horizontal" type="Feather" />
					<Button style={{ backgroundColor: '#3B5998' }}>
						<Icon name="logo-facebook" />
					</Button>
					<Button style={{ backgroundColor: '#DD5144' }}>
						<Icon name="google" type="FontAwesome" />
					</Button>
					<Button style={{ backgroundColor: '#1ea0f3' }}>
						<Icon name="twitter" type="FontAwesome" />
					</Button>
				</Fab>
		);
	}
}

export { FABSocial };
