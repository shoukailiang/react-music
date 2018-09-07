/**
 *  专辑类模型
 */
export class Album {
  id: any;
  mId: any;
  name: any;
  img: string;
  singer: any;
  publicTime: any;
	constructor(id: any, mId: any, name: any, img: string, singer: any, publicTime: any) {
		this.id = id;
		this.mId = mId;
		this.name = name;
		this.img = img;
		this.singer = singer;
		this.publicTime = publicTime;
	}
}

/**
*  通过专辑列表数据创建专辑对象函数
*/
export function createAlbumByList(data: any) {
	return new Album(
		data.album_id,
		data.album_mid,
		data.album_name,
		`http://y.gtimg.cn/music/photo_new/T002R300x300M000${data.album_mid}.jpg?max_age=2592000`,
		filterSinger(data.singers),
		data.public_time,
	);
}

/**
 *  通过专辑详情数据创建专辑对象函数
 */
export function createAlbumByDetail(data: any) {
	return new Album(
			data.id,
			data.mid,
			data.name,
			`http://y.gtimg.cn/music/photo_new/T002R300x300M000${data.mid}.jpg?max_age=2592000`,
			data.singername,
			data.aDate,
	);
}

function filterSinger(singers: any) {
	// tslint:disable-next-line:indent
	let singerArray = singers.map((singer: any) => {
		return singer.singer_name;
	});
	return singerArray.join('/');
}

export function createAlbumBySearch(data: any) {
	return new Album(
			data.albumid,
			data.albummid,
			data.albumname,
			`http://y.gtimg.cn/music/photo_new/T002R68x68M000${data.albummid}.jpg?max_age=2592000`,
			data.singername,
			'',
	);
}
