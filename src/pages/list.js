import React from 'react';
import '../style/list.css';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'

export default class List extends React.Component {

    state = {
        article: [],
        current: 1,
        minValue: 0,
        maxValue: 10
    }

    componentDidMount() {
        // 获取更多按钮传过来的值
        this.setState({
            article: this.props.location.state.article
        })
    }

    render() {
        // 分页的列表循环
        let list = this.state.article.slice(this.state.minValue, this.state.maxValue).map((item, index) => {
            let detail = { pathname: '/detail', state: { title: item.title, img: item.img, content: item.content } }
            return (
                <div key={index} className='list-blog'>
                    <Link to={detail}>
                        <img alt='666' src={item.img}></img>
                    </Link>
                    <Link to={detail} className='list-text'>
                        <p className='list-title'>
                            {item.title}
                        </p>
                        <p className='list-content'>
                            {item.content}
                        </p>
                    </Link>
                </div>
            )
        })
        return (
            <div className='wrapper'>
                <h3 className='list-cate'>
                    当前分类：<span>{this.props.location.state.name}</span>
                    <button
                        onClick={()=>{this.props.history.push('/')}}
                        className='list-back'>
                        返回首页
                    </button>
                </h3>
                {list}
                <footer>
                    <Pagination
                        onChange={this.changePage}
                        pageSize={10}
                        pageSizeOptions={[10]}
                        total={this.state.article.length}
                        current={this.state.current} />
                </footer>
            </div>

        )
    }

    // 点击分页的页数
    changePage = (page) => {
        if (page <= 1) {
            this.setState({
                minValue: 0,
                maxValue: 10,
                current: page
            });
        } else {
            this.setState({
                minValue: (page - 1) * 10,
                maxValue: (page - 1) * 10 + 10,
                current: page
            });
        }
    }
}
