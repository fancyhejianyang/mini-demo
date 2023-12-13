import { Component, PropsWithChildren } from "react";
import { View, Swiper, SwiperItem, Image } from "@tarojs/components";
import { AtSearchBar, AtTabs, AtTabsPane } from "taro-ui";

import "./index.scss";
import bg from "../../assets/girl.png";
import spider from "../../assets/spider.png";
import goddess from "../../assets/goddess.png";
import moonlight from "../../assets/moonlight.png";
import hunter from "../../assets/hunter.png";
import userPic from "../../assets/user-pic.png";
import viewIcon from '../../assets/eye.png'
import frameIcon from '../../assets/frame.png'
import Taro from "@tarojs/taro";
export default class Index extends Component<PropsWithChildren> {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      sps: [],
      categories: [],
      tabs: [],
      activedCate: {},
      current: 0,
      cards: [],
    };
  }
  state: {
    searchValue: "";
    sps: [];
    categories: [];
    tabs: [];
    activedCate: { name?: string; id?: number; active?: boolean };
    current: number;
    cards: [];
  };
  componentDidMount() {
    this.setState({
      sps: [
        {
          bg: bg,
          img: require("../../assets/words.png"),
          isTop: true,
          des: "TOP1",
        },
        {
          bg: bg,
          img: require("../../assets/words.png"),
          isTop: true,
          des: "TOP2",
        },
        {
          bg: bg,
          img: require("../../assets/words.png"),
          isTop: false,
          des: "",
        },
        {
          bg: bg,
          img: require("../../assets/words.png"),
          isTop: false,
          des: "",
        },
        {
          bg: bg,
          img: require("../../assets/words.png"),
          isTop: false,
          des: "",
        },
        {
          bg: bg,
          img: require("../../assets/words.png"),
          isTop: false,
          des: "",
        },
        {
          bg: bg,
          img: require("../../assets/words.png"),
          isTop: false,
          des: "",
        },
      ],
      categories: [
        {
          name: "Recommended",
          id: 1,
          active: true,
        },
        {
          name: "Fan Fiction",
          id: 2,
        },
        {
          name: "Sci-fi",
          id: 3,
        },
        {
          name: "RPG",
          id: 4,
        },
      ],
      activedCate: {
        id: 1,
      },
      tabs: [
        {
          title: "Default",
          id: 5,
        },
        {
          title: "Recent",
          id: 6,
        },
        {
          title: "Hot",
          id: 7,
        },
        {
          title: "Nodes",
          id: 8,
        },
      ],
      current: 0,
      cards: this.getCardsList(),
    });
  }

  componentWillUnmount() {}
  componentDidHide() {}

  onSearch(val) {
    console.log(val);
  }
  handleSwiper(item) {
    console.log(item);
  }
  getCardsList() {
    const data = [
      {
        bg: spider,
        views: 330.5,
        counts: 1280,
        isNew: true,
        title: "Spider Potter",
        simpleDes: "Love, celebration, and a promise of forever",
        userPic: userPic,
      },
      {
        bg: goddess,
        views: 330.5,
        counts: 1280,
        isNew: true,
        title: "Goddess Maria",
        simpleDes: "The rise and fall of an ancient empire.",
        userPic: userPic,
      },
      {
        bg: moonlight,
        views: 330.5,
        counts: 1280,
        isNew: true,
        title: "MoonLight",
        simpleDes: "Love, celebration, and a promise of forever",
        userPic: userPic,
      },
      {
        bg: hunter,
        views: 330.5,
        counts: 1280,
        isNew: true,
        title: "Hunter",
        simpleDes: "Love, celebration, and a promise of forever",
        userPic: userPic,
      },
    ];
    return data;
  }
  switchCategory(item) {
    const { categories, activedCate } = this.state;
    if (item.id === activedCate.id) {
      return;
    }
    categories.forEach((m: { name: string; id: number; active: boolean }) => {
      // if (m.id === activedCate.id) {
      //   m.actived = false;
      // }
      m.active = false;
      if (m.id === item.id) {
        m.active = true;
      }
    });
    this.setState({
      categories: [...categories],
      activedCate: item,
      current: 0,
    });
  }

  handleTab(e) {
    this.setState({
      current: e,
    });
  }
  togglePage (item) {
    Taro.navigateTo({
      url: `/pages/detail/index?url=${item.bg}&pic=${item.userPic}&name=${item.title}`,
    })
  }

  render() {
    const { sps, categories, tabs, current, cards } = this.state;
    const listItem = sps.map((item: BannerItem) => {
      const style: React.CSSProperties = {
        backgroundImage: `url(${item["bg"]})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      };
      let des;
      if (item.isTop) {
        des = <View className="des">{item.des}</View>;
      }
      return (
        <SwiperItem className="sps-item">
          <View className="sps-item-box" style={style}>
            {des}
            <Image
              mode="scaleToFill"
              src={item.img}
              onClick={this.handleSwiper.bind(this, item)}
            ></Image>
          </View>
        </SwiperItem>
      );
    });
    return (
      <View className="index">
        <AtSearchBar
          className="search-bar"
          showActionButton={false}
          placeholder="Search for derams"
          value={this.state.searchValue}
          onChange={this.onSearch.bind(this)}
        ></AtSearchBar>
        <Swiper
          className="sps-container"
          indicatorDots
          indicatorColor="#999"
          indicatorActiveColor="#C84B6A"
          circular
          autoplay={true}
        >
          {listItem}
        </Swiper>
        <View className="cus-tabs">
          {categories.map(
            (item: { name: string; id: number; active: boolean }) => {
              return (
                <View
                  onClick={this.switchCategory.bind(this, item)}
                  className={`cus-tab ${item.active ? "active" : ""}`}
                >
                  {item.name}
                </View>
              );
            }
          )}
          <View className="at-icon at-icon-chevron-right"></View>
        </View>
        {/* Tabs */}
        <View className="tabs">
          <AtTabs
            current={current}
            tabList={tabs}
            onClick={this.handleTab.bind(this)}
          >
            {tabs.map((item, index) => {
              return <AtTabsPane current={current} index={index}></AtTabsPane>;
            })}
          </AtTabs>
          <View className="filter">Filter</View>
        </View>
        {/* 图片列表 */}
        <View className="my-row">
          {cards.map((item: { isNew: boolean;views: number;counts:number;title: string;simpleDes: string;}) => {
            const style: React.CSSProperties = {
              backgroundImage: `url(${item["bg"]})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            };
            const des = item.isNew ? <View className="des">New</View> : null;
            return (
              <View className="card-item" onClick={this.togglePage.bind(this, item)}>
                <View className="img" style={style}>
                  {des}
                  <View className="bottom-row">
                    <Image mode="scaleToFill" src={viewIcon}></Image>
                    <View>{item.views}k</View>
                    <Image mode="scaleToFill" src={frameIcon}></Image>
                    <View>{item.counts}</View>
                  </View>
                </View>
                <View className="title">{item.title}</View>
                <View className="simple-des">{item.simpleDes}</View>
                <Image src={userPic} mode="scaleToFill" className="user-pic"></Image>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
