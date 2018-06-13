// react libraries
import React, { Component } from 'react';

// react-native libraries
import {Dimensions, View, Platform } from "react-native";

// third-libraries
import { Content, ListItem, List, Left, Body, Text, Icon, Right } from 'native-base';

class DropDown extends Component {
	
	render() {
		let { height, width } = Dimensions.get('window');
		const { schools, selectedSchool, onPress, toTitleCase } = this.props;
		
		return (
				<View
					style={{
						width: width / 1.25,
						height: height / 3.5,
						backgroundColor: '#fff',
						opacity: 0.9,
						borderColor: '#ededed',
						borderWidth: 1,
						borderBottomEndRadius: 8,
						borderBottomStartRadius: 8,
					}}>
					<List
						dataArray={schools}
						renderRow={(item) =>(
							<Content >
								
								<ListItem onPress={() => onPress(item)} button avatar>
									
									<Left
										style={{
											marginTop: 15,
										}}
									>
										<Text style={{ color: selectedSchool === item.name ? '#333' : '#c1c1c1' }}>
											{ toTitleCase(item.name) }
										</Text>
									</Left>
									
									<Body
										style={{
											borderColor: 'white',
											borderWidth: 0,
										}}
									>
									</Body>
									
									<Right style={{
										borderColor: 'white',
										borderWidth: 0,
									}}>
										<Icon
											style={{
												color: selectedSchool === item.name ? '#fe3d68' : '#fff',
												paddingTop: Platform.OS === 'ios' ? 15 : 10,
											}}
											color={'b3b4b4'}
											active
											name='dot-single'
											type='Entypo'
										/>
									</Right>
									
								</ListItem>
							</Content>
						)}
					/>
				</View>
		);
	}
}

export { DropDown };
