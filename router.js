import React, { Component } from 'react'
import { Router, Stack, Scene } from 'react-native-router-flux'
import SplashScreen from 'react-native-splash-screen'
import App from './App.js'

//视频播放页面
import VideoPage from './src/pages/vidoe_player/VideoPage';
import Diantai from './src/pages/home_sub_pages/home_live/diantai'
import BanMore from './src/components/BanMore.js';
import MoreDiantai from './src/pages/home_sub_pages/home_live/moreDiantai';
import webView from './src/pages/webView/webView'

class AppRouter extends Component {
    componentDidMount() {
        setTimeout(() => {
            SplashScreen.hide();
        }, 1200);
    }

    render() {
        return (
            <Router sceneStyle={{ backgroundColor: '#fff' }}>
                <Stack key="root" hideNavBar>
                    <Scene key="app" component={App} />
                    <Scene key="diantai" component={Diantai} />
                    <Scene key="VideoPage" component={VideoPage} />
                    <Scene key="banmore" component={BanMore} />
                    <Scene key="moreDiantai" component={MoreDiantai} />
                    <Scene key="webView" component={webView} />
                </Stack>
            </Router>);
    }
}

export default AppRouter;

