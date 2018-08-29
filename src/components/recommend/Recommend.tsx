import * as React from 'react';
import Scroll from '../../common/scroll/Scroll';
import { getCarousel, getNewAlbum } from '../../api/recommend';
import * as AlbumModel from '../../model/album';
import { CODE_SUCCESS } from '../../api/config';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
import './recommend.less';

interface Props {}
interface State {
	sliderList: Array<any>;
	newAlbums: Array<any>;
	refreshScroll: boolean;
}

class Recommend extends React.Component<Props, State> {
	sliderSwiper: any;
	constructor(props: Props) {
		super(props);

		this.state = {
			sliderList: [],
			newAlbums: [],
			refreshScroll: false,
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
					this.setState({
						newAlbums: albumList,
					},            () => {
							//刷新scroll
							this.setState({refreshScroll: true});
					});
				}
			}
		});
	}
	toLink(linkUrl: any) {
		/*使用闭包把参数变为局部变量使用*/
		return () => {
			window.location.href = linkUrl;
		};
	}
	render() {
		let albums = this.state.newAlbums.map((item) => {
			//通过函数创建专辑对象
			let album = AlbumModel.createAlbumByList(item);
			return (
				<div className='album-wrapper' key={album.mId}>
					<div className='left'>
						<img src={album.img} width='100%' height='100%' alt={album.name} />
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
				<Scroll refresh={this.state.refreshScroll} onScroll={false} click={false}>
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
			</div>
		);
	}
}

export default Recommend;
