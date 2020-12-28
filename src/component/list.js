import React from 'react';
import axios from 'axios';
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
        axios.get('http://rap2api.taobao.org/app/mock/273293/allArticle').then((res) => {
            this.setState({
                article: res.data.article
            })
        })
    }

    render() {
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
                {list}
                <footer>
                    <Pagination
                        onChange={this.changePage}
                        pageSize={10}
                        pageSizeOptions={[10]}
                        total={this.state.article.length}
                        current={this.state.current}
                        showQuickJumper={true} />
                </footer>
            </div>

        )
    }

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
