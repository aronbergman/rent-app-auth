import React from 'react';
import {Layout, Menu} from 'antd';

const {Sider, Content} = Layout;

const AdminLayout = props => {

    const menuSelectHandler = e => {
        props.history.push(`/admin/${e.key}`)
    }

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo"/>
                <Menu theme="dark" mode="inline" onSelect={menuSelectHandler} >
                    <Menu.Item key="news-creator">
                        Создать новость
                    </Menu.Item>
                    <Menu.Item key="2">
                        nav 2
                    </Menu.Item>
                    <Menu.Item key="3">
                        nav 3
                    </Menu.Item>
                    <Menu.Item key="4">
                        nav 4
                    </Menu.Item>
                </Menu>
            </Sider>
            <Content>{props.children}</Content>
        </Layout>
    );
};

export default AdminLayout;
