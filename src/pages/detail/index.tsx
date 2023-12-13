import { View, Swiper, SwiperItem, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { Component, PropsWithChildren } from "react";
import './index.scss'

export default class Detail extends Component<PropsWithChildren> {

  constructor (props) {
    super(props)
    this.state = {
      urls: [],
      pic: '',
      name: ''
    }
  }
  state: {
    urls: [];
    pic: string;
    name: string;
  }
  componentDidMount(): void {
    const $instance = Taro.getCurrentInstance();
    const router = $instance.router;
    console.log(router?.params)
    function getImgs(url, len = 7) {
      const arr: Array<string> = [];
      for (let i = 0; i< len; i++) {
        arr.push(url)
      }
      return arr;
    }
    this.setState({
      urls: getImgs(router?.params.url, 7),
      pic: router?.params.pic,
      name: router?.params.name
    })
  }

  render () {
    const { urls, pic, name } = this.state;
    const swiperItems = urls.map((url: string) => {
      const style:React.CSSProperties = {
        backgroundImage: `url(${url})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      };
      return <SwiperItem className="swiper-item">
        {/* 332 height */}
        <View style={style}></View>
      </SwiperItem>
    })
    return <View className="detail-page">
      <Swiper>
        {swiperItems}
      </Swiper>
      <View className="title">{name}</View>
      <View style="text-align: right;padding-right: 15px;">
        <Image src={pic} mode="scaleToFill" className="user-pic"></Image>
        <View className="u-name">Fannings</View>
      </View>
      <View className="content">
        You find yourself in a vast celestial landscape,with the radiant figure of Goddess Maria shining brightly beyond the sun. Her golden aura illuminates the surroundings casting a warm light on the ethereal clouds that float in the sky.
      </View>
      <View></View>
    </View>
  }
}