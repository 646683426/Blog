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

// 轮播图
class Banner extends React.Component {
    render() {
        let list = this.props.article.map((item, index) => {
            let detail = { pathname: '/detail', state: { title: item.title, img: item.img, content: item.content } }
            return (
                <ul key={index}>
                    <Link to={detail}>
                        <li className='list'>{item.title}</li>
                    </Link>
                </ul>
            )
        })

        let img = this.props.article.map((item, index) => {
            let detail = { pathname: '/detail', state: { title: item.title, img: item.img, content: item.content } }
            return (
                <Link to={detail}>
                    <img key={index} src={item.img} style={{ height: '100%', width: '100%' }} alt='666'></img>
                </Link>
            )
        })

        return (
            <div className='banner clearFix'>
                <div className='banner-left clearFix'>
                    {img && <Carousel autoplay>
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

// 右边的最新博客
class Blog extends React.Component {
    render() {
        const { cateArticle } = this.props
        const list = cateArticle.map((item, index) => {
            const detail = { pathname: '/detail', state: { title: item.title, img: item.img, content: item.content, categoryId: item.categoryId } }
            return (
                <div key={index} className='blog-detail'>
                    <Link to={detail}>
                        <img alt='6666' src={item.img}></img>
                        <p >{item.title}</p>
                    </Link>
                </div>

            )
        })
        return (
            <div className='item-blog'>{list}</div>
        )
    }
}

// 每个分类的展示
class Content extends React.Component {
    render() {
        const { category, cateArticle, onClick } = this.props
        return (
            <div className='content'>
                <div className='category'>
                    <h2>{category}</h2>
                </div>
                <div className='category-blog'>
                    <Blog cateArticle={cateArticle} />
                </div>
                <button onClick={onClick}>更多...</button>
            </div>
        )
    }
}

export default class App extends React.Component {

    state = {
        article: [],
        category: {},
    }

    componentDidMount() {
        // 获取所有文章
        axios.get('http://rap2api.taobao.org/app/mock/273293//allArticle').then((res => {
            this.setState({
                article: res.data.article
            })
        }))

        // 获取4个分类名
        axios.get('http://rap2api.taobao.org/app/mock/273293/category').then((res => {
            this.setState({
                category: res.data.category
            })
        }))
    }

    render() {
        // 取出分类中的前5个博客用于在首页进行展示
        const cateArticle = (id) => {
            return this.state.article.filter((item) => {
                return item.categoryId === id
            })
        }
        const sport = cateArticle(1)
        const life = cateArticle(2)
        const work = cateArticle(3)
        const movie = cateArticle(4)
        return (
            <div className='blog'>
                <Banner article={this.state.article.slice(0, 6)} />
                <Content
                    category={this.state.category.a}
                    cateArticle={sport.slice(0, 5)}
                    onClick={() => { this.more(sport,'体育') }} />
                <Content
                    category={this.state.category.b}
                    cateArticle={life.slice(0, 5)}
                    onClick={() => { this.more(life,'生活') }} />
                <Content
                    category={this.state.category.c}
                    cateArticle={work.slice(0, 5)}
                    onClick={() => { this.more(work,'工作') }} />
                <Content
                    category={this.state.category.d}
                    cateArticle={movie.slice(0, 5)}
                    onClick={() => { this.more(movie,'电影') }} />
            </div>
        )
    }

    // 点击更多后显示当前分类中的博客
    more = (blog,name) => {
        this.props.history.push('/list/'+name,{article:blog,name:name});
    }
}