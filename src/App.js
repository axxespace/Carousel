import './App.css';
import React from "react";
//import styled, { css, keyframes } from 'styled-components'

/*
code is pretty messy, but it works. if you have any questions, please contact me.

there's no universal event to be used for both touch screen and mouse swipes. As we know, in our case using libraries is prohibited, so i decided to use only touch screen swipe event. I recommend you to use this app for Iphone resolution.
 */


let toLeftRight = Object.freeze({    //this is style of our #main element, we are going to manipulate this style every time we want to change color
    "position": "absolute",
    "height": "100%",
    "width": "0",
    "animationName": "unset",
    "animationDuration": "1s",
    "animationFillMode": "forwards",
    "borderRadius": "15px",
    "overflow": "hidden"
});

var num = 0; //we can't use one animation two times is row. this variable defines what animation we use

let touchX; //x coordinate of touch

let dtnc = 0; //right swipe distance

let dtnc1 = 0; //left swipe distance

let totalWidth = 0; //total swipe distance

let movingRight = undefined; //our swipe right direction. if the starting swipe direction is right movingRight=true,

let movingLeft = undefined; //has similar functionality as movingRight

let aa = true; // i can't explain functionality of this varialble, you have to look at touchEnd function. that's why i didn't name it)

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0, //current page number
            prevPageNum: 0, //previous page number
            touching: false, //shows if user is touching screen
            zzz: 0 //we only need this variable in touchEnd()
        };
    }

    left = () => { //this function starts if we press "L" button
        aa = true;
        if (this.state.pageNum > 0) { //after changing toLeftRight and state app makes one full right swipe and changes color
            toLeftRight = {
                ...toLeftRight,
                "width": "0",
                "left": "0",
                "right": "unset",
                "backgroundColor": this.props.SHADESofBLUE[this.state.pageNum - 1][1],
                "animationName": num % 2 ? "anim" : "anim1"
            };
            num--;
            this.setState({
                prevPageNum: this.state.pageNum,
                pageNum: this.state.pageNum - 1
            });
        }
    }

    right = () => { // this function starts if we press "R" button
        aa = true;
        if (this.state.pageNum < 19) {
            toLeftRight = { // after changing toLeftRight and state app makes one full right swipe and changes color
                ...toLeftRight,
                "width": "0",
                "left": "unset",
                "right": "0",
                "backgroundColor": this.props.SHADESofBLUE[this.state.pageNum + 1][1],
                "animationName": num % 2 ? "anim" : "anim1"
            };
            num++;
            this.setState({
                prevPageNum: this.state.pageNum,
                pageNum: this.state.pageNum + 1
            });
        }
    }

    touchStart = (event) => {
        touchX = event.touches[0].clientX;
    }

    touchMove = (event) => { //this function starts on swipe
        aa = true;
        let distance = Math.floor((touchX - event.touches[0].clientX) / 5); //the way we count distance
        if (distance > 0 && distance <= 100 && (movingRight === undefined ? this.state.pageNum < 19 : this.state.pageNum <= 19)) {
            if (movingLeft == undefined && movingRight == undefined) {
                movingRight = true;
                movingLeft = false;
            }
            movingRight == true ? totalWidth = distance : totalWidth = dtnc1 - distance;
            toLeftRight = {
                ...toLeftRight,
                "left": movingRight == true ? "unset" : "0",
                "right": movingRight == true ? "0" : "unset",
                "width": movingRight == true ? `${distance}%` : `${dtnc1 - distance}%`,
                "backgroundColor": this.props.SHADESofBLUE[this.state.pageNum][1],
                "animationName": "unset"
            };
            if (this.state.touching == false) {
                this.setState({
                    touching: true,
                    prevPageNum: this.state.pageNum,
                    pageNum: this.state.pageNum + 1
                });
            } else {
                this.setState({});
            }
            dtnc = distance;
        }

        if (distance < 0 && distance >= -100 && (movingLeft === undefined ? this.state.pageNum > 0 : this.state.pageNum >= 0)) {
            if (movingLeft == undefined && movingRight == undefined) {
                movingLeft = true;
                movingRight = false;
            }
            movingLeft == true ? totalWidth = -distance : totalWidth = dtnc + distance;
            toLeftRight = {
                ...toLeftRight,
                "left": movingLeft == true ? "0" : "unset",
                "right": movingLeft == true ? "unset" : "0",
                "width": movingLeft == true ? `${-distance}%` : `${dtnc + distance}%`,
                "backgroundColor": this.props.SHADESofBLUE[this.state.pageNum][1],
                "animationName": "unset"
            };
            if (this.state.touching == false) {
                this.setState({
                    touching: true,
                    prevPageNum: this.state.pageNum,
                    pageNum: this.state.pageNum - 1
                });
            } else {
                this.setState({});
            }
            dtnc1 = -distance;
        }
    }

    touchEnd = () => { //this function starts whe we stop swiping
        aa = true;
        if (totalWidth <= 50) aa = false;
        if (movingRight == true && totalWidth !== 0) {
            toLeftRight = {
                ...toLeftRight,
                "animationName": totalWidth > 50 ? num % 2 ? "anim" : "anim1" : num % 2 ? "anim2" : "anim3"
            };
            num++;
            this.setState({
                    zzz: this.state.pageNum,
                    touching: false,
                    pageNum: totalWidth > 50 ? this.state.pageNum : this.state.prevPageNum,
                }
            );
        } else if (movingLeft == true && totalWidth !== 0) {
            toLeftRight = {
                ...toLeftRight,
                "animationName": totalWidth > 50 ? num % 2 ? "anim" : "anim1" : num % 2 ? "anim2" : "anim3"
            };
            num++;
            this.setState({
                    zzz: this.state.pageNum,
                    touching: false,
                    pageNum: totalWidth > 50 ? this.state.pageNum : this.state.prevPageNum,
                }
            );
        }
        movingRight = undefined;
        movingLeft = undefined;
    }


    render() {
        return (
            <div id="carousel">
                <div onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}
                     style={{"backgroundColor": this.props.SHADESofBLUE[this.state.prevPageNum][1]}} id="frame">
                    <h1>{this.props.SHADESofBLUE[this.state.prevPageNum][0]}</h1>
                    <div id="main" style={toLeftRight}>
                        <h1>{aa == true ? this.props.SHADESofBLUE[this.state.pageNum][0] : this.props.SHADESofBLUE[this.state.zzz][0]}</h1>
                    </div>
                </div>
                <div
                    style={{"borderColor": this.state.pageNum > 0 ? this.props.SHADESofBLUE[this.state.pageNum - 1][1] : this.props.SHADESofBLUE[0][1]}}
                    id="button1" className="button" onClick={this.left}><h3>L</h3></div>
                <div
                    style={{"borderColor": this.state.pageNum < 19 ? this.props.SHADESofBLUE[this.state.pageNum + 1][1] : this.props.SHADESofBLUE[19][1]}}
                    id="button2" className="button" onClick={this.right}><h3>R</h3></div>

            </div>
        )
    }
}

export default App;
