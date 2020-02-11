import React, {Component} from "react";

class Footer extends Component {
    render(){
        return(
            <div className="footer fixed-bottom text-center m-3">This page is created by - me {' '}
			    <a href="https://github.com/elvis1056/">View on GitHub</a>
		    </div>
        );
    };
}

export default Footer;