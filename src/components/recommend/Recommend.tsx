import * as React from 'react';
import Scroll from '../../common/scroll/Scroll';
import { getCarousel, getNewAlbum } from '../../api/recommend';
import * as AlbumModel from '../../model/album';
import { CODE_SUCCESS } from '../../api/config';
import Loading from '../../common/loading/Loading';
import LazyLoad, { forceCheck } from 'react-lazyload';
import Swiper from 'swiper';
import { Route } from 'react-router-dom';
import Album from '../album/Album';
import 'swiper/dist/css/swiper.css';
import './recommend.less';

interface Props {
	match: any;
	history: any;
}
interface State {
	sliderList: Array<any>;
	newAlbums: Array<any>;
	refreshScroll: boolean;
	loading: boolean;
}

class Recommend extends React.Component<Props, State> {
	sliderSwiper: any;
	constructor(props: Props) {
		super(props);

		this.state = {
			sliderList: [],
			newAlbums: [],
			refreshScroll: false,
			loading: true,
		};
	}
	componentDidMount() {
		getCarousel().then((res: any) => {
			console.log('获取轮播：');
			if (res) {
				console.log(res);
				if (res.code === CODE_SUCCESS) {
					this.setState(
						{
							sliderList: res.data.slider,
						},
						() => {
							if (!this.sliderSwiper) {
								//初始化轮播图
								this.sliderSwiper = new Swiper('.slider-container', {
									loop: true,
									autoplay: 3000,
									autoplayDisableOnInteraction: false,
									pagination: '.swiper-pagination',
								});
							}
						},
					);
				}
			}
		});

		getNewAlbum().then((res: any) => {
			console.log('获取最新专辑：');
			if (res) {
				if (res.code === CODE_SUCCESS) {
					// 根据发布时间降序排列
					let albumList = res.albumlib.data.list;
					albumList.sort((a: any, b: any) => {
						return new Date(b.public_time).getTime() - new Date(a.public_time).getTime();
					});
					//当专辑列表加载完成后隐藏Loading组件，只需要将loading状态值修改为false
					this.setState({
						loading: false,
						newAlbums: albumList,
					},            () => {
							//刷新scroll
							this.setState({refreshScroll: true});
					});
				}
			}
		});
	}
	toLink(linkUrl: string) {
		/*使用闭包把参数变为局部变量使用*/
		return () => {
			window.location.href = linkUrl;
		};
	}
	toAlbumDetail(url: any) {
		/*scroll组件会派发一个点击事件，不能使用链接跳转*/
		return () => {
			console.log(url);
				this.props.history.push({
						pathname: url,
				});
		};
}
	render() {
		let {match} = this.props;
		let albums = this.state.newAlbums.map((item) => {
			//通过函数创建专辑对象
			let album = AlbumModel.createAlbumByList(item);
			return (
				<div className='album-wrapper' key={album.mId}
					onClick={this.toAlbumDetail(`${match.url + '/' + album.mId}`)}>
					<div className='left'>
					<LazyLoad height={60}>
							<img src={album.img} width='100%' height='100%' alt={album.name}/>
					</LazyLoad>
					</div>
					<div className='right'>
						<div className='album-name'>{album.name}</div>
						<div className='singer-name'>{album.singer}</div>
						<div className='public—time'>{album.publicTime}</div>
					</div>
				</div>
			);
		});

		return (
			<div className='music-recommend'>
				{/* 	通过查阅react-lazyload的github的使用说明，
				发现提供了一个forceCheck函数，当元素没有通过scroll（better-scroll是基于css3的transform实现的）或者resize
				事件加载时强制检查元素位置，这个时候如果出现在屏幕内就会被立即加载。
				借助Scroll组件暴露的onScroll属性就可以监听到Scroll组件的滚动
			*/}
				<Scroll refresh={this.state.refreshScroll} onScroll={(e: any) => {
					/*检查懒加载组件是否出现在视图中，如果出现就加载组件*/
					/* 不加 forceCheck 就会出现 当滚动专辑列表的时候，从屏幕外进入屏幕内的图没有了 */
					forceCheck();
				}} click={false}>
					<div>
						<div className='slider-container'>
							<div className='swiper-wrapper'>
								{this.state.sliderList.map((slider) => {
									return (
										<div className='swiper-slide' key={slider.id}>
											<a className='slider-nav' onClick={this.toLink(slider.linkUrl)}>
												<img src={slider.picUrl} width='100%' height='100%' alt='推荐' />
											</a>
										</div>
									);
								})}
							</div>
							<div className='swiper-pagination' />
						</div>
						<div className='album-container'>
							<h1 className='title'>最新专辑</h1>
							<div className='album-list'>{albums}</div>
						</div>
					</div>
				</Scroll>
				<Loading title='正在加载...' show={this.state.loading}/>
				<Route path={`${match.url + '/:id'}`} component={Album} />
			</div>
		);
	}
}

export default Recommend;
