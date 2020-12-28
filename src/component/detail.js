import React from 'react';
import { Calendar } from 'antd';
import { Card, Avatar } from 'antd';
import 'antd/dist/antd.css';
import '../style/detail.css';

const { Meta } = Card;
const time = new Date();

export default class Detail extends React.Component {
    render() {
        return (
            <main>
                <div className='left-box'>
                    <h3
                        onClick={() => { this.props.history.push('/') }}
                        className='detail-back'>
                        返回首页
                    </h3>
                    <Card
                        style={{ width: 300 }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                    >
                        <Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title="作者"
                            description="略略略"
                        />
                    </Card>
                </div>
                <div className='detail-wrapper'>
                    <h2>
                        {this.props.location.state.title}
                    </h2>
                    <img alt='666' src={this.props.location.state.img} />
                    <p className='detail-content'>
                        {this.props.location.state.content}
                    </p>
                    <p className='time'>
                        发布时间:{time.toLocaleString()}
                    </p>
                </div>
                <div className="site-calendar-demo-card">
                    <Calendar fullscreen={false} />
                </div>
            </main>
        )
    }
}

