import * as React from 'react';

import './header.less';

interface Props {
	title: string;
}
class MusicHeader extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
		this.state = {};
	}
	handleClick() {
		window.history.back();
	}

	render() {
		return (
			<div className='music-header'>
				<span className='header-back' onClick={this.handleClick}>
					<i className='icon-back' />
				</span>
				<div className='header-title'>{this.props.title}</div>
			</div>
		);
	}
}

export default MusicHeader;
