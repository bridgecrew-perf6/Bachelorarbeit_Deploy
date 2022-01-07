import React, {Component} from 'react';
import {Button} from '@mui/material';
import {VisualizationSetting} from './VisualizationSetting';

interface VisualizationSettingsProps {
	// eslint-disable-next-line
	apiSchema: Record<string, any>,
	changeSetting: (attribute: string, value: string) => void,
	highlighted: {
		'xAxis': boolean,
		'yAxis': boolean,
		'aggregate': boolean,
	}
}

export class VisualizationSettings extends Component<VisualizationSettingsProps> {
	constructor(props) {
		super(props);
		this.changeSetting = this.changeSetting.bind(this);
	}

	render() {
		const schema = this.props.apiSchema;
		if (schema) {
			const xAxisSchema = schema.IndexRowName;
			const yAxisSchema = schema.ValuesRowName;
			const aggregateSchema = schema.Aggregate;
			return <div className='visualization-settings'>
				<h2>Visualization Settings</h2>
				<VisualizationSetting
					title='x-Axis'
					entries={xAxisSchema.enum}
					attributeName={xAxisSchema.title}
					onChange={this.changeSetting}
					highlighted={this.props.highlighted.xAxis}
				/>
				<VisualizationSetting
					title='y-Axis'
					entries={yAxisSchema.enum}
					attributeName={yAxisSchema.title}
					onChange={this.changeSetting}
					highlighted={this.props.highlighted.yAxis}
				/>
				<VisualizationSetting
					title='Aggregate'
					entries={aggregateSchema.enum}
					attributeName={aggregateSchema.title}
					onChange={this.changeSetting}
					highlighted={this.props.highlighted.aggregate}
				/>
				<div className='visualization-settings-actions'>
					<Button variant='contained'>Test</Button>
				</div>
			</div>;
		}
		return <div className='visualization-settings'>
			<h2>Loading ...</h2>
		</div>;
	}

	changeSetting(settingName: string, event: Event): void {
		this.props.changeSetting(settingName, event ? event['value'] : undefined);
	}
}
