import React from 'react';
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const AdminLayout = props => {
    return (
        <Layout>
            <Header>Header</Header>
            <Layout>
                <Sider>Sider</Sider>
                <Content>{props.children}</Content>
            </Layout>
            <Footer>Footer</Footer>
        </Layout>
    );
};

export default AdminLayout;
