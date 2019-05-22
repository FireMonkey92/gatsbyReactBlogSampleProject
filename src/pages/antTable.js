import React from 'react'
import { useStaticQuery, graphql } from "gatsby";
import { DatePicker } from 'antd';

import Layout from '../components/layout';

const AntDataTableExample = () => {
    const { dataJson } = useStaticQuery(graphql`
    {
        dataJson {
          artists {
            id
            name
            bio
            genre
          }
        }
    }`);
    const artists = dataJson.artists;
    console.log(artists);
    return (
        <Layout>
            <div>
                <DatePicker />
                React Table examplpe
            </div>
        </Layout>
    )
}
export default AntDataTableExample;