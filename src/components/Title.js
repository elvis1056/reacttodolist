import React, {Component} from "react";
import "./Title.css";

class Title extends Component {
    render(){
        const { allDone } = this.props
        return(
            <div className="title-wapper margin-bottom-15">
                <img className="note-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/756881/laptop.svg" alt="note" />
                <div className="title">寫下 屬於你的計劃
                    <button className="btn btn-outline-success title-done padding-5" onClick={()=>{allDone()}}>All Done</button>
                </div>
            </div>
        );
    };
}

export default Title; 