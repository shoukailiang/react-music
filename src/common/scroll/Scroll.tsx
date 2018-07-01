import * as React from 'react';
import * as ReactDOM from 'react-dom';
import  BScroll from 'better-scroll';
import './scroll.less';
interface Props {
	refresh: any;
	onScroll: any;
	click: any;
}
class Scroll extends React.Component<Props> {
	static defaultProps: { click: boolean; refresh: boolean; onScroll: null; };
	bScroll: any;
	scrollView: any;
	componentDidUpdate() {
		//组件更新后，如果实例化了better-scroll并且需要刷新就调用refresh()函数
		if (this.bScroll && this.props.refresh === true) {
			const bScroll: any = this.bScroll;
			bScroll.refresh();
		}
	}
	componentDidMount() {
		this.scrollView = ReactDOM.findDOMNode(this.refs.scrollView);
		if (!this.bScroll) {
			this.bScroll = new BScroll(this.scrollView, {
				//实时派发scroll事件
				probeType: 3,
				click: this.props.click,
			});

			if (this.props.onScroll) {
				this.bScroll.on('scroll', (scroll: any) => {
					this.props.onScroll(scroll);
				});
			}
		}
	}
	componentWillUnmount() {
		this.bScroll.off('scroll');
		this.bScroll = null;
	}
	refresh() {
		if (this.bScroll) {
			this.bScroll.refresh();
		}
	}
	render() {
		return (
			<div className='scroll-view' ref='scrollView'>
				{/*获取子组件*/}
				{this.props.children}
			</div>
		);
	}
}

Scroll.defaultProps = {
	click: true,
	refresh: false,
	onScroll: null,
};

export default Scroll;
