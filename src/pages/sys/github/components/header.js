import { PureComponent, Fragment } from 'react';
import { Col, Row, Statistic, Card, Avatar, Divider } from 'antd';
import { connect } from 'dva';
import Account from './account';

const { Meta } = Card;
class Index extends PureComponent {
    handleSubmit = ({ account }) => {
        this.props.dispatch({
            type: 'github/getAccountInfo',
            payload: {
                account
            }
        });
    }
    render() {
        const { account, accountInfo: { avatar_url, name, bio, public_repos, followers, following } } = this.props;
        const title = (<Fragment>{name}<span style={{ paddingLeft: '10px', fontSize: '12px' }}>({account})</span></Fragment>)
        const layout = {
            sm: 24,
            md: 12,
            lg: 12,
            xl: 6
        };
        return (
            <Card>
                <Account value={account} onSubmit={this.handleSubmit} />
                <Divider />
                <Row gutter={16} justify={'center'} style={{ textAlign: 'center', padding: '10px 20px', }}>
                    <Col {...layout} >
                        <Card style={{ textAlign: 'left', minHeight: 140 }}>
                            <Meta
                                avatar={<Avatar size={64} src={avatar_url} />}
                                title={title}
                                description={bio}
                            />
                        </Card>
                    </Col>
                    <Col  {...layout} >
                        <Card style={{ minHeight: 140 }}>
                            <Statistic
                                title="公开仓库数"
                                // title="repositories"
                                value={public_repos}
                            // suffix={'个'}
                            //   prefix={<Icon type="like" />}
                            />
                        </Card>
                    </Col>
                    <Col  {...layout} >
                        <Card style={{ minHeight: 140 }}>
                            <Statistic
                                title="粉丝"
                                // title="followers"
                                value={followers}
                            // suffix="人"
                            />
                        </Card>
                    </Col>
                    <Col  {...layout} >
                        <Card style={{ minHeight: 140 }}>
                            <Statistic
                                title="跟随"
                                // title="following"
                                value={following}
                            // suffix="人"
                            />
                        </Card>
                    </Col>
                </Row>
            </Card>
        );
    }
}
export default connect(({ github }) => {
    const { account, accountInfo } = github
    return {
        account,
        accountInfo,
    };
})(Index);