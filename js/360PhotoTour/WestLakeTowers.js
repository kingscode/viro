/**
 * Copyright (c) 2015-present, Viro Media, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Pull in all imports required for the controls within this scene.
 */
import React, { Component } from 'react';
import { polarToCartesian } from 'polarToCartesian';
import {
    StyleSheet,
    ViroScene,
    ViroOmniLight,
    Viro360Photo,
    ViroAnimations,
    ViroAnimatedComponent,
    ViroView,
    ViroImage,
} from 'react-viro';

/**
 * Set all the images and assets required in this scene.
 */
var backgroundImage = require('./res/westlake_towers.jpg');
var monorailInfoCard = require('./res/infocard_monorail.png');
var statueWindowCard = require('./res/infocard_statue.png');
var slutWindowCard = require('./res/infocard_slut.png');
var backImage = require('./res/icon_back.png');

/**
 * Grab our created custom controls used within this scene.
 */
var LoadingSpinner = require('./custom_controls/LoadingSpinner');
var InfoElement = require('./custom_controls/InfoElement');

var OfficeTourSplashScene = React.createClass({
    getInitialState() {
        return {
            showSceneItems:false,
        };
    },

    /**
     * Renders a scene with a 360 Photo background that contains a few toggleable Info UI Elements
     * featuring iconic items like the SLUT, monorail and statue.
     */
    render: function() {
        return (
            <ViroScene style={styles.container}>
                <ViroOmniLight position={[0, 0, 0]} color="#ffffff"
                               attenuationStartDistance={40} attenuationEndDistance={50}/>
                <Viro360Photo source={backgroundImage} onLoadEnd={this._onBackgroundPhotoLoadEnd}/>

                {
                    /*
                     * Display a spinner icon while the background image is being loaded.
                     * Once loaded, hide spinner and show the Info UI Elements.
                     */
                }
                <LoadingSpinner visible={!this.state.showSceneItems} position={[0, 0, -5]}/>
                <ViroAnimatedComponent animation="fadeIn" run={this.state.showSceneItems} loop={false}>
                    {this._getInfoControls()}
                </ViroAnimatedComponent>
            </ViroScene>
        );
    },

    /**
     * Displays a set of InfoElement controls representing several POI locations
     * within this scene, and as well as a back button at the bottom of the scene.
     */
    _getInfoControls(){
        return(
            <ViroView opacity={0.0} >
                <InfoElement content={slutWindowCard} contentCardScale={[3.67,4,1]} position={polarToCartesian([-5, 0, 0])}/>
                <InfoElement content={monorailInfoCard} contentCardScale={[3.67,4,1]} position={polarToCartesian([-5, 77, -10])}/>
                <InfoElement content={statueWindowCard} contentCardScale={[4,3.95,2]} position={polarToCartesian([-5, 277, 0])}/>
                <ViroImage
                    scale={[1, 1, 1]}
                    position={[0, -3.5, 0]}
                    rotation={[-90, 0, 0]}
                    source={backImage}
                    onTap={this._onBackTapped}/>
            </ViroView>
        );
    },

    /**
     * Callback function for when image has finished loading in the Viro360Photo.
     * We then animate the main info elements into the scene through the
     * setting of state showSceneItems.
     */
    _onBackgroundPhotoLoadEnd(){
        this.setState({
            showSceneItems:true
        });
    },

    /**
     * Callback function for when the user taps on back button located at the
     * bottom of the scene. This pops the current scene to the previous one.
     */
    _onBackTapped(){
        this.props.sceneNavigator.pop();
    },
});

/**
 * Declare all custom flex box styles here to be reference by the
 * controls above.
 */
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

/**
 * Declare all your animations here to be referenced and played by the
 * ViroAnimatedComponents above.
 */
ViroAnimations.registerAnimations({
    fadeIn:{properties:{opacity: 1.0}, duration: 1000},
});

module.exports = OfficeTourSplashScene;
