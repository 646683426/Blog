import '../style/App.css';
import React from 'react';
import axios from 'axios'
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'

const contentStyle = {
  height: '30vh',
  color: '#fff',
  width: '50vw',
  lineHeight: '30vh',
  textAlign: 'center',
  background: '#364d79',
};


class Banner extends React.Component {
  render() {
    let list = this.props.article.map((item, index) => {
      let detail = { pathname: '/detail', state: { title: item.detail.title, img: item.detail.img,content:item.detail.content } }
      return (
        <ul key={index}>
          <Link to={detail}>
            <li className='list'>{item.detail.title}</li>
          </Link>
        </ul>
      )
    })

    let img = this.props.article.map((item, index) => {
      let detail = { pathname: '/detail', state: { title: item.detail.title, img: item.detail.img,content:item.detail.content } }
      return (
        <Link to={detail}>
          <img key={index} src={item.detail.img} style={{ height: '100%', width: '100%' }} alt='666'></img>
        </Link>
      )
    })

    return (
      <div className='banner clearFix'>
        <div className='banner-left clearFix'>
          {img&&<Carousel autoplay>
            <div>
              <h3 style={contentStyle}>{img[0]}</h3>
            </div>
            <div >
              <h3 style={contentStyle}>{img[1]}</h3>
            </div>
            <div>
              <h3 style={contentStyle}>{img[2]}</h3>
            </div>
            <div>
              <h3 style={contentStyle}>{img[3]}</h3>
            </div>
          </Carousel>}
        </div>
        <div className='right-box'>
          <span>最新博客</span>
          {list}
        </div>
      </div>
    )
  }
}



class Blog extends React.Component {
  render() {
    let cateArticle;
    if (this.props.cateArticle) {
      cateArticle = this.props.cateArticle.map((item, index) => {
        let detail = { pathname: '/detail', state: { title: item.title, img: item.img,content:item.content } }
        return (
          <div key={index} className='blog-detail'>
            <Link to={detail}>
              <img alt='6666' src={item.img}></img>
              <p >{item.title}</p>
            </Link>
          </div>

        )
      })
    }
    return (
      <div className='item-blog'>{cateArticle}</div>
    )
  }
}



class Content extends React.Component {
  render() {
    return (
      <div className='content'>
        <div className='category'>
          <h2>{this.props.category}</h2>
        </div>
        <div className='category-blog'>
          <Blog cateArticle={this.props.cateArticle} />
        </div>
        <button onClick={this.props.onClick}>更多...</button>
      </div>
    )
  }
}



export default class App extends React.Component {

  state = {
    article: [],
    category: {},
    cateArticle: [],
  }

  componentDidMount() {
    axios.get('http://rap2api.taobao.org/app/mock/273293/name').then((res => {
      this.setState({
        article: res.data.article
      })
    }))

    axios.get('http://rap2api.taobao.org/app/mock/273293/category').then((res => {
      this.setState({
        category: res.data.category
      })
    }))

    axios.get('http://rap2api.taobao.org/app/mock/273293/cateArticle').then((res => {
      this.setState({
        cateArticle: res.data.cateArticle
      })
    }))
  }

  render() {
    return (
      <div className='blog'>
        <Banner article={this.state.article.slice(0,6)} />
        <Content
          category={this.state.category.a}
          cateArticle={this.state.cateArticle.a}
          onClick={() => { this.more('a') }} />
        <Content
          category={this.state.category.b}
          cateArticle={this.state.cateArticle.b}
          onClick={() => { this.more('b') }} />
        <Content
          category={this.state.category.c}
          cateArticle={this.state.cateArticle.c}
          onClick={() => { this.more('c') }} />
        <Content
          category={this.state.category.d}
          cateArticle={this.state.cateArticle.d}
          onClick={() => { this.more('d') }} />
      </div>
    )
  }

  more = (id) => {
    this.props.history.push('/list' + id);
  }
}